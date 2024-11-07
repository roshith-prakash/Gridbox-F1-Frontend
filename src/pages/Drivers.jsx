import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axios";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import { FaLink } from "react-icons/fa6";
import PropTypes from "prop-types";

// To get country from nationality
import { nationalityMap } from "../data/nationalityToCountry";

// To show flags for the drivers
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import "flag-icons/css/flag-icons.min.css";

// To get URL Params
import { useNavigate, useParams } from "react-router-dom";

// Year Picker
import { ErrorDiv, YearPicker } from "../components";
import { SyncLoader } from "react-spinners";
import CTAButton from "../components/CTAButton";

// Register the locale for the countries constructor
countries.registerLocale(enLocale);

// To be displayed on Mobile screens
const DriverCard = ({ driver, index }) => {
  const country = nationalityMap[String(driver?.nationality).trim()];
  const countryCode = countries.getAlpha2Code(country, "en");

  return (
    <div className="flex flex-col divide-y-2 divide-gray-100 border-2 w-full max-w-[95%] rounded-lg shadow-lg">
      <p className="text-lg flex px-5 font-medium py-3 gap-x-2 bg-gray-100">
        <span>{index + 1}.</span>
        {driver?.givenName} {driver?.familyName}
        <span className={`mx-2 fi fi-${countryCode?.toLowerCase()}`}></span>
      </p>
      <div className="flex px-5 py-3">
        <p className="flex-1">Code : {driver?.code ? driver?.code : "-"}</p>
        <p className="flex-1">
          Number : {driver?.permanentNumber ? driver?.permanentNumber : "-"}
        </p>
      </div>
      <p className="px-5 py-3">
        Date of Birth : {dayjs(driver.dateOfBirth).format("DD-MM-YYYY")}
      </p>
      <a
        href={driver?.url}
        target="_blank"
        className="flex justify-center gap-x-2 py-5 items-center text-blue-600"
      >
        Read More <FaLink />
      </a>
    </div>
  );
};

// PropTypes for Card Element
DriverCard.propTypes = {
  driver: PropTypes.shape({
    givenName: PropTypes.string.isRequired,
    familyName: PropTypes.string.isRequired,
    nationality: PropTypes.string.isRequired,
    code: PropTypes.string,
    permanentNumber: PropTypes.number,
    dateOfBirth: PropTypes.string.isRequired,
    url: PropTypes.string,
  }).isRequired,
  index: PropTypes.number,
};

// Loading Placeholder Table / Card
const LoadingTableCard = () => {
  return (
    <>
      <div className="hidden md:flex justify-center pt-10 pb-5 overflow-x-auto">
        <table className="rounded-lg w-full  overflow-hidden bg-white">
          <TableHeader>
            <TableRow className="text-left bg-gray-50">
              <TableHead className="font-bold text-black py-6 pl-3 text-nowrap">
                Sr. no.
              </TableHead>
              <TableHead className="font-bold text-black">Driver</TableHead>
              <TableHead className="font-bold text-black">
                Driver Code
              </TableHead>
              <TableHead className="font-bold text-black">
                Driver Number
              </TableHead>
              <TableHead className="font-bold text-black">
                Nationality
              </TableHead>
              <TableHead className="font-bold text-black">
                Date of Birth
              </TableHead>
              <TableHead className="font-bold text-black">Know More</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array(20)
              .fill(null)
              ?.map((driver, i) => {
                return (
                  <TableRow
                    className="text-left border-b-2 border-gray-100"
                    key={i}
                  >
                    <TableCell className="font-medium py-3 px-3 md:w-[5em]">
                      <div className="bg-gray-300 animate-pulse w-10 h-5 rounded"></div>
                    </TableCell>
                    <TableCell className="px-2">
                      <div className="bg-gray-300 animate-pulse w-[90%] h-5 rounded"></div>
                    </TableCell>
                    <TableCell className="px-2">
                      <div className="bg-gray-300 animate-pulse w-[40%] h-5 rounded"></div>
                    </TableCell>
                    <TableCell className="px-2">
                      <div className="bg-gray-300 animate-pulse w-[40%] h-5 rounded"></div>
                    </TableCell>
                    <TableCell className="gap-x-2 px-2 text-nowrap">
                      <div className="bg-gray-300 animate-pulse w-[70%] h-5 rounded"></div>
                    </TableCell>
                    <TableCell className="px-2 text-nowrap">
                      <div className="bg-gray-300 animate-pulse w-[70%] h-5 rounded"></div>
                    </TableCell>
                    <TableCell className="px-2">
                      <div className="bg-gray-300 animate-pulse w-[90%] h-5 rounded"></div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </table>
      </div>
      <div className="md:hidden flex flex-col items-center gap-y-5 py-10">
        {/* Loading Cards on Mobile Screen */}
        {Array(20)
          .fill(null)
          ?.map((_, i) => {
            return (
              <div
                key={i}
                className="md:hidden flex flex-col divide-y-2 divide-gray-100 border-2 w-full max-w-[95%] rounded-lg shadow-lg"
              >
                <p className="flex text-lg px-5 font-medium py-3 gap-x-2 bg-gray-100">
                  <div className="h-5 w-[70%] bg-gray-300 rounded"></div>
                  <div className={`w-[10%] h-5 bg-gray-300 rounded`}></div>
                </p>
                <div className="flex px-5 py-3">
                  <p className="flex-1">
                    <div className="h-5 w-[70%] bg-gray-300 rounded"></div>
                  </p>
                  <p className="flex-1">
                    <div className="h-5 w-[70%] bg-gray-300 rounded"></div>
                  </p>
                </div>
                <p className="px-5 py-3">
                  <div className="h-5 w-[70%] bg-gray-300 rounded"></div>
                </p>
                <div className="flex justify-center gap-x-2 py-5 items-center text-blue-600">
                  <div className="h-5 w-[70%] bg-gray-300 rounded"></div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

const Drivers = () => {
  const navigate = useNavigate();
  const { year: urlYear } = useParams();
  const [year, setYear] = useState();
  const [userSelectedYear, setUserSelectedYear] = useState();
  const [displayYear, setDisplayYear] = useState();
  const [drivers, setDrivers] = useState([]);
  const [invalidYear, setInvalidYear] = useState(false);

  // Query function to fetch drivers for each year
  const {
    data,
    refetch: fetchDrivers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["drivers", year],
    queryFn: () => {
      return axiosInstance.post("/getDrivers", {
        year: year,
      });
    },
    enabled: false,
    staleTime: Infinity,
  });

  // Scroll to Top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // If year is present
  useEffect(() => {
    if (urlYear) {
      // Valid Year in URL param
      if (
        urlYear &&
        !Number.isNaN(urlYear) &&
        parseInt(urlYear) >= 1950 &&
        parseInt(urlYear) <= 2024
      ) {
        setYear(parseInt(urlYear));
      } else {
        console.log("Invalid year specified");
      }
    } else {
      setYear(2024);
    }
  }, [urlYear]);

  // Fetch data for initial load
  useEffect(() => {
    fetchDrivers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchDrivers, year]);

  // Set drivers for the current year into the state
  useEffect(() => {
    if (data?.data?.drivers) {
      setDrivers(data?.data?.drivers?.drivers?.drivers);
      setDisplayYear(data?.data?.drivers?.year);
    }
  }, [data?.data]);

  return (
    <main className="bg-[#F5F5F5] flex justify-center py-10 rounded-lg">
      <section className="w-full max-w-[96%] rounded px-2 py-5 shadow bg-white">
        <header className="flex flex-wrap items-center gap-x-5 gap-y-5 p-5 pb-10">
          <div className="flex items-center gap-x-5">
            <span className="text-lg italic">Select Year :</span>
            <YearPicker
              setInvalidYear={setInvalidYear}
              setYear={setUserSelectedYear}
            />
          </div>
          <CTAButton
            className="w-full md:w-fit py-2 px-6 border-2 rounded"
            disabled={isLoading || invalidYear || !userSelectedYear}
            onClick={() => {
              navigate(`/drivers/${userSelectedYear}`);
            }}
            text="Fetch"
          ></CTAButton>

          {isLoading && (
            <div className="w-full md:w-fit flex justify-center">
              <SyncLoader />
            </div>
          )}
        </header>

        {/* Data unavailable */}
        {error && error?.response?.status == 404 && (
          <div className="h-[90vh] flex justify-center items-center">
            <ErrorDiv text="Driver data for the requested year is not available." />
          </div>
        )}

        {/* Server error */}
        {error && error?.response?.status != 404 && (
          <div className="h-[90vh] flex justify-center items-center">
            <ErrorDiv />
          </div>
        )}

        {/* Show driver name and country when driver data is present */}
        {!error && drivers.length > 0 && (
          <>
            <h1 className="text-4xl py-5 border-t-4 border-r-4 border-black rounded-xl font-semibold px-2">
              F1 Drivers {displayYear}
            </h1>
            <div className="hidden md:block pt-10 pb-5 overflow-x-auto">
              <table className="rounded-lg w-full overflow-hidden bg-white">
                <TableHeader>
                  <TableRow className="text-left bg-gray-50">
                    <TableHead className="font-bold text-black py-6 pl-3 text-nowrap">
                      Sr. no.
                    </TableHead>
                    <TableHead className="font-bold text-black">
                      Driver
                    </TableHead>
                    <TableHead className="font-bold text-black">
                      Driver Code
                    </TableHead>
                    <TableHead className="font-bold text-black">
                      Driver Number
                    </TableHead>
                    <TableHead className="font-bold text-black">
                      Nationality
                    </TableHead>
                    <TableHead className="font-bold text-black">
                      Date of Birth
                    </TableHead>
                    <TableHead className="font-bold text-black">
                      Know More
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drivers?.map((driver, i) => {
                    const country =
                      nationalityMap[String(driver?.nationality).trim()];
                    const countryCode = countries.getAlpha2Code(country, "en");

                    return (
                      <TableRow
                        className="text-left border-b-2 border-gray-100"
                        key={driver.driverId}
                      >
                        <TableCell className="font-medium py-3 px-3 pl-6 md:w-[5em]">
                          {i + 1}.
                        </TableCell>
                        <TableCell className="px-2">
                          {driver?.givenName} {driver?.familyName}
                        </TableCell>
                        <TableCell className="px-2">
                          {driver?.code ? driver?.code : "-"}
                        </TableCell>
                        <TableCell className="px-2">
                          {driver?.permanentNumber
                            ? driver?.permanentNumber
                            : "-"}
                        </TableCell>
                        <TableCell className="gap-x-2 px-2 text-nowrap">
                          <span
                            className={`mx-2 fi fi-${countryCode?.toLowerCase()}`}
                          ></span>
                          <span>{driver?.nationality}</span>
                        </TableCell>
                        <TableCell className="px-2 text-nowrap">
                          {dayjs(driver.dateOfBirth).format("DD-MM-YYYY")}
                        </TableCell>
                        <TableCell className="px-2">
                          <a
                            href={driver?.url}
                            target="_blank"
                            className="text-blue-600 flex items-center gap-x-2 w-fit"
                          >
                            <FaLink />
                            <span className="hidden lg:block">
                              {driver?.url}
                            </span>
                          </a>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </table>
            </div>
            <div className="md:hidden flex flex-col items-center gap-y-5 py-10">
              {drivers?.map((driver, i) => (
                <DriverCard driver={driver} index={i} key={driver.driverId} />
              ))}
            </div>
          </>
        )}

        {/* Show placeholder table / card when data is not present */}
        {!error && drivers.length == 0 && <LoadingTableCard />}
      </section>
    </main>
  );
};

export default Drivers;
