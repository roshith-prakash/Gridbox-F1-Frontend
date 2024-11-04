import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

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
          <div className="flex flex-col px-5 gap-y-5 py-10 overflow-x-auto">
            {schedule?.map((race, i) => {
              const countryCode = countries.getAlpha2Code(
                race?.circuit?.location?.country,
                "en"
              );

              let dateTime = dayjs(`${race.date}T${race.time}`);

              console.log(dateTime);

              return (
                <div key={race?.date} className="flex gap-x-5">
                  <div className="flex flex-col gap-y-1 items-center">
                    <div className="p-4 rounded-full border-2" />
                    {i + 1 != schedule.length && (
                      <div className="h-full w-[1px] border-2" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-2xl">{race?.raceName}</p>
                    <div className="mt-2 flex flex-col gap-y-2">
                      <p className="text-lg">Round : {race?.round}</p>
                      <p>
                        {" "}
                        Location : {race?.circuit?.location?.locality},{" "}
                        {race?.circuit?.location?.country}
                        <span
                          className={`mx-2 fi fi-${countryCode?.toLowerCase()}`}
                        ></span>
                      </p>
                      <p>Date: {dateTime.format("DD MMMM YYYY")}</p>
                      <p>Time: {dateTime.format("HH:mm:ss")}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {schedule.length == 0 &&
        Array(10)
          .fill(null)
          ?.map((_, i) => {
            return (
              <div key={i} className="flex gap-x-5 mt-3">
                <div className="flex flex-col gap-y-1 items-center">
                  <div className="p-4 rounded-full border-2" />
                  {i + 1 != schedule.length && (
                    <div className="h-full w-[1px] border-2" />
                  )}
                </div>
                <div className="flex flex-col gap-y-2">
                  <div className="w-40 h-8 bg-gray-300 animate-pulse rounded font-medium text-2xl"></div>
                  <div className="mt-2 flex flex-col gap-y-2">
                    <div className="w-40 h-5 bg-gray-300 animate-pulse rounded"></div>
                    <div className="flex gap-x-3">
                      <div className="w-40 h-5 bg-gray-300 animate-pulse rounded" />
                      <div className="w-10 h-5 bg-gray-300 animate-pulse rounded" />
                    </div>
                  </div>
                  <div className="w-40 h-5 bg-gray-300 animate-pulse rounded" />
                  <div className="w-40 h-5 bg-gray-300 animate-pulse" />
                </div>
              </div>
            );
          })}
    </>
  );
};

export default Schedule;
