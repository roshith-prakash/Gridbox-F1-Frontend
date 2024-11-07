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
import { useNavigate, useParams } from "react-router-dom";
import { ErrorDiv, YearPicker } from "../components";

// Register the locale for the countries constructor
countries.registerLocale(enLocale);

// To be displayed on Mobile screens
const ConstructorStandingCard = ({ item }) => {
  const constructorCountry =
    nationalityMap[String(item?.constructor?.nationality).trim()];
  const constructorCountryCode = countries.getAlpha2Code(
    constructorCountry,
    "en"
  );

  return (
    <div className="flex flex-col divide-y-2 divide-gray-100 border-2 w-full max-w-[95%] rounded-lg shadow-lg">
      <p className="text-lg px-5 font-medium py-3 flex gap-x-3 bg-gray-100">
        {item?.position}. <span>{item?.constructor?.name}</span>
      </p>
      <div className="flex justify-between">
        <p className="px-5 py-3 text-lg font-medium">
          Points : <span>{item?.points}</span>
        </p>
        <p className="px-5 py-3">
          Grand Prix Wins : <span>{item?.wins}</span>
        </p>
      </div>

      <p className="px-5 py-3">
        Nationality : {item?.constructor?.nationality}{" "}
        <span
          className={`mx-2 fi fi-${constructorCountryCode?.toLowerCase()}`}
        ></span>
      </p>
    </div>
  );
};

ConstructorStandingCard.propTypes = {
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
      <div className="hidden md:flex justify-center py-10 overflow-x-auto">
        {/* Loading Table on Large Screen */}
        <table className="rounded-lg w-full lg:max-w-[95%] overflow-hidden bg-white shadow-lg">
          <TableHeader>
            <TableRow className="text-left bg-gray-100">
              <TableHead className="py-6">Position</TableHead>
              <TableHead>Constructor</TableHead>
              <TableHead>Nationality</TableHead>
              <TableHead>Points</TableHead>
              <TableHead>Wins</TableHead>
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
                    <TableCell className="px-2">
                      <div className="bg-gray-300 animate-pulse w-[90%] h-5 rounded"></div>
                    </TableCell>
                    <TableCell className="px-2">
                      <div className="bg-gray-300 animate-pulse w-[40%] h-5 rounded"></div>
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
                  <div className="h-5 w-[70%] bg-gray-300 rounded"></div>
                </div>
                <div className="flex justify-between px-5 py-3">
                  <div className="h-5 w-[30%] bg-gray-300 rounded"></div>

                  <div className="h-5 w-[30%] bg-gray-300 rounded"></div>
                </div>

                <div className="flex gap-x-2 px-5 py-3">
                  <div className="h-5 w-[70%] bg-gray-300 rounded"></div>
                  <div className="h-5 w-[10%] bg-gray-300 rounded"></div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

const ConstructorStandings = () => {
  const navigate = useNavigate();
  const { year: urlYear } = useParams();
  const [year, setYear] = useState();
  const [userSelectedYear, setUserSelectedYear] = useState();
  const [displayYear, setDisplayYear] = useState();
  const [standings, setStandings] = useState([]);
  const [invalidYear, setInvalidYear] = useState(false);

  // Query function to fetch standings for each year
  const {
    data,
    refetch: fetchStandings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["constructorsStandings", year],
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
      } else {
        console.log("Invalid year specified");
      }
    } else {
      setYear(2024);
    }
  }, [urlYear]);

  // Fetch drivers
  useEffect(() => {
    fetchStandings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchStandings, year]);

  console.log(open);

  return (
    <>
      <div className="flex gap-x-5 p-5">
        <YearPicker
          setInvalidYear={setInvalidYear}
          setYear={setUserSelectedYear}
        />
        <button
          disabled={isLoading || invalidYear || !userSelectedYear}
          onClick={() => {
            navigate(`/constructors-standings/${userSelectedYear}`);
          }}
        >
          Fetch
        </button>
      </div>

      {isLoading && <p>Fetching standings...</p>}

      {/* Data unavailable */}
      {error && error?.response?.status == 404 && (
        <div className="h-[90vh] flex justify-center items-center">
          <ErrorDiv text="Constructor standings for the requested year is not available." />
        </div>
      )}

      {/* Server error */}
      {error && error?.response?.status != 404 && (
        <div className="h-[90vh] flex justify-center items-center">
          <ErrorDiv />
        </div>
      )}

      {/* Show driver name and country when driver data is present */}
      {!error && standings.length > 0 && (
        <>
          <p className="text-2xl font-semibold px-2">
            Constructors Standings for the {displayYear} season :
          </p>
          <div className="hidden md:flex justify-center py-10 overflow-x-auto">
            <table className="rounded-lg w-full lg:max-w-[95%] overflow-hidden bg-white shadow-lg">
              <TableHeader>
                <TableRow className="text-left bg-gray-100">
                  <TableHead className="py-6">Position</TableHead>
                  <TableHead>Constructor</TableHead>
                  <TableHead>Nationality</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Wins</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {standings?.map((item, i) => {
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
                        {item?.constructor?.name}
                      </TableCell>

                      <TableCell className="px-2">
                        <span
                          className={`mx-2 fi fi-${constructorCountryCode?.toLowerCase()}`}
                        ></span>
                        {item?.constructor?.nationality}
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
              return (
                <ConstructorStandingCard item={item} key={item.driverId} />
              );
            })}
          </div>
        </>
      )}

      {/* Show when standings have not been fetched */}
      {!error && standings.length == 0 && <LoadingTableCard />}
    </>
  );
};

export default ConstructorStandings;
