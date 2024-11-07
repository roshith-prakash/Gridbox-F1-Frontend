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

// To get country from nationality
import { nationalityMap } from "../data/nationalityToCountry";

// To show flags for the standings
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import "flag-icons/css/flag-icons.min.css";
import { useParams } from "react-router-dom";

// Register the locale for the countries constructor
countries.registerLocale(enLocale);

// To be displayed on Mobile screens
const DriverPositionCard = ({ item }) => {
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
      <p className="px-5 py-3">
        Constructor : {item?.constructor?.name}{" "}
        <span
          className={`mx-2 fi fi-${constructorCountryCode?.toLowerCase()}`}
        ></span>
      </p>
      <p className={`px-5 py-3`}>Q1 : {item?.q1 ? item?.q1 : "---"}</p>
      <p className={`px-5 py-3`}>Q2 : {item?.q2 ? item?.q2 : "---"}</p>
      <p className={`px-5 py-3`}>Q3 : {item?.q3 ? item?.q3 : "---"}</p>
    </div>
  );
};

DriverPositionCard.propTypes = {
  item: PropTypes.shape({
    position: PropTypes.number,
    driver: PropTypes.object,
    constructor: PropTypes.object,
    q1: PropTypes.string,
    q2: PropTypes.string,
    q3: PropTypes.string,
  }).isRequired,
};

// Loading Placeholder Table / Card
const LoadingTableCard = () => {
  return (
    <>
      <div className="hidden md:flex justify-center py-10 overflow-x-auto">
        {/* Loading Table on Large Screen */}
        <table className="rounded-lg w-full lg:max-w-[95%] overflow-hidden bg-white shadow-lg">
          <TableHeader>
            <TableRow className="text-left bg-gray-100">
              <TableHead className="py-6">Position</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Constructor</TableHead>
              <TableHead>Q1</TableHead>
              <TableHead>Q2</TableHead>
              <TableHead>Q3</TableHead>
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
                      <div className="bg-gray-300 animate-pulse w-[70%] h-5 rounded"></div>
                    </TableCell>

                    <TableCell className="gap-x-2 px-2 text-nowrap">
                      <div className="bg-gray-300 animate-pulse w-[70%] h-5 rounded"></div>
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
                  <div className="bg-gray-300 animate-pulse w-[60%] h-5 rounded"></div>
                  <div className="bg-gray-300 animate-pulse w-[15%] h-5 rounded"></div>
                </div>
                <div className="px-5 py-3">
                  <div className="flex gap-x-2">
                    <div className="bg-gray-300 animate-pulse w-[60%] h-5 rounded"></div>
                    <div className="bg-gray-300 animate-pulse w-[15%] h-5 rounded"></div>
                  </div>
                </div>
                <div className={`px-5 py-3`}>
                  <div className="bg-gray-300 animate-pulse w-[60%] h-5 rounded"></div>
                </div>
                <div className={`px-5 py-3`}>
                  <div className="bg-gray-300 animate-pulse w-[60%] h-5 rounded"></div>
                </div>
                <div className={`px-5 py-3`}>
                  <div className="bg-gray-300 animate-pulse w-[60%] h-5 rounded"></div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

const QualiResult = () => {
  const { year: urlYear, round: urlRound } = useParams();
  const [year, setYear] = useState();
  const [round, setRound] = useState();
  const [displayYear, setDisplayYear] = useState();
  const [displayRound, setDisplayRound] = useState();
  const [standings, setStandings] = useState([]);

  // Query function to fetch standings for each year
  const {
    data,
    refetch: fetchQualiResult,
    isLoading,
  } = useQuery({
    queryKey: ["qualiResult", year, round],
    queryFn: () => {
      return axiosInstance.post("/getQualifyingResult", {
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

  // Set standings for the current year into the state
  useEffect(() => {
    if (data?.data?.result) {
      setStandings(data?.data?.result?.result?.result);
      setDisplayYear(data?.data?.result?.year);
      setDisplayRound(data?.data?.result?.round);
    } else {
      console.log("No data received");
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
        parseInt(urlYear) <= 2024 &&
        urlRound &&
        !Number.isNaN(urlRound)
      ) {
        setYear(parseInt(urlYear));
        setRound(parseInt(urlRound));
      } else {
        console.log("Invalid year / round specified");
      }
    } else {
      console.log("Year and round not provided");
    }
  }, [urlYear, urlRound]);

  useEffect(() => {
    if (!!year && !!round) {
      fetchQualiResult();
    }
  }, [fetchQualiResult, year, round]);

  return (
    <>
      {isLoading && <p>Fetching standings...</p>}
      {/* Show driver name and country when driver data is present */}
      {standings.length > 0 && (
        <>
          <p className="text-2xl font-semibold px-2">
            Qualifying result for Round {displayRound} of the {displayYear}{" "}
            season :
          </p>
          <div className="hidden md:flex justify-center py-10 overflow-x-auto">
            <table className="rounded-lg w-full lg:max-w-[95%] overflow-hidden bg-white shadow-lg">
              <TableHeader>
                <TableRow className="text-left bg-gray-100">
                  <TableHead className="py-6">Position</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Constructor</TableHead>
                  <TableHead>Q1</TableHead>
                  <TableHead>Q2</TableHead>
                  <TableHead>Q3</TableHead>
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
                      className={`text-left border-b-2 border-gray-100`}
                      key={item.position}
                    >
                      <TableCell className="font-medium py-3 px-3 md:w-[5em] text-center">
                        {i + 1}.
                      </TableCell>
                      <TableCell className="px-2 w-fit">
                        <span
                          className={`mx-2 fi fi-${driverCountryCode?.toLowerCase()}`}
                        ></span>
                        {item?.driver?.givenName} {item?.driver?.familyName} (
                        {item?.number})
                      </TableCell>

                      <TableCell className="px-2">
                        <span
                          className={`mx-2 fi fi-${constructorCountryCode?.toLowerCase()}`}
                        ></span>
                        {item?.constructor?.name}
                      </TableCell>

                      <TableCell className="gap-x-2 px-2 text-nowrap">
                        {item?.q1 ? item?.q1 : "---"}
                      </TableCell>
                      <TableCell className="gap-x-2 px-2 text-nowrap">
                        {item?.q2 ? item?.q2 : "---"}
                      </TableCell>
                      <TableCell className="px-2 text-nowrap">
                        {item?.q3 ? item?.q3 : "---"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </table>
          </div>
          <div className="md:hidden flex flex-col items-center gap-y-5 py-10">
            {standings?.map((item) => {
              return <DriverPositionCard item={item} key={item.driverId} />;
            })}
          </div>
        </>
      )}
      {/* When quali result is not present */}
      {standings.length == 0 && <LoadingTableCard />}
    </>
  );
};

export default QualiResult;
