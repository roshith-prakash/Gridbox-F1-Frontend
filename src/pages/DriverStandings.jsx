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

// Register the locale for the countries constructor
countries.registerLocale(enLocale);

// To be displayed on Mobile screens
const DriverStandingCard = ({ item }) => {
  const driverCountry = nationalityMap[item?.driver?.nationality];
  const driverCountryCode = countries.getAlpha2Code(driverCountry, "en");

  const constructorCountry = nationalityMap[item?.constructor?.nationality];
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
      <p className="px-5 py-3 text-lg font-medium">
        Points : <span>{item?.points}</span>
      </p>
      <div className="flex px-5 py-3">
        <p className="flex-1">
          Code : {item?.driver?.code ? item?.driver?.code : "-"}
        </p>
        <p className="flex-1">
          Number :{" "}
          {item?.driver?.permanentNumber ? item?.driver?.permanentNumber : "-"}
        </p>
      </div>
      <p className="px-5 py-3">
        Constructor : {item?.constructor?.name}{" "}
        <span
          className={`mx-2 fi fi-${constructorCountryCode?.toLowerCase()}`}
        ></span>
      </p>
      <p className="px-5 py-3">
        Grand Prix Wins : <span>{item?.wins}</span>
      </p>
    </div>
  );
};

DriverStandingCard.propTypes = {
  item: PropTypes.shape({
    driver: PropTypes.object,
    constructor: PropTypes.object,
    position: PropTypes.number.isRequired,
    points: PropTypes.number,
    wins: PropTypes.number,
  }).isRequired,
};

const DriverStandings = () => {
  const [year, setYear] = useState(2024);
  const [displayYear, setDisplayYear] = useState(2024);
  const [standings, setStandings] = useState([]);

  // Query function to fetch standings for each year
  const {
    data,
    refetch: fetchStandings,
    isLoading,
  } = useQuery({
    queryKey: ["driversStandings", year],
    queryFn: () => {
      return axiosInstance.post("/getDriverStandings", {
        year: year,
      });
    },
    enabled: false,
    staleTime: Infinity,
  });

  // Set standings for the current year into the state
  useEffect(() => {
    if (data?.data?.standings) {
      setStandings(data?.data?.standings?.standings?.standings);
      setDisplayYear(data?.data?.standings?.year);
    }
  }, [data?.data]);

  useEffect(() => {
    fetchStandings();
  }, [fetchStandings]);

  console.log(data?.data);
  console.log(standings);

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
        <button disabled={isLoading} onClick={fetchStandings}>
          Fetch
        </button>
      </div>

      {isLoading && <p>Fetching standings...</p>}
      {/* Show driver name and country when driver data is present */}
      {standings.length > 0 && (
        <>
          <p className="text-2xl font-semibold px-2">
            Drivers Standings for the {displayYear} season :
          </p>
          <div className="hidden md:flex justify-center py-10 overflow-x-auto">
            <table className="rounded-lg w-full lg:max-w-[95%] overflow-hidden bg-white shadow-lg">
              <TableHeader>
                <TableRow className="text-left bg-gray-100">
                  <TableHead className="py-6">Position</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Constructor</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Wins</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {standings?.map((item, i) => {
                  const driverCountry =
                    nationalityMap[item?.driver?.nationality];
                  const driverCountryCode = countries.getAlpha2Code(
                    driverCountry,
                    "en"
                  );

                  const constructorCountry =
                    nationalityMap[item?.constructor?.nationality];
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
                        <span
                          className={`mx-2 fi fi-${driverCountryCode?.toLowerCase()}`}
                        ></span>
                        {item?.driver?.givenName} {item?.driver?.familyName}
                      </TableCell>

                      <TableCell className="px-2">
                        <span
                          className={`mx-2 fi fi-${constructorCountryCode?.toLowerCase()}`}
                        ></span>
                        {item?.constructor?.name}
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
              return <DriverStandingCard item={item} key={item.driverId} />;
            })}
          </div>
        </>
      )}
    </>
  );
};

export default DriverStandings;
