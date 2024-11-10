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
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorDiv, YearPicker } from "../components";
import CTAButton from "../components/CTAButton";
import { SyncLoader } from "react-spinners";

// To get country from nationality
import { nationalityMap } from "../data/nationalityToCountry";

// To show flags for the standings
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import "flag-icons/css/flag-icons.min.css";

// Register the locale for the countries constructor
countries.registerLocale(enLocale);

// To be displayed on Mobile screens
const DriverStandingCard = ({ item }) => {
  const driverCountry =
    nationalityMap[String(item?.driver?.nationality).trim()];
  const driverCountryCode = countries.getAlpha2Code(driverCountry, "en");

  const constructorCountry =
    nationalityMap[String(item?.constructor?.nationality).trim()];
  const constructorCountryCode = countries.getAlpha2Code(
    constructorCountry,
    "en"
  );

  return (
    <div className="flex flex-col divide-y-2 divide-gray-100 border-2 w-full max-w-[95%] rounded-lg shadow-lg">
      <p className="text-lg px-5 font-medium py-3 flex gap-x-3 bg-gray-100">
        {item?.position}.{" "}
        <span>
          {item?.driver?.givenName} {item?.driver?.familyName}
        </span>
        <span
          className={`mx-2 fi fi-${driverCountryCode?.toLowerCase()}`}
        ></span>
      </p>
      <p className="px-5 py-3 text-lg font-medium">
        Points : <span>{item?.points}</span>
      </p>
      <div className="flex px-5 py-3">
        <p className="flex-1">
          Code : {item?.driver?.code ? item?.driver?.code : "-"}
        </p>
        <p className="flex-1">
          Number :{" "}
          {item?.driver?.permanentNumber ? item?.driver?.permanentNumber : "-"}
        </p>
      </div>
      <p className="px-5 py-3">
        Constructor : {item?.constructor?.name}{" "}
        <span
          className={`mx-2 fi fi-${constructorCountryCode?.toLowerCase()}`}
        ></span>
      </p>
      <p className="px-5 py-3">
        Grand Prix Wins : <span>{item?.wins}</span>
      </p>
    </div>
  );
};

DriverStandingCard.propTypes = {
  item: PropTypes.shape({
    driver: PropTypes.object,
    constructor: PropTypes.object,
    position: PropTypes.number.isRequired,
    points: PropTypes.number,
    wins: PropTypes.number,
  }).isRequired,
};

// Loading Placeholder Table / Card
const LoadingTableCard = () => {
  return (
    <>
      <div className="hidden md:block pt-10 pb-5 overflow-x-auto">
        <table className="rounded-lg w-full overflow-hidden bg-white">
          <TableHeader>
            <TableRow className="text-left bg-gray-100">
              <TableHead className="font-bold text-black py-6 pl-3 text-nowrap">
                Position
              </TableHead>
              <TableHead className="font-bold text-black">Driver</TableHead>
              <TableHead className="font-bold text-black">
                Constructor
              </TableHead>
              <TableHead className="font-bold text-black">Points</TableHead>
              <TableHead className="font-bold text-black">Wins</TableHead>
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

                    <TableCell className="px-2 h-full py-3">
                      <div className="flex gap-x-2">
                        <div className="bg-gray-300 animate-pulse w-[15%] h-5 rounded"></div>
                        <div className="bg-gray-300 animate-pulse w-[60%] h-5 rounded"></div>
                      </div>
                    </TableCell>

                    <TableCell className="px-2 h-full py-3">
                      <div className="flex gap-x-2">
                        <div className="bg-gray-300 animate-pulse w-[15%] h-5 rounded"></div>
                        <div className="bg-gray-300 animate-pulse w-[40%] h-5 rounded"></div>
                      </div>
                    </TableCell>

                    <TableCell className="px-2">
                      <div className="bg-gray-300 animate-pulse w-[40%] h-5 rounded"></div>
                    </TableCell>

                    <TableCell className="gap-x-2 px-2 text-nowrap">
                      <div className="bg-gray-300 animate-pulse w-[70%] h-5 rounded"></div>
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
                className="flex flex-col divide-y-2 divide-gray-100 border-2 w-full max-w-[95%] rounded-lg shadow-lg"
              >
                <div className="text-lg px-5 font-medium py-3 flex gap-x-3 bg-gray-100">
                  <div className="h-5 w-[70%] bg-gray-300 animate-pulse rounded"></div>

                  <div className="h-5 w-[10%] bg-gray-300 animate-pulse rounded"></div>
                </div>
                <p className="px-5 py-3 text-lg font-medium">
                  <div className="h-5 w-[70%] bg-gray-300 animate-pulse rounded"></div>
                </p>
                <div className="flex px-5 py-3">
                  <div className="flex-1">
                    <div className="h-5 w-[70%] bg-gray-300 animate-pulse rounded"></div>
                  </div>
                  <div className="flex-1">
                    <div className="h-5 w-[70%] bg-gray-300 animate-pulse rounded"></div>
                  </div>
                </div>
                <div className="px-5 py-3 flex gap-x-3">
                  <div className="h-5 w-[70%] bg-gray-300 animate-pulse rounded"></div>
                  <div className="h-5 w-[10%] bg-gray-300 animate-pulse rounded"></div>
                </div>
                <div className="px-5 py-3">
                  <div className="h-5 w-[70%] bg-gray-300 animate-pulse rounded"></div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

const DriverStandings = () => {
  const navigate = useNavigate();
  const { year: urlYear } = useParams();
  const [year, setYear] = useState();
  const [userSelectedYear, setUserSelectedYear] = useState();
  const [displayYear, setDisplayYear] = useState();
  const [standings, setStandings] = useState([]);
  const [invalidYear, setInvalidYear] = useState(false);
  const [invalidURL, setInvalidURL] = useState(false);

  // Query function to fetch standings for each year
  const {
    data,
    refetch: fetchStandings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["driversStandings", year],
    queryFn: () => {
      return axiosInstance.post("/getDriverStandings", {
        year: year,
      });
    },
    enabled: false,
    staleTime: 1000 * 60 * 15,
  });

  // Scroll to Top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Set standings for the current year into the state
  useEffect(() => {
    if (data?.data?.standings) {
      setStandings(data?.data?.standings?.standings?.standings);
      setDisplayYear(data?.data?.standings?.year);
    }
  }, [data?.data]);

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
        setInvalidURL(false);
      } else {
        console.log("Invalid year specified");
        setInvalidURL(true);
      }
    } else {
      setYear(2024);
    }
  }, [urlYear]);

  // Fetch drivers
  useEffect(() => {
    if (year) {
      fetchStandings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchStandings, year]);

  console.log(open);

  return (
    <main className="bg-greyBG flex justify-center py-10 rounded-lg">
      <section className="w-full max-w-[96%] rounded px-2 py-5 shadow bg-white">
        {/* Input Section */}
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
              navigate(`/drivers-standings/${userSelectedYear}`);
            }}
            text="Fetch"
          ></CTAButton>

          {isLoading && (
            <div className="w-full md:w-fit flex justify-center">
              <SyncLoader />
            </div>
          )}
        </header>

        {/* Invalid year error  */}
        <div
          className={`text-red-600 font-medium px-5 overflow-hidden  ${
            invalidYear ? "h-14" : "h-0"
          } transition-all`}
        >
          Year must be between 1950 & 2024
        </div>

        <h1 className="text-4xl py-5 border-t-4 border-r-4 border-black rounded-xl font-semibold px-2">
          Drivers Standings {displayYear}
        </h1>

        {/* Data unavailable */}
        {error && error?.response?.status == 404 && (
          <div className="py-20 flex justify-center items-center">
            <ErrorDiv text="Drivers Standings data for the requested year is not available." />
          </div>
        )}

        {/* Server error */}
        {error && error?.response?.status != 404 && (
          <div className="py-20 flex justify-center items-center">
            <ErrorDiv />
          </div>
        )}

        {/* Invalid param in URL */}
        {!year && invalidURL && (
          <div className="py-20 flex justify-center items-center">
            <ErrorDiv text="Invalid Year specified in URL." />
          </div>
        )}

        {/* Show driver name and country when driver data is present */}
        {!error && standings.length > 0 && (
          <>
            <div className="hidden md:block pt-10 pb-5 overflow-x-auto">
              <table className="rounded-lg w-full overflow-hidden bg-white">
                <TableHeader>
                  <TableRow className="text-left bg-gray-100">
                    <TableHead className="font-bold text-black py-6 pl-3 text-nowrap">
                      Position
                    </TableHead>
                    <TableHead className="font-bold text-black">
                      Driver
                    </TableHead>
                    <TableHead className="font-bold text-black">
                      Constructor
                    </TableHead>
                    <TableHead className="font-bold text-black">
                      Points
                    </TableHead>
                    <TableHead className="font-bold text-black">Wins</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {standings?.map((item, i) => {
                    const driverCountry =
                      nationalityMap[String(item?.driver?.nationality).trim()];
                    const driverCountryCode = countries.getAlpha2Code(
                      driverCountry,
                      "en"
                    );

                    const constructorCountry =
                      nationalityMap[
                        String(item?.constructor?.nationality).trim()
                      ];
                    const constructorCountryCode = countries.getAlpha2Code(
                      constructorCountry,
                      "en"
                    );

                    return (
                      <TableRow
                        className="text-left border-b-2 border-gray-100"
                        key={item.position}
                      >
                        <TableCell className="font-medium py-3 px-3 md:w-[5em] text-center">
                          {i + 1}.
                        </TableCell>
                        <TableCell className="px-2">
                          <span
                            className={`mx-2 fi fi-${driverCountryCode?.toLowerCase()}`}
                          ></span>
                          {item?.driver?.givenName} {item?.driver?.familyName}
                        </TableCell>

                        <TableCell className="px-2">
                          <span
                            className={`mx-2 fi fi-${constructorCountryCode?.toLowerCase()}`}
                          ></span>
                          {item?.constructor?.name}
                        </TableCell>

                        <TableCell className="gap-x-2 px-2 text-nowrap">
                          {item?.points}
                        </TableCell>
                        <TableCell className="px-2 text-nowrap">
                          {item?.wins}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </table>
            </div>
            <div className="md:hidden flex flex-col items-center gap-y-5 py-10">
              {standings?.map((item) => {
                return <DriverStandingCard item={item} key={item.driverId} />;
              })}
            </div>
          </>
        )}

        {/* When loading initial data */}
        {!invalidURL && !error && standings.length == 0 && <LoadingTableCard />}
      </section>
    </main>
  );
};

export default DriverStandings;
