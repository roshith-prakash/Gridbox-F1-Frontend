import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

// To show flags for the drivers
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import "flag-icons/css/flag-icons.min.css";

// Get URL Params
import { useParams } from "react-router-dom";
import { Collapse } from "react-collapse";

// Navigate Programatically
import { useNavigate } from "react-router-dom";
import { ErrorDiv, YearPicker } from "../components";

// Register the locale for the countries constructor
countries.registerLocale(enLocale);

const Schedule = () => {
  const navigate = useNavigate();
  const { year: urlYear } = useParams();
  const [year, setYear] = useState();
  const [userSelectedYear, setUserSelectedYear] = useState();
  const [displayYear, setDisplayYear] = useState();
  const [schedule, setSchedule] = useState([]);
  const [invalidYear, setInvalidYear] = useState(false);

  // Query function to fetch drivers for each year
  const {
    data,
    refetch: fetchSchedule,
    isLoading,
    error,
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

  // Scroll to top of the page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Set Schedule for the current year into the state
  useEffect(() => {
    if (data?.data?.schedule) {
      setSchedule(data?.data?.schedule?.schedule?.raceschedule);
      setDisplayYear(data?.data?.schedule?.year);
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
      } else {
        console.log("Invalid year specified");
      }
    } else {
      setYear(2024);
    }
  }, [urlYear]);

  // Fetch data for initial load
  useEffect(() => {
    fetchSchedule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchSchedule, year]);

  return (
    <>
      <div className="flex gap-x-5 p-5">
        <YearPicker setOpen={setInvalidYear} setYear={setUserSelectedYear} />

        <button
          disabled={isLoading || invalidYear || !userSelectedYear}
          onClick={() => {
            navigate(`/schedule/${userSelectedYear}`);
          }}
        >
          Fetch
        </button>
      </div>

      {/* Invalid year error  */}
      <Collapse isOpened={invalidYear} className="transition-all">
        <div className="text-red-600 font-medium px-5">
          Year must be between 1950 & 2024
        </div>
      </Collapse>

      {/* Data unavailable */}
      {error && error?.response?.status == 404 && (
        <div className="h-[90vh] flex justify-center items-center">
          <ErrorDiv text="Season schedule for the requested year is not available." />
        </div>
      )}

      {/* Server error */}
      {error && error?.response?.status != 404 && (
        <div className="h-[90vh] flex justify-center items-center">
          <ErrorDiv />
        </div>
      )}

      {/* Timeline */}
      {!error && schedule.length > 0 && (
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

              let dateTime;
              if (race?.time) {
                dateTime = dayjs(`${race.date}T${race.time}`);
              } else {
                dateTime = dayjs(`${race.date}`);
              }

              console.log(race?.date);
              console.log(race?.time);

              return (
                <div key={race?.date} className="flex gap-x-5">
                  <div className="flex flex-col gap-y-1 items-center">
                    <div className="p-4 rounded-full border-4" />
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
                      {race?.date && (
                        <p>Date: {dateTime.format("DD MMMM YYYY")}</p>
                      )}

                      {race?.time && <p>Time: {dateTime.format("HH:mm:ss")}</p>}

                      {new Date() > new Date(dateTime) && (
                        <div className="flex gap-x-2">
                          <button
                            onClick={() => {
                              navigate(
                                `/qualifying-result/${displayYear}/${race?.round}`
                              );
                            }}
                          >
                            Qualifying
                          </button>
                          <button
                            onClick={() => {
                              navigate(
                                `/race-result/${displayYear}/${race?.round}`
                              );
                            }}
                          >
                            Race
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Loading placeholder */}
      {!error &&
        schedule.length == 0 &&
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
