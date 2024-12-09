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
import { useParams } from "react-router-dom";
import { ErrorDiv } from "../components";

// To get country from nationality
import { nationalityMap } from "../data/nationalityToCountry";

// To show flags for the standings
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import "flag-icons/css/flag-icons.min.css";

// Register the locale for the countries constructor
countries.registerLocale(enLocale);

// To be displayed on Mobile screens
const DriverPositionCard = ({ item }) => {
  const driverCountry =
    nationalityMap[String(item?.Driver?.nationality).trim()];
  const driverCountryCode = countries.getAlpha2Code(driverCountry, "en");

  const constructorCountry =
    nationalityMap[String(item?.Constructor?.nationality).trim()];
  const constructorCountryCode = countries.getAlpha2Code(
    constructorCountry,
    "en"
  );

  return (
    <div className="flex flex-col overflow-hidden divide-y-2 divide-gray-100 dark:divide-zinc-600 border-2 dark:border-zinc-600 w-full max-w-[95%] rounded-lg shadow-lg">
      {/* Position + driver name + flag */}
      <p className="text-lg px-5 font-medium py-3 flex gap-x-3 bg-gray-100 dark:bg-zinc-800">
        {item?.position}.{" "}
        <span>
          {item?.Driver?.givenName} {item?.Driver?.familyName}
        </span>
        <span
          className={`mx-2 fi fi-${driverCountryCode?.toLowerCase()}`}
        ></span>
      </p>
      {/* Finishing status + points */}
      <div className="flex justify-between px-5 py-3 font-medium">
        <p>
          Status : <span>{item?.status}</span>
        </p>
        <p>
          Points : <span>{item?.points}</span>
        </p>
      </div>
      {/* Constructor name + flag */}
      <p className="px-5 py-3">
        Constructor : {item?.Constructor?.name}{" "}
        <span
          className={`mx-2 fi fi-${constructorCountryCode?.toLowerCase()}`}
        ></span>
      </p>

      {/* Fastest lap */}
      {item?.FastestLap?.Time?.time && (
        <p
          className={`px-5 py-3 ${
            item?.FastestLap?.rank == 1 && "bg-purple-200 dark:text-black"
          }`}
        >
          Fastest Lap : {item?.FastestLap?.Time?.time}
        </p>
      )}

      {/* Race time */}
      <p className="px-5 py-3">
        Time : {item?.Time?.time ? item?.Time?.time : "---"}
      </p>
    </div>
  );
};

DriverPositionCard.propTypes = {
  item: PropTypes.shape({
    Driver: PropTypes.object,
    Constructor: PropTypes.object,
    FastestLap: PropTypes.object,
    Time: PropTypes.object,
    status: PropTypes.string,
    position: PropTypes.number,
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
                Grid
              </TableHead>
              <TableHead className="font-bold text-black dark:text-darkmodetext">
                Points
              </TableHead>
              <TableHead className="font-bold text-black dark:text-darkmodetext">
                Status
              </TableHead>
              <TableHead className="font-bold text-black dark:text-darkmodetext text-center">
                Fastest Lap
              </TableHead>
              <TableHead className="font-bold text-black dark:text-darkmodetext text-center">
                Time
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
                      <div className="bg-gray-300 dark:bg-gray-500 animate-pulse w-[40%] h-5 rounded"></div>
                    </TableCell>

                    <TableCell className="gap-x-2 px-2 text-nowrap">
                      <div className="bg-gray-300 dark:bg-gray-500 animate-pulse w-[40%] h-5 rounded"></div>
                    </TableCell>

                    <TableCell className="gap-x-2 px-2 text-nowrap">
                      <div className="bg-gray-300 dark:bg-gray-500 animate-pulse w-[70%] h-5 rounded"></div>
                    </TableCell>

                    <TableCell className="px-2">
                      <div className="bg-gray-300 dark:bg-gray-500 animate-pulse w-[70%] h-5 rounded"></div>
                    </TableCell>

                    <TableCell className="px-2">
                      <div className="bg-gray-300 dark:bg-gray-500 animate-pulse w-[80%] h-5 rounded"></div>
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
                className="flex flex-col overflow-hidden divide-y-2 divide-gray-100 dark:divide-zinc-600  border-2 dark:border-zinc-600 w-full max-w-[95%] rounded-lg shadow-lg"
              >
                <div className="text-lg px-5 font-medium py-3 flex gap-x-3 bg-gray-100 dark:bg-zinc-800">
                  <div className="bg-gray-300 dark:bg-gray-500 animate-pulse w-[70%] h-5 rounded"></div>
                  <div className="bg-gray-300 dark:bg-gray-500 animate-pulse w-[10%] h-5 rounded"></div>
                </div>
                <div className="flex justify-between px-5 py-3 font-medium">
                  <div className="bg-gray-300 dark:bg-gray-500 animate-pulse w-[30%] h-5 rounded"></div>
                  <div className="bg-gray-300 dark:bg-gray-500 animate-pulse w-[30%] h-5 rounded"></div>
                </div>
                <div className="px-5 py-3 flex gap-x-3">
                  <div className="bg-gray-300 dark:bg-gray-500 animate-pulse w-[70%] h-5 rounded"></div>
                  <div className="bg-gray-300 dark:bg-gray-500 animate-pulse w-[10%] h-5 rounded"></div>
                </div>
                <div className={`px-5 py-3`}>
                  <div className="bg-gray-300 dark:bg-gray-500 animate-pulse w-[70%] h-5 rounded"></div>
                </div>

                <div className="px-5 py-3">
                  <div className="bg-gray-300 dark:bg-gray-500 animate-pulse w-[70%] h-5 rounded"></div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

const RaceResult = () => {
  const { year: urlYear, round: urlRound } = useParams();
  const [year, setYear] = useState();
  const [round, setRound] = useState();
  const [displayYear, setDisplayYear] = useState();
  const [displayRound, setDisplayRound] = useState();
  const [displayRace, setDisplayRace] = useState();
  const [standings, setStandings] = useState([]);
  const [invalidURL, setInvalidURL] = useState(false);

  // Query function to fetch standings for each year
  const {
    data,
    refetch: fetchRaceResult,
    error,
  } = useQuery({
    queryKey: ["raceResult", year, round],
    queryFn: () => {
      return axiosInstance.post("/getRaceResult", {
        year: year,
        round: round,
      });
    },
    enabled: false,
    staleTime: Infinity,
  });

  // Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Set result for the current year into the state
  useEffect(() => {
    if (data?.data?.result) {
      setStandings(data?.data?.result?.result?.result?.Results);
      setDisplayYear(data?.data?.result?.result?.result?.season);
      setDisplayRound(data?.data?.result?.result?.result?.round);
      setDisplayRace(data?.data?.result?.result?.result?.raceName);
    } else {
      console.log("No data received");
    }
  }, [data?.data]);

  // If year and round is present in URL
  useEffect(() => {
    if (urlYear) {
      // Valid Year in URL param
      if (
        urlYear &&
        !Number.isNaN(urlYear) &&
        parseInt(urlYear) >= 1950 &&
        parseInt(urlYear) <= 2024 &&
        urlRound &&
        !Number.isNaN(urlRound)
      ) {
        setYear(parseInt(urlYear));
        setRound(parseInt(urlRound));
        setInvalidURL(false);
      } else {
        console.log("Invalid year specified");
        setInvalidURL(true);
      }
    } else {
      console.log("Year and round not provided");
    }
  }, [urlYear, urlRound]);

  // Fetch result
  useEffect(() => {
    if (year && round) {
      fetchRaceResult();
    }
  }, [fetchRaceResult, year, round]);

  // Set window title.
  useEffect(() => {
    if (displayRace) {
      document.title = `Race - ${displayRace} | GridBox F1`;
    }
  }, [displayRace]);

  return (
    <main className="bg-greyBG dark:bg-darkbg flex justify-center py-10 rounded-lg">
      <section className="w-full max-w-[96%] rounded px-2 py-5 shadow bg-white dark:bg-secondarydarkbg">
        {/* Data unavailable */}
        {error && error?.response?.status == 404 && (
          <div className="py-20 flex justify-center items-center">
            <ErrorDiv text="Race data for the requested round is not available." />
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
            <ErrorDiv text="Invalid Year or Round specified in URL." />
          </div>
        )}

        {/* Show driver name and country when driver data is present */}
        {!error && standings.length > 0 && (
          <>
            {/* Title */}
            <h1 className="text-4xl py-5 border-t-4 border-r-4 border-black dark:border-darkmodetext rounded-xl font-semibold px-2">
              Race Result for the {displayRace}
              <p className="my-2">
                Round {displayRound} of the {displayYear} season
              </p>
            </h1>
            {/* Table to be displayed on larger screen */}
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
                      Grid
                    </TableHead>
                    <TableHead className="font-bold text-black dark:text-darkmodetext">
                      Points
                    </TableHead>
                    <TableHead className="font-bold text-black dark:text-darkmodetext">
                      Status
                    </TableHead>

                    {standings[0]?.FastestLap?.Time?.time && (
                      <TableHead className="font-bold text-black dark:text-darkmodetext text-center">
                        Fastest Lap
                      </TableHead>
                    )}

                    <TableHead className="font-bold text-black dark:text-darkmodetext text-center">
                      Time
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {standings?.map((item) => {
                    const driverCountry =
                      nationalityMap[String(item?.Driver?.nationality).trim()];
                    const driverCountryCode = countries.getAlpha2Code(
                      driverCountry,
                      "en"
                    );

                    const constructorCountry =
                      nationalityMap[
                        String(item?.Constructor?.nationality).trim()
                      ];
                    const constructorCountryCode = countries.getAlpha2Code(
                      constructorCountry,
                      "en"
                    );

                    return (
                      // Row will be purple if driver had fastest lap
                      <TableRow
                        className={`text-left border-b-2 border-gray-100 dark:border-zinc-600 ${
                          item?.FastestLap?.rank == 1 &&
                          "bg-purple-300 hover:bg-purple-400 text-black"
                        }`}
                        key={item.position}
                      >
                        {/* Position */}
                        <TableCell className="font-medium py-3 px-3 md:w-[5em] text-center">
                          {item?.position}.
                        </TableCell>

                        {/* Driver name + flag */}
                        <TableCell className="px-2 w-fit">
                          <span
                            className={`mx-2 fi fi-${driverCountryCode?.toLowerCase()}`}
                          ></span>
                          {item?.Driver?.givenName} {item?.Driver?.familyName} (
                          {item?.number})
                        </TableCell>

                        {/* Constructor name + flag */}
                        <TableCell className="px-2">
                          <span
                            className={`mx-2 fi fi-${constructorCountryCode?.toLowerCase()}`}
                          ></span>
                          {item?.Constructor?.name}
                        </TableCell>

                        {/* start Grid position */}
                        <TableCell className="gap-x-2 px-2 text-nowrap">
                          {item?.grid}
                        </TableCell>
                        {/* Points scored */}
                        <TableCell className="gap-x-2 px-2 text-nowrap">
                          {item?.points}
                        </TableCell>
                        {/* Status */}
                        <TableCell className="px-2 text-nowrap">
                          {item?.status}
                        </TableCell>

                        {/* Display fastest lap if it exists */}
                        {standings[0]?.FastestLap?.Time?.time && (
                          <TableCell className="px-2 text-nowrap text-center">
                            {item?.FastestLap?.Time?.time}
                          </TableCell>
                        )}

                        {/* Race time */}
                        <TableCell className="px-2 text-nowrap text-center">
                          {item?.Time?.time ? item?.Time?.time : "---"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </table>
            </div>

            {/* Card to be displayed on smaller screens */}
            <div className="md:hidden flex flex-col items-center gap-y-5 py-10">
              {standings?.map((item) => {
                return <DriverPositionCard item={item} key={item.driverId} />;
              })}
            </div>
          </>
        )}

        {/* When fetching race results */}
        {!invalidURL && !error && standings.length == 0 && <LoadingTableCard />}
      </section>
    </main>
  );
};

export default RaceResult;
