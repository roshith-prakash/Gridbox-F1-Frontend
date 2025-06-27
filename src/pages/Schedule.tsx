// Imports: React, state management, routing, utilities, styling, and libraries
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../utils/axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { ErrorDiv, YearPicker } from "../components";
import CTAButton from "../components/CTAButton";
import { SyncLoader } from "react-spinners";
import { FaCaretDown, FaLink } from "react-icons/fa6";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import "flag-icons/css/flag-icons.min.css";
import { useParams, useNavigate } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";
import { isAxiosError } from "axios";

// Extend dayjs with useful plugins
dayjs.extend(utc);
dayjs.extend(advancedFormat);
countries.registerLocale(enLocale);

const Schedule = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const { year: urlYear } = useParams();

  // State variables
  const [year, setYear] = useState<number>();
  const [userSelectedYear, setUserSelectedYear] = useState<number>();
  const [displayYear, setDisplayYear] = useState<number>();
  const [schedule, setSchedule] = useState([]);
  const [invalidYear, setInvalidYear] = useState(false);
  const [invalidURL, setInvalidURL] = useState(false);
  const [nextRaceIndex, setNextRaceIndex] = useState<number | null>(null);
  const raceRefs = useRef<Array<HTMLDivElement | null>>([]); // For auto-scrolling

  // Query config for fetching F1 schedule from backend
  const {
    data,
    refetch: fetchSchedule,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["schedule", year],
    queryFn: () => axiosInstance.post("/getSchedule", { year }),
    enabled: false, // Manual trigger
    staleTime: Infinity,
  });

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Update schedule and next race index once data is fetched
  useEffect(() => {
    if (data?.data?.schedule) {
      const races = data.data.schedule.schedule.raceschedule;
      setSchedule(races);
      setDisplayYear(data.data.schedule.year);

      const now = new Date();
      const index = races.findIndex((race: any) => {
        const raceDate = new Date(race.date + "T" + (race.time ?? "00:00:00Z"));
        return raceDate > now;
      });

      setNextRaceIndex(index !== -1 ? index : races.length - 1);
    }
  }, [data?.data]);

  // Handle URL year and validation
  useEffect(() => {
    if (urlYear) {
      const parsed = parseInt(urlYear);
      if (
        !Number.isNaN(parsed) &&
        parsed >= 1950 &&
        parsed <= new Date().getFullYear()
      ) {
        setYear(parsed);
        setInvalidURL(false);
      } else {
        setInvalidURL(true);
      }
    } else {
      setYear(new Date().getFullYear());
    }
  }, [urlYear]);

  // Fetch schedule when year is set
  useEffect(() => {
    if (year) {
      fetchSchedule();
    }
  }, [fetchSchedule, year]);

  // Set document title dynamically
  useEffect(() => {
    document.title = displayYear
      ? `Schedule ${displayYear} | GridBox F1`
      : `Schedule | GridBox F1`;
  }, [displayYear]);

  // Auto-scroll to the next race if the selected year is the current year
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    if (
      nextRaceIndex !== null &&
      raceRefs.current[nextRaceIndex] &&
      typeof window !== "undefined" &&
      year === currentYear
    ) {
      raceRefs.current[nextRaceIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [nextRaceIndex, year]);

  return (
    <main className="bg-greyBG dark:bg-darkbg flex justify-center py-10 rounded-lg">
      <section className="w-full max-w-[96%] rounded px-2 py-5 shadow bg-white dark:bg-secondarydarkbg">
        {/* Header with Year Picker and Fetch button */}
        <header className="flex flex-wrap items-center gap-x-5 gap-y-5 p-5 pb-10">
          <div className="flex flex-wrap w-full md:w-fit items-center gap-x-2 md:gap-x-5 gap-y-5">
            <span className="w-full md:w-fit text-lg italic">
              Select Year :
            </span>
            <YearPicker
              year={year}
              className="w-full md:w-fit"
              setInvalidYear={setInvalidYear}
              setYear={setUserSelectedYear}
            />
          </div>
          <CTAButton
            className="w-full md:w-fit py-2 px-6 border-2 rounded"
            disabled={isLoading || invalidYear || !userSelectedYear}
            onClick={() => navigate(`/schedule/${userSelectedYear}`)}
            text="Fetch"
          />
          {isLoading && (
            <div className="w-full md:w-fit flex justify-center">
              <SyncLoader color={isDarkMode ? "#FFFFFF" : "#000000"} />
            </div>
          )}
        </header>

        {/* Validation Message */}
        <div
          className={`text-red-600 dark:text-red-500 font-medium px-5 overflow-hidden ${
            invalidYear ? "h-14" : "h-0"
          } transition-all`}
        >
          Year must be between 1950 & {new Date().getFullYear()}.
        </div>

        {/* Title */}
        <h1 className="text-4xl py-5 border-t-4 border-r-4 border-black dark:border-darkmodetext rounded-xl font-semibold px-2">
          F1 Schedule {displayYear}
        </h1>

        {/* Error States */}
        {error && isAxiosError(error) && error?.response?.status === 404 && (
          <div className="py-20 flex justify-center items-center">
            <ErrorDiv text="Schedule data for the requested year is not available." />
          </div>
        )}

        {error && isAxiosError(error) && error?.response?.status !== 404 && (
          <div className="py-20 flex justify-center items-center">
            <ErrorDiv />
          </div>
        )}

        {!year && invalidURL && (
          <div className="py-20 flex justify-center items-center">
            <ErrorDiv text="Invalid Year specified in URL." />
          </div>
        )}

        {/* Schedule List */}
        {!error && schedule.length > 0 && (
          <div className="flex flex-col px-5 py-10 overflow-x-auto w-fit">
            {schedule.map((race, i) => {
              const countryCode = countries.getAlpha2Code(
                race?.Circuit?.Location?.country,
                "en"
              );

              const raceDate = race?.time
                ? `${race.date}T${race.time}`
                : `${race.date}`;

              return (
                <div
                  key={race?.date}
                  ref={(el) => (raceRefs.current[i] = el)}
                  className="flex gap-x-5"
                >
                  {/* Timeline marker and line */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`p-4 border-hovercta ${
                        new Date() > new Date(raceDate) && "bg-cta/80"
                      } rounded-full border-4`}
                    />
                    {i + 1 !== schedule.length && (
                      <>
                        <div className="h-full w-[1px] border-2 border-hovercta" />
                        <FaCaretDown className="h-10" />
                      </>
                    )}
                  </div>

                  {/* Race Info Card */}
                  <div
                    data-aos="fade-left"
                    className="flex-1 md:flex-none pb-16"
                  >
                    <p className="font-medium text-3xl -mt-0.5 flex gap-x-2">
                      {race?.raceName}
                      <span
                        className={`mx-2 fi fi-${countryCode?.toLowerCase()}`}
                      ></span>
                    </p>

                    <div className="mt-6 flex flex-col gap-y-4">
                      <p>Round : {race?.round}</p>
                      <p>
                        Location : {race?.Circuit?.Location?.locality},{" "}
                        {race?.Circuit?.Location?.country}
                      </p>

                      {/* Weekend Schedule */}
                      <div className="flex flex-col max-w-96 bg-greyBG dark:bg-zinc-600 gap-y-4 py-3 px-4 rounded-xl">
                        <p className="font-semibold text-lg">
                          Weekend Schedule:
                        </p>
                        {[
                          { label: "FP1", key: "FirstPractice" },
                          { label: "FP2", key: "SecondPractice" },
                          { label: "FP3", key: "ThirdPractice" },
                          {
                            label: "Sprint Qualifying",
                            key: "SprintQualifying",
                          },
                          { label: "Sprint", key: "Sprint" },
                          { label: "Qualifying", key: "Qualifying" },
                        ].map(
                          ({ label, key }) =>
                            race?.[key] && (
                              <p key={key}>
                                {label} :{" "}
                                <span className="text-nowrap">
                                  {race[key]?.time
                                    ? dayjs(
                                        `${race[key].date}T${race[key].time}`
                                      ).format("Do MMMM YYYY, hh:mm a")
                                    : dayjs(`${race[key].date}`).format(
                                        "Do MMMM YYYY"
                                      )}
                                </span>
                              </p>
                            )
                        )}
                        <p>
                          Grand Prix :{" "}
                          <span className="text-nowrap">
                            {race?.time
                              ? dayjs(raceDate).format("Do MMMM YYYY, hh:mm a")
                              : dayjs(raceDate).format("Do MMMM YYYY")}
                          </span>
                        </p>
                      </div>

                      {/* External Link */}
                      {race?.url && (
                        <a
                          href={race?.url}
                          target="_blank"
                          className="text-blue-500 py-2 flex gap-x-2 items-center"
                        >
                          Read More <FaLink />
                        </a>
                      )}

                      {/* Result Buttons */}
                      <div className="flex items-center flex-wrap gap-x-2 gap-y-4">
                        {(new Date() >
                          new Date(
                            `${race?.Sprint?.date}T${race?.Sprint?.time}`
                          ) ||
                          new Date() >
                            new Date(
                              `${race?.Qualifying?.date}T${race?.Qualifying?.time}`
                            )) && (
                          <p className="text-lg font-medium pr-2">Results:</p>
                        )}

                        {!!race?.Sprint &&
                          new Date() >
                            new Date(
                              `${race?.Sprint?.date}T${race?.Sprint?.time}`
                            ) && (
                            <CTAButton
                              onClick={() => {
                                navigate(
                                  `/sprint-result/${displayYear}/${race?.round}`
                                );
                              }}
                              text="Sprint"
                            />
                          )}

                        {new Date() >
                          new Date(
                            `${race?.Qualifying?.date}T${race?.Qualifying?.time}`
                          ) && (
                          <CTAButton
                            onClick={() => {
                              navigate(
                                `/qualifying-result/${displayYear}/${race?.round}`
                              );
                            }}
                            text="Qualifying"
                          />
                        )}

                        {new Date() > new Date(raceDate) && (
                          <CTAButton
                            onClick={() => {
                              navigate(
                                `/race-result/${displayYear}/${race?.round}`
                              );
                            }}
                            text="Race"
                          />
                        )}
                      </div>
                    </div>
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
