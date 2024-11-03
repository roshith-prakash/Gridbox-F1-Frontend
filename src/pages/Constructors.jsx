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
import { FaLink } from "react-icons/fa6";
import PropTypes from "prop-types";

// To get country from nationality
import { nationalityMap } from "../data/nationalityToCountry";

// To show flags for the constructors
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import "flag-icons/css/flag-icons.min.css";

// Register the locale for the countries constructor
countries.registerLocale(enLocale);

// To be displayed on Mobile screens
const ConstructorCard = ({ constructor }) => {
  const country = nationalityMap[constructor?.nationality];
  const countryCode = countries.getAlpha2Code(country, "en");

  return (
    <div className="flex flex-col divide-y-2 divide-gray-100 border-2 w-full max-w-[95%] rounded-lg shadow-lg">
      <p className="text-lg px-5 font-medium py-3 gap-x-2 bg-gray-100">
        {constructor?.name}
      </p>
      <div className="px-5 py-3">
        <span>
          Nationality:{" "}
          <span className={`mx-2 fi fi-${countryCode?.toLowerCase()}`}></span>
          {constructor?.nationality}
        </span>
      </div>
      <a
        href={constructor?.url}
        target="_blank"
        className="flex justify-center gap-x-2 py-5 items-center text-blue-600"
      >
        Read More <FaLink />
      </a>
    </div>
  );
};

ConstructorCard.propTypes = {
  constructor: PropTypes.shape({
    name: PropTypes.string.isRequired,
    nationality: PropTypes.string.isRequired,
    url: PropTypes.string,
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
              <TableHead className="py-6">Sr. no.</TableHead>
              <TableHead>Constructor</TableHead>
              <TableHead>Nationality</TableHead>
              <TableHead>Know More</TableHead>
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
                <p className="text-lg px-5 font-medium py-3 gap-x-2 bg-gray-100">
                  <div className="h-5 w-[70%] bg-gray-300 rounded"></div>
                </p>
                <div className="px-5 py-3">
                  <div className="h-5 w-[70%] bg-gray-300 rounded"></div>
                </div>
                <div className="flex justify-center gap-x-2 py-5 items-center text-blue-600">
                  <div className="h-5 w-[70%] bg-gray-300 rounded"></div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

const Constructors = () => {
  const [year, setYear] = useState(2024);
  const [displayYear, setDisplayYear] = useState();
  const [constructors, setConstructors] = useState([]);

  // Query function to fetch constructors for each year
  const {
    data,
    refetch: fetchConstructors,
    isLoading,
  } = useQuery({
    queryKey: ["constructors", year],
    queryFn: () => {
      return axiosInstance.post("/getConstructors", {
        year: year,
      });
    },
    enabled: false,
    staleTime: Infinity,
  });

  // Set constructors for the current year into the state
  useEffect(() => {
    if (data?.data?.constructors) {
      setConstructors(data?.data?.constructors?.constructors?.constructors);
      setDisplayYear(data?.data?.constructors?.year);
    }
  }, [data?.data]);

  // Fetch constructors for 2024
  useEffect(() => {
    fetchConstructors();
  }, [fetchConstructors]);

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
        <button disabled={isLoading} onClick={fetchConstructors}>
          Fetch
        </button>
      </div>

      {isLoading && <p>Fetching constructors...</p>}

      {/* Show constructor name and country when constructor data is present */}
      {constructors.length > 0 && (
        <>
          <p className="text-2xl font-semibold px-2">
            Constructors in {displayYear}
          </p>
          <div className="hidden md:flex justify-center py-10 overflow-x-auto">
            <table className="rounded-lg w-full lg:max-w-[95%] overflow-hidden bg-white shadow-lg">
              <TableHeader>
                <TableRow className="text-left bg-gray-100">
                  <TableHead className="py-6">Sr. no.</TableHead>
                  <TableHead>Constructor</TableHead>
                  <TableHead>Nationality</TableHead>
                  <TableHead>Know More</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {constructors?.map((constructor, i) => {
                  const country = nationalityMap[constructor?.nationality];
                  const countryCode = countries.getAlpha2Code(country, "en");

                  return (
                    <TableRow
                      className="text-left border-b-2 border-gray-100"
                      key={constructor.constructorId}
                    >
                      <TableCell className="font-medium py-3 px-3 md:w-[5em]">
                        {i + 1}.
                      </TableCell>
                      <TableCell>{constructor?.name}</TableCell>
                      <TableCell className="gap-x-2">
                        <span
                          className={`mx-2 fi fi-${countryCode?.toLowerCase()}`}
                        ></span>
                        <span>{constructor?.nationality}</span>
                      </TableCell>
                      <TableCell className="px-5 md:pl-5 lg:pl-10">
                        <a
                          href={constructor?.url}
                          target="_blank"
                          className="flex items-center gap-x-2 text-blue-600"
                        >
                          <FaLink className="" /> {constructor?.url}
                        </a>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </table>
          </div>
          <div className="md:hidden flex flex-col items-center gap-y-5 py-10">
            {constructors?.map((constructor) => {
              return (
                <ConstructorCard
                  constructor={constructor}
                  key={constructor.constructorId}
                />
              );
            })}
          </div>
        </>
      )}

      {/* Show placeholder table when constructors are not present */}
      {constructors.length == 0 && <LoadingTableCard />}
    </>
  );
};

export default Constructors;
