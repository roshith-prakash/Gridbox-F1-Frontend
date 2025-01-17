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
import * as PropTypes from "prop-types";
import { ErrorDiv, YearPicker } from "../components";
import CTAButton from "../components/CTAButton";
import { SyncLoader } from "react-spinners";

// Get URL Params
import { useNavigate, useParams } from "react-router-dom";

// To get country from nationality
import { nationalityMap } from "../data/nationalityToCountry";

// To show flags for the standings
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import "flag-icons/css/flag-icons.min.css";
import { useDarkMode } from "../context/DarkModeContext";
import { isAxiosError } from "axios";
// Register the locale for the countries Constructor
countries.registerLocale(enLocale);

// --------------------------------------------------------------------------------------------------------

// To be displayed on Mobile screens
const ConstructorStandingCard = ({ item }) => {
  const ConstructorCountry =
    nationalityMap[String(item?.Constructor?.nationality).trim()];
  const ConstructorCountryCode = countries.getAlpha2Code(
    ConstructorCountry,
    "en"
  );

  return (
    <div className="flex flex-col overflow-hidden divide-y-2 divide-gray-100 dark:divide-zinc-600 border-2 dark:border-zinc-600 w-full max-w-[95%] rounded-lg shadow-lg">
      {/* Position + Constructor Name */}
      <p className="text-lg px-5 font-medium py-3 flex gap-x-3 bg-gray-100 dark:bg-zinc-800">
        {item?.position}. <span>{item?.Constructor?.name}</span>
      </p>
      {/* Display Points and Grand Prix wins */}
      <div className="flex justify-between">
        <p className="px-5 py-3 text-lg font-medium">
          Points : <span>{item?.points}</span>
        </p>
        <p className="px-5 py-3">
          Grand Prix Wins : <span>{item?.wins}</span>
        </p>
      </div>

      {/* Display Constructor Nationality */}
      <p className="px-5 py-3">
        Nationality : {item?.Constructor?.nationality}{" "}
        <span
          className={`mx-2 fi fi-${ConstructorCountryCode?.toLowerCase()}`}
        ></span>
      </p>
    </div>
  );
};

ConstructorStandingCard.propTypes = {
  item: PropTypes.shape({
    driver: PropTypes.object,
    Constructor: PropTypes.object,
    position: PropTypes.number.isRequired,
    points: PropTypes.number,
    wins: PropTypes.number,
  }).isRequired,
};

// --------------------------------------------------------------------------------------------------------

// Loading Placeholder Table / Card
const LoadingTableCard = () => {
  return (
    <>
      <div className="hidden md:block pt-10 pb-5 w-full overflow-x-auto">
        <table className="rounded-lg w-full overflow-hidden bg-white dark:bg-secondarydarkbg">
          <TableHeader>
            <TableRow className="text-left bg-gray-100 dark:bg-zinc-800">
              <TableHead className="font-bold text-black dark:text-darkmodetext py-6 pl-3 text-nowrap">
                Position
              </TableHead>
              <TableHead className="font-bold text-black dark:text-darkmodetext">
                Constructor
              </TableHead>
              <TableHead className="font-bold text-black dark:text-darkmodetext">
                Nationality
              </TableHead>
              <TableHead className="font-bold text-black dark:text-darkmodetext">
                Points
              </TableHead>
              <TableHead className="font-bold text-black dark:text-darkmodetext">
                Wins
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array(20)
              .fill(null)
              ?.map((driver, i) => {
                return (
                  <TableRow
                    className="text-left border-b-2 border-gray-100 dark:border-zinc-600"
                    key={i}
                  >
                    <TableCell className="font-medium py-3 px-3 md:w-[5em]">
                      <div className="bg-gray-300 dark:bg-gray-500 animate-pulse w-10 h-5 rounded"></div>
                    </TableCell>
                    <TableCell className="px-2">
                      <div className="bg-gray-300 dark:bg-gray-500 animate-pulse w-[90%] h-5 rounded"></div>
                    </TableCell>
                    <TableCell className="px-2">
                      <div className="bg-gray-300 dark:bg-gray-500 animate-pulse w-[40%] h-5 rounded"></div>
                    </TableCell>
                    <TableCell className="px-2">
                      <div className="bg-gray-300 dark:bg-gray-500 animate-pulse w-[40%] h-5 rounded"></div>
                    </TableCell>
                    <TableCell className="gap-x-2 px-2 text-nowrap">
                      <div className="bg-gray-300 dark:bg-gray-500 animate-pulse w-[70%] h-5 rounded"></div>
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
                className="flex flex-col divide-y-2 divide-gray-100 dark:divide-zinc-600 border-2 dark:border-zinc-600 w-full max-w-[95%] rounded-lg shadow-lg"
              >
                <div className="text-lg px-5 font-medium py-3 flex gap-x-3 bg-gray-100 dark:bg-zinc-800">
                  <div className="h-5 w-[70%] bg-gray-300 dark:bg-gray-500 animate-pulse rounded"></div>
                </div>
                <div className="flex justify-between px-5 py-3">
                  <div className="h-5 w-[30%] bg-gray-300 dark:bg-gray-500 rounded"></div>

                  <div className="h-5 w-[30%] bg-gray-300 dark:bg-gray-500 rounded"></div>
                </div>

                <div className="flex gap-x-2 px-5 py-3">
                  <div className="h-5 w-[70%] bg-gray- animate-pulse rounded"></div>
                  <div className="h-5 w-[10%] bg-gray-300 dark:bg-gray-500 animate-pulse rounded"></div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

// --------------------------------------------------------------------------------------------------------

const ConstructorStandings = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const { year: urlYear } = useParams();
  const [year, setYear] = useState<undefined | number>();
  const [userSelectedYear, setUserSelectedYear] = useState<
    undefined | number
  >();
  const [displayYear, setDisplayYear] = useState<undefined | number>();
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
    queryKey: ["ConstructorsStandings", year],
    queryFn: () => {
      return axiosInstance.post("/getConstructorStandings", {
        year: year,
      });
    },
    enabled: false,
    staleTime: 1000 * 60 * 15,
  });

  // Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Set standings for the current year into the state
  useEffect(() => {
    if (data?.data?.standings?.standings?.standings) {
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
        parseInt(urlYear) <= new Date().getFullYear()
      ) {
        setYear(parseInt(urlYear));
        setInvalidURL(false);
      } else {
        console.log("Invalid year specified");
        setInvalidURL(true);
      }
    } else {
      setYear(new Date().getFullYear());
    }
  }, [urlYear]);

  // Fetch drivers
  useEffect(() => {
    if (year) {
      fetchStandings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchStandings, year]);

  // Set window title.
  useEffect(() => {
    document.title = displayYear
      ? `Constructors Standings ${displayYear} | GridBox F1`
      : `Constructors Standings | GridBox F1`;
  }, [displayYear]);

  return (
    <main className="bg-greyBG dark:bg-darkbg flex justify-center py-10 rounded-lg">
      <section className="w-full max-w-[96%] rounded px-2 py-5 shadow bg-white dark:bg-secondarydarkbg">
        {/* Input Section */}
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

          {/* Change URL to fetch data */}
          <CTAButton
            className="w-full md:w-fit py-2 px-6 border-2 rounded"
            disabled={isLoading || invalidYear || !userSelectedYear}
            onClick={() => {
              navigate(`/constructors-standings/${userSelectedYear}`);
            }}
            text="Fetch"
          ></CTAButton>

          {/* Loader */}
          {isLoading && (
            <div className="w-full md:w-fit flex justify-center">
              <SyncLoader color={isDarkMode ? "#FFF" : "#000"} />
            </div>
          )}
        </header>

        {/* Invalid year error  */}
        <div
          className={`text-red-600 font-medium px-5 overflow-hidden  ${
            invalidYear ? "h-14" : "h-0"
          } transition-all`}
        >
          Year must be between 1950 & {new Date().getFullYear()}
        </div>

        {/* Title */}
        <h1 className="text-4xl py-5 border-t-4 border-r-4 border-black dark:border-darkmodetext rounded-xl font-semibold px-2">
          Constructors Standings {displayYear}
        </h1>

        {/* Data unavailable */}
        {error && isAxiosError(error) && error?.response?.status == 404 && (
          <div className="py-20 flex justify-center items-center">
            <ErrorDiv text="Constructor standings data for the requested year is not available." />
          </div>
        )}

        {/* Server error */}
        {error && isAxiosError(error) && error?.response?.status != 404 && (
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
            {/* Table to be displayd on larger screens */}
            <div className="hidden md:block pt-10 pb-5 overflow-x-auto">
              <table className="rounded-lg w-full overflow-hidden bg-white dark:bg-secondarydarkbg">
                <TableHeader>
                  <TableRow className="text-left bg-gray-100 dark:bg-zinc-800">
                    <TableHead className="font-bold text-black dark:text-darkmodetext py-6 pl-3 text-nowrap">
                      Position
                    </TableHead>
                    <TableHead className="font-bold text-black dark:text-darkmodetext">
                      Constructor
                    </TableHead>
                    <TableHead className="font-bold text-black dark:text-darkmodetext">
                      Nationality
                    </TableHead>
                    <TableHead className="font-bold text-black dark:text-darkmodetext">
                      Points
                    </TableHead>
                    <TableHead className="font-bold text-black dark:text-darkmodetext">
                      Wins
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {standings?.map((item, i) => {
                    const ConstructorCountry =
                      nationalityMap[
                        String(item?.Constructor?.nationality).trim()
                      ];
                    const ConstructorCountryCode = countries.getAlpha2Code(
                      ConstructorCountry,
                      "en"
                    );

                    return (
                      <TableRow
                        className="text-left border-b-2 border-gray-100 dark:border-zinc-600"
                        key={item.position}
                      >
                        {/* Position */}
                        <TableCell className="font-medium py-3 px-3 md:w-[5em] text-center">
                          {i + 1}.
                        </TableCell>
                        {/* Constructor Name */}
                        <TableCell className="px-2">
                          {item?.Constructor?.name}
                        </TableCell>
                        {/* Constructor Nationality */}
                        <TableCell className="px-2">
                          <span
                            className={`mx-2 fi fi-${ConstructorCountryCode?.toLowerCase()}`}
                          ></span>
                          {item?.Constructor?.nationality}
                        </TableCell>
                        {/* Points Scored */}
                        <TableCell className="gap-x-2 px-2 text-nowrap">
                          {item?.points}
                        </TableCell>
                        {/* Grand Prix Wins */}
                        <TableCell className="px-2 text-nowrap">
                          {item?.wins}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </table>
            </div>
            {/* Cards to be displayed on smaller screens */}
            <div className="md:hidden flex flex-col items-center gap-y-5 py-10">
              {standings?.map((item) => {
                return (
                  <ConstructorStandingCard item={item} key={item.driverId} />
                );
              })}
            </div>
          </>
        )}

        {/* Show when standings have not been fetched */}
        {!invalidURL && !error && standings.length == 0 && <LoadingTableCard />}
      </section>
    </main>
  );
};

export default ConstructorStandings;
