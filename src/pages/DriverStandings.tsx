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
import { useDarkMode } from "../context/DarkModeContext";
import { isAxiosError } from "axios";

// Register the locale for the countries Constructor
countries.registerLocale(enLocale);

// To be displayed on Mobile screens
const DriverStandingCard = ({ item }) => {
  const DriverCountry =
    nationalityMap[String(item?.Driver?.nationality).trim()];
  const DriverCountryCode = countries.getAlpha2Code(DriverCountry, "en");

  return (
    <div className="flex flex-col overflow-hidden divide-y-2 divide-gray-100 dark:divide-zinc-600 border-2 dark:border-zinc-600 w-full max-w-[95%] rounded-lg shadow-lg">
      {/* Position + Driver Name + Driver Nationality */}
      <p className="text-lg px-5 font-medium py-3 flex gap-x-3 bg-gray-100 dark:bg-zinc-800">
        {item?.position}.{" "}
        <span>
          {item?.Driver?.givenName} {item?.Driver?.familyName}
        </span>
        <span
          className={`mx-2 fi fi-${DriverCountryCode?.toLowerCase()}`}
        ></span>
      </p>
      {/* Points scored */}
      <p className="px-5 py-3 text-lg font-medium">
        Points : <span>{item?.points}</span>
      </p>
      {/* Driver Code + Number */}
      <div className="flex px-5 py-3">
        <p className="flex-1">
          Code : {item?.Driver?.code ? item?.Driver?.code : "-"}
        </p>
        <p className="flex-1">
          Number :{" "}
          {item?.Driver?.permanentNumber ? item?.Driver?.permanentNumber : "-"}
        </p>
      </div>
      {/* Constructor + Nationality */}
      <div className="px-5 flex gap-x-2 py-3">
        Constructor:{" "}
        {item?.Constructors?.map((constructor, j) => {
          const ConstructorCountry =
            nationalityMap[String(constructor?.nationality).trim()];
          const ConstructorCountryCode = countries.getAlpha2Code(
            ConstructorCountry,
            "en"
          );

          return (
            <div key={j} className="flex">
              <span
                className={`mx-2 fi fi-${ConstructorCountryCode?.toLowerCase()}`}
              ></span>
              {constructor?.name}{" "}
            </div>
          );
        })}
      </div>
      {/* Grand Prix Wins */}
      <p className="px-5 py-3">
        Grand Prix Wins : <span>{item?.wins}</span>
      </p>
    </div>
  );
};

DriverStandingCard.propTypes = {
  item: PropTypes.shape({
    Driver: PropTypes.object,
    Constructors: PropTypes.object,
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
        <table className="rounded-lg w-full overflow-hidden bg-white dark:bg-secondarydarkbg">
          <TableHeader>
            <TableRow className="text-left bg-gray-100 dark:bg-zinc-800">
              <TableHead className="font-bold text-black dark:text-darkmodetext py-6 pl-3 text-nowrap">
                Position
              </TableHead>
              <TableHead className="font-bold text-black dark:text-darkmodetext">
                Driver
              </TableHead>
              <TableHead className="font-bold text-black dark:text-darkmodetext">
                Constructor
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
              ?.map((Driver, i) => {
                return (
                  <TableRow
                    className="text-left border-b-2 border-gray-100 dark:border-zinc-600"
                    key={i}
                  >
                    <TableCell className="font-medium py-3 px-3 md:w-[5em]">
                      <div className="bg-gray-300 dark:bg-gray-500 animate-pulse w-10 h-5 rounded"></div>
                    </TableCell>

                    <TableCell className="px-2 h-full py-3">
                      <div className="flex gap-x-2">
                        <div className="bg-gray-300 dark:bg-gray-500 animate-pulse w-[15%] h-5 rounded"></div>
                        <div className="bg-gray-300 dark:bg-gray-500 animate-pulse w-[60%] h-5 rounded"></div>
                      </div>
                    </TableCell>

                    <TableCell className="px-2 h-full py-3">
                      <div className="flex gap-x-2">
                        <div className="bg-gray-300 dark:bg-gray-500 animate-pulse w-[15%] h-5 rounded"></div>
                        <div className="bg-gray-300 dark:bg-gray-500 animate-pulse w-[40%] h-5 rounded"></div>
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
                className="flex flex-col overflow-hidden divide-y-2 divide-gray-100 dark:divide-zinc-600 border-2 w-full max-w-[95%] rounded-lg shadow-lg"
              >
                <div className="text-lg px-5 font-medium py-3 flex gap-x-3 bg-gray-100 dark:bg-zinc-800">
                  <div className="h-5 w-[70%] bg-gray-300 dark:bg-gray-500 animate-pulse rounded"></div>

                  <div className="h-5 w-[10%] bg-gray-300 dark:bg-gray-500 animate-pulse rounded"></div>
                </div>
                <p className="px-5 py-3 text-lg font-medium">
                  <div className="h-5 w-[70%] bg-gray-300 dark:bg-gray-500 animate-pulse rounded"></div>
                </p>
                <div className="flex px-5 py-3">
                  <div className="flex-1">
                    <div className="h-5 w-[70%] bg-gray-300 dark:bg-gray-500 animate-pulse rounded"></div>
                  </div>
                  <div className="flex-1">
                    <div className="h-5 w-[70%] bg-gray-300 dark:bg-gray-500 animate-pulse rounded"></div>
                  </div>
                </div>
                <div className="px-5 py-3 flex gap-x-3">
                  <div className="h-5 w-[70%] bg-gray-300 dark:bg-gray-500 animate-pulse rounded"></div>
                  <div className="h-5 w-[10%] bg-gray-300 dark:bg-gray-500 animate-pulse rounded"></div>
                </div>
                <div className="px-5 py-3">
                  <div className="h-5 w-[70%] bg-gray-300 dark:bg-gray-500 animate-pulse rounded"></div>
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

  const [customError, setCustomError] = useState(false);

  // Query function to fetch standings for each year
  const {
    data,
    refetch: fetchStandings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["DriversStandings", year],
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
    if (data?.data) {
      if (data?.data?.standings?.standings?.standings) {
        setCustomError(false);
        setStandings(data?.data?.standings?.standings?.standings);
        setDisplayYear(data?.data?.standings?.year);
      } else {
        setCustomError(true);
      }
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

  // Fetch Drivers
  useEffect(() => {
    if (year) {
      fetchStandings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchStandings, year]);

  // Set window title.
  useEffect(() => {
    document.title = displayYear
      ? `Drivers Standings ${displayYear} | GridBox F1`
      : `Drivers Standings | GridBox F1`;
  }, [displayYear]);

  console.log(data?.data);

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
              navigate(`/drivers-standings/${userSelectedYear}`);
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
          Drivers Standings {!customError && displayYear}
        </h1>

        {/* Data unavailable */}
        {error && isAxiosError(error) && error?.response?.status == 404 && (
          <div className="py-20 flex justify-center items-center">
            <ErrorDiv text="Drivers Standings data for the requested year is not available." />
          </div>
        )}

        {/* Server error */}
        {error && isAxiosError(error) && error?.response?.status != 404 && (
          <div className="py-20 flex justify-center items-center">
            <ErrorDiv />
          </div>
        )}

        {customError && (
          <div className="py-20 flex justify-center items-center">
            <ErrorDiv text="Drivers Standings data for the requested year is not available." />
          </div>
        )}

        {/* Invalid param in URL */}
        {!year && invalidURL && (
          <div className="py-20 flex justify-center items-center">
            <ErrorDiv text="Invalid Year specified in URL." />
          </div>
        )}

        {/* Show Driver name and country when Driver data is present */}
        {!customError && !error && standings.length > 0 && (
          <>
            {/* Table to be displayed on Larger screens */}
            <div className="hidden md:block pt-10 pb-5 overflow-x-auto">
              <table className="rounded-lg w-full overflow-hidden bg-white dark:bg-secondarydarkbg">
                <TableHeader>
                  <TableRow className="text-left bg-gray-100 dark:bg-zinc-800">
                    <TableHead className="font-bold text-black dark:text-darkmodetext py-6 pl-3 text-nowrap">
                      Position
                    </TableHead>
                    <TableHead className="font-bold text-black dark:text-darkmodetext">
                      Driver
                    </TableHead>
                    <TableHead className="font-bold text-black dark:text-darkmodetext">
                      Constructor
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
                    const DriverCountry =
                      nationalityMap[String(item?.Driver?.nationality).trim()];
                    const DriverCountryCode = countries.getAlpha2Code(
                      DriverCountry,
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

                        {/* Driver name + flag */}
                        <TableCell className="px-2">
                          <span
                            className={`mx-2 fi fi-${DriverCountryCode?.toLowerCase()}`}
                          ></span>
                          {item?.Driver?.givenName} {item?.Driver?.familyName}
                        </TableCell>

                        {/* Map constructors - display Constructor name + flag */}
                        <TableCell className="px-2 flex gap-x-2">
                          {item?.Constructors?.map((constructor, j) => {
                            const ConstructorCountry =
                              nationalityMap[
                                String(constructor?.nationality).trim()
                              ];
                            const ConstructorCountryCode =
                              countries.getAlpha2Code(ConstructorCountry, "en");

                            return (
                              <div key={j} className="flex">
                                <span
                                  className={`mx-2 fi fi-${ConstructorCountryCode?.toLowerCase()}`}
                                ></span>
                                {constructor?.name}{" "}
                              </div>
                            );
                          })}
                        </TableCell>

                        {/* Points scored */}
                        <TableCell className="gap-x-2 px-2 text-nowrap">
                          {item?.points}
                        </TableCell>

                        {/* Grand Prix wins */}
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
                return <DriverStandingCard item={item} key={item.DriverId} />;
              })}
            </div>
          </>
        )}

        {/* When loading initial data */}
        {!customError && !invalidURL && !error && standings.length == 0 && (
          <LoadingTableCard />
        )}
      </section>
    </main>
  );
};

export default DriverStandings;
