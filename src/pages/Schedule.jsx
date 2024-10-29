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

// Register the locale for the countries constructor
countries.registerLocale(enLocale);

// To be displayed on Mobile screens
const DriverCard = ({ driver }) => {
  const country = nationalityMap[driver?.nationality];
  const countryCode = countries.getAlpha2Code(country, "en");

  return (
    <div className="flex flex-col divide-y-2 divide-gray-100 border-2 w-full max-w-[95%] rounded-lg shadow-lg">
      <p className="text-lg px-5 font-medium py-3 gap-x-2 bg-gray-100">
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
};

const Schedule = () => {
  const [year, setYear] = useState(2024);
  const [displayYear, setDisplayYear] = useState();
  const [schedule, setSchedule] = useState([]);

  // Query function to fetch drivers for each year
  const {
    data,
    refetch: fetchSchedule,
    isLoading,
  } = useQuery({
    queryKey: ["schedule", year],
    queryFn: () => {
      return axiosInstance.post("/getSchedule", {
        year: year,
      });
    },
    enabled: false,
    staleTime: Infinity,
  });

  // Set drivers for the current year into the state
  useEffect(() => {
    if (data?.data?.schedule) {
      setSchedule(data?.data?.schedule?.schedule?.raceschedule);
      setDisplayYear(data?.data?.schedule?.year);
    }
  }, [data?.data]);

  useEffect(() => {
    fetchSchedule();
  }, [fetchSchedule]);

  console.log(schedule);

  return (
    <>
      <div className="flex gap-x-5 p-5">
        <input
          type="number"
          value={year}
          disabled={isLoading}
          onChange={(e) => setYear(e.target.value)}
          className="border-2 rounded"
        ></input>
        <button disabled={isLoading} onClick={fetchSchedule}>
          Fetch
        </button>
      </div>

      {isLoading && <p>Fetching drivers...</p>}
      {/* Show driver name and country when driver data is present */}
      {schedule.length > 0 && (
        <>
          <p className="text-2xl font-semibold px-2">
            Schedule for the {displayYear} season
          </p>
          <div className="hidden md:flex justify-center py-10 overflow-x-auto">
            <table className="rounded-lg w-full lg:max-w-[95%] overflow-hidden bg-white shadow-lg">
              <TableHeader>
                <TableRow className="text-left bg-gray-100">
                  <TableHead className="py-6">Sr. no.</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Driver Code</TableHead>
                  <TableHead>Driver Number</TableHead>
                  <TableHead>Nationality</TableHead>
                  <TableHead>Date of Birth</TableHead>
                  <TableHead>Know More</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedule?.map((driver, i) => {
                  const country = nationalityMap[driver?.nationality];
                  const countryCode = countries.getAlpha2Code(country, "en");

                  return (
                    <TableRow
                      className="text-left border-b-2 border-gray-100"
                      key={driver.driverId}
                    >
                      <TableCell className="font-medium py-3 px-3 md:w-[5em]">
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
                          <span className="hidden lg:block">{driver?.url}</span>
                        </a>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </table>
          </div>
          <div className="md:hidden flex flex-col items-center gap-y-5 py-10">
            {schedule?.map((driver) => {
              return <DriverCard driver={driver} key={driver.driverId} />;
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Schedule;
