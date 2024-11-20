import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { ErrorDiv, YearPicker } from "../components";
import CTAButton from "../components/CTAButton";
import { SyncLoader } from "react-spinners";
import { FaCaretDown } from "react-icons/fa6";
import { FaLink } from "react-icons/fa6";
dayjs.extend(utc);
dayjs.extend(advancedFormat);

// To show flags for the drivers
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import "flag-icons/css/flag-icons.min.css";

// Register the locale for the countries constructor
countries.registerLocale(enLocale);

// Get URL Params
import { useParams } from "react-router-dom";

// Navigate Programatically
import { useNavigate } from "react-router-dom";

const Schedule = () => {
  const navigate = useNavigate();
  const { year: urlYear } = useParams();
  const [year, setYear] = useState();
  const [userSelectedYear, setUserSelectedYear] = useState();
  const [displayYear, setDisplayYear] = useState();
  const [schedule, setSchedule] = useState([]);
  const [invalidYear, setInvalidYear] = useState(false);
  const [invalidURL, setInvalidURL] = useState(false);

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
        setInvalidURL(false);
      } else {
        console.log("Invalid year specified");
        setInvalidURL(true);
      }
    } else {
      setYear(2024);
    }
  }, [urlYear]);

  // Fetch data for initial load
  useEffect(() => {
    if (year) {
      fetchSchedule();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchSchedule, year]);

  // Set window title.
  useEffect(() => {
    document.title = displayYear
      ? `Schedule ${displayYear} | GridBox F1`
      : `Schedule | GridBox F1`;
  }, [displayYear]);

  return (
    <main className="bg-greyBG flex justify-center py-10 rounded-lg">
      <section className="w-full max-w-[96%] rounded px-2 py-5 shadow bg-white">
        {/* Input section */}
        <header className="flex flex-wrap items-center gap-x-5 gap-y-5 p-5 pb-10">
          <div className="flex flex-wrap w-full md:w-fit items-center gap-x-2 md:gap-x-5 gap-y-5">
            <span className="w-full md:w-fit text-lg italic">
              Select Year :
            </span>
            <YearPicker
              className="w-full md:w-fit"
              setInvalidYear={setInvalidYear}
              setYear={setUserSelectedYear}
            />
          </div>

          {/* Change URL to fetch data */}
          <CTAButton
            className="w-full md:w-fit py-2 px-6 border-2 rounded"
            disabled={isLoading || invalidYear || !userSelectedYear}
            onClick={() => {
              navigate(`/schedule/${userSelectedYear}`);
            }}
            text="Fetch"
          ></CTAButton>

          {/* Loader */}
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

        {/* Title */}
        <h1 className="text-4xl py-5 border-t-4 border-r-4 border-black rounded-xl font-semibold px-2">
          F1 Schedule {displayYear}
        </h1>

        {/* Data unavailable */}
        {error && error?.response?.status == 404 && (
          <div className="py-20 flex justify-center items-center">
            <ErrorDiv text="Schedule data for the requested year is not available." />
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

        {/* Timeline */}
        {!error && schedule.length > 0 && (
          <>
            {/* Timeline */}
            <div className="flex flex-col px-5 py-10 overflow-x-auto w-fit">
              {schedule?.map((race, i) => {
                const countryCode = countries.getAlpha2Code(
                  race?.Circuit?.Location?.country,
                  "en"
                );

                let dateTime;

                if (race?.time) {
                  dateTime = dayjs(`${race.date}T${race.time}`);
                } else {
                  dateTime = dayjs(`${race.date}`);
                }

                return (
                  <div key={race?.date} className="flex gap-x-5">
                    {/* Timeline element */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`p-4 border-hovercta ${
                          new Date() > new Date(dateTime) && "bg-cta/80"
                        } rounded-full border-4`}
                      />
                      {i + 1 != schedule.length && (
                        <>
                          <div className="h-full w-[1px] border-2 border-hovercta" />
                          <FaCaretDown className="h-10" />
                        </>
                      )}
                    </div>
                    {/* Content Div */}
                    <div
                      data-aos="fade-left"
                      className="flex-1 md:flex-none pb-16"
                    >
                      {/* Race Name */}
                      <p className="font-medium text-3xl -mt-0.5 flex gap-x-2">
                        {race?.raceName}
                        <span
                          className={`mx-2 fi fi-${countryCode?.toLowerCase()}`}
                        ></span>
                      </p>
                      {/* Info Div */}
                      <div className="mt-6 flex flex-col gap-y-4">
                        {/* Round */}
                        <p>Round : {race?.round}</p>

                        {/* Location */}
                        <p>
                          {" "}
                          Location : {race?.Circuit?.Location?.locality},{" "}
                          {race?.Circuit?.Location?.country}
                        </p>

                        {/* Schedule Div */}
                        <div className="flex flex-col w-full bg-greyBG gap-y-4 py-3 px-4 rounded-lg">
                          <p className="font-medium text-lg">
                            Weekend Schedule:
                          </p>

                          {/* FP1 Date */}
                          {race?.FirstPractice && (
                            <p>
                              FP1 :{" "}
                              <span className="text-nowrap">
                                {race?.FirstPractice?.time
                                  ? dayjs(
                                      `${race?.FirstPractice?.date}T${race?.FirstPractice?.time}`
                                    ).format("Do MMMM YYYY") +
                                    ", " +
                                    dayjs(
                                      `${race?.FirstPractice?.date}T${race?.FirstPractice?.time}`
                                    ).format("HH:mm")
                                  : dayjs(
                                      `${race?.FirstPractice?.date}`
                                    ).format("Do MMMM YYYY")}
                              </span>
                            </p>
                          )}

                          {/* FP2 Date */}
                          {race?.SecondPractice && (
                            <p>
                              FP2 :{" "}
                              <span className="text-nowrap">
                                {race?.SecondPractice?.time
                                  ? dayjs(
                                      `${race?.SecondPractice?.date}T${race?.SecondPractice?.time}`
                                    ).format("Do MMMM YYYY") +
                                    ", " +
                                    dayjs(
                                      `${race?.SecondPractice?.date}T${race?.SecondPractice?.time}`
                                    ).format("HH:mm")
                                  : dayjs(
                                      `${race?.SecondPractice?.date}`
                                    ).format("Do MMMM YYYY")}
                              </span>
                            </p>
                          )}

                          {/* FP3 Date */}
                          {race?.ThirdPractice && (
                            <p>
                              FP3 :{" "}
                              <span className="text-nowrap">
                                {race?.ThirdPractice?.time
                                  ? dayjs(
                                      `${race?.ThirdPractice?.date}T${race?.ThirdPractice?.time}`
                                    ).format("Do MMMM YYYY") +
                                    ", " +
                                    dayjs(
                                      `${race?.ThirdPractice?.date}T${race?.ThirdPractice?.time}`
                                    ).format("HH:mm")
                                  : dayjs(
                                      `${race?.ThirdPractice?.date}`
                                    ).format("Do MMMM YYYY")}
                              </span>
                            </p>
                          )}

                          {/* Sprint Qualifying Date */}
                          {race?.SprintQualifying && (
                            <p>
                              Sprint Qualifying :{" "}
                              <span className="text-nowrap">
                                {race?.SprintQualifying?.time
                                  ? dayjs(
                                      `${race?.SprintQualifying?.date}T${race?.SprintQualifying?.time}`
                                    ).format("Do MMMM YYYY") +
                                    ", " +
                                    dayjs(
                                      `${race?.SprintQualifying?.date}T${race?.SprintQualifying?.time}`
                                    ).format("HH:mm")
                                  : dayjs(
                                      `${race?.SprintQualifying?.date}`
                                    ).format("Do MMMM YYYY")}
                              </span>
                            </p>
                          )}

                          {/* Sprint Date */}
                          {race?.Sprint && (
                            <p>
                              Sprint :{" "}
                              <span className="text-nowrap">
                                {race?.Sprint?.time
                                  ? dayjs(
                                      `${race?.Sprint?.date}T${race?.Sprint?.time}`
                                    ).format("Do MMMM YYYY") +
                                    ", " +
                                    dayjs(
                                      `${race?.Sprint?.date}T${race?.Sprint?.time}`
                                    ).format("HH:mm")
                                  : dayjs(`${race?.Sprint?.date}`).format(
                                      "Do MMMM YYYY"
                                    )}
                              </span>
                            </p>
                          )}

                          {/* Qualifying Date */}
                          {race?.Qualifying && (
                            <p>
                              Qualifying :{" "}
                              <span className="text-nowrap">
                                {race?.Qualifying?.time
                                  ? dayjs(
                                      `${race?.Qualifying?.date}T${race?.Qualifying?.time}`
                                    ).format("Do MMMM YYYY") +
                                    ", " +
                                    dayjs(
                                      `${race?.Qualifying?.date}T${race?.Qualifying?.time}`
                                    ).format("HH:mm")
                                  : dayjs(`${race?.Qualifying?.date}`).format(
                                      "Do MMMM YYYY"
                                    )}
                              </span>
                            </p>
                          )}

                          {/* Grand Prix Date */}
                          <p>
                            Grand Prix :{" "}
                            <span className="text-nowrap">
                              {race?.time
                                ? dateTime.format("Do MMMM YYYY") +
                                  ", " +
                                  dateTime.format("HH:mm")
                                : dateTime.format("Do MMMM YYYY")}
                            </span>
                          </p>
                        </div>

                        {/* URL to Wikipedia */}
                        {race?.url && (
                          <a
                            href={race?.url}
                            target="_blank"
                            className="text-blue-500 py-2 flex gap-x-2 items-center"
                          >
                            Read More <FaLink />
                          </a>
                        )}

                        {/* Results Navigator - Displayed only if grand prix weekend is completed */}
                        {new Date() > new Date(dateTime) && (
                          <>
                            <div className="flex items-center flex-wrap gap-x-2 gap-y-4">
                              <p className="text-lg font-medium pr-2">
                                Results:
                              </p>

                              {!!race?.Sprint && (
                                <CTAButton
                                  onClick={() => {
                                    navigate(
                                      `/sprint-result/${displayYear}/${race?.round}`
                                    );
                                  }}
                                  text="
                              Sprint"
                                ></CTAButton>
                              )}

                              <CTAButton
                                onClick={() => {
                                  navigate(
                                    `/qualifying-result/${displayYear}/${race?.round}`
                                  );
                                }}
                                text="
                              Qualifying"
                              ></CTAButton>
                              <CTAButton
                                onClick={() => {
                                  navigate(
                                    `/race-result/${displayYear}/${race?.round}`
                                  );
                                }}
                                text="
                              Race"
                              ></CTAButton>
                            </div>
                          </>
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
        {!invalidURL && !error && schedule.length == 0 && (
          <div className="px-5 ">
            {Array(10)
              .fill(null)
              ?.map((_, i) => {
                return (
                  <div key={i} className="flex gap-x-5">
                    <div className="flex flex-col  items-center">
                      <div className="p-4 border-cta rounded-full border-4" />
                      {i + 1 != schedule.length && (
                        <>
                          <div className="h-full w-[1px] border-2 border-cta" />
                          <FaCaretDown className="h-10" />
                        </>
                      )}
                    </div>
                    <div className="flex flex-col gap-y-2 pb-16">
                      <div className="w-full md:w-52 h-12 bg-gray-300 animate-pulse rounded font-medium text-2xl"></div>
                      <div className="mt-2 flex flex-col gap-y-2">
                        <div className="w-full md:w-52 h-8 bg-gray-300 animate-pulse rounded"></div>
                        <div className="flex gap-x-3">
                          <div className="w-40 h-8 bg-gray-300 animate-pulse rounded" />
                          <div className="w-9 h-8 bg-gray-300 animate-pulse rounded" />
                        </div>
                      </div>
                      <div className="w-full md:w-52 h-8 bg-gray-300 animate-pulse rounded" />
                      <div className="w-full md:w-52 h-8 bg-gray-300 animate-pulse rounded" />
                      <div className="w-full md:w-52 h-8 bg-gray-300 animate-pulse rounded" />
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </section>
    </main>
  );
};

export default Schedule;
