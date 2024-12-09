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
import { ErrorDiv, YearPicker } from "../components";
import CTAButton from "../components/CTAButton";
import { SyncLoader } from "react-spinners";

// To get country from nationality
import { nationalityMap } from "../data/nationalityToCountry";

// To show flags for the constructors
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import "flag-icons/css/flag-icons.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";

// Register the locale for the countries constructor
countries.registerLocale(enLocale);

// To be displayed on Mobile screens
const ConstructorCard = ({ constructor, index }) => {
  const country = nationalityMap[String(constructor?.nationality).trim()];
  const countryCode = countries.getAlpha2Code(country, "en");

  return (
    <div className="flex flex-col overflow-hidden divide-y-2 divide-gray-100 dark:divide-zinc-600 border-2 dark:border-zinc-600 w-full max-w-[95%] rounded-lg shadow-lg">
      {/* Sr. No + Constructor Name */}
      <p className="text-lg flex gap-x-2 px-5 font-medium py-3 bg-gray-100  dark:bg-zinc-800  dark:border-2">
        <span>{index + 1}.</span>
        {constructor?.name}
      </p>
      {/* Constructor Nationality */}
      <div className="px-5 py-3">
        <span>
          Nationality:{" "}
          <span className={`mx-2 fi fi-${countryCode?.toLowerCase()}`}></span>
          {constructor?.nationality}
        </span>
      </div>
      {/* Link to Wikipedia Page */}
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
  index: PropTypes.number,
};

// Loading Placeholder Table / Card
const LoadingTableCard = () => {
  return (
    <>
      <div className="hidden md:flex justify-center py-10 overflow-x-auto">
        {/* Loading Table on Large Screen */}
        <table className="rounded-lg w-full overflow-hidden bg-white dark:bg-secondarydarkbg shadow-lg">
          <TableHeader>
            <TableRow className="text-left bg-gray-100 dark:bg-zinc-800">
              <TableHead className="font-bold text-black  dark:text-darkmodetext py-6 pl-3 text-nowrap">
                Sr. no.
              </TableHead>
              <TableHead className="font-bold text-black dark:text-darkmodetext">
                Constructor
              </TableHead>
              <TableHead className="font-bold text-black dark:text-darkmodetext">
                Nationality
              </TableHead>
              <TableHead className="font-bold text-black dark:text-darkmodetext">
                Know More
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
                className="flex flex-col overflow-hidden divide-y-2 divide-gray-100 dark:divide-zinc-600 border-2 dark:border-zinc-600 w-full max-w-[95%] rounded-lg shadow-lg"
              >
                <p className="text-lg px-5 font-medium py-3 gap-x-2 bg-gray-100 dark:bg-zinc-800">
                  <div className="h-5 w-[70%] bg-gray-300 dark:bg-gray-500 animate-pulse rounded"></div>
                </p>
                <div className="px-5 py-3">
                  <div className="h-5 w-[70%] bg-gray-300 dark:bg-gray-500 animate-pulse rounded"></div>
                </div>
                <div className="flex justify-center gap-x-2 py-5 items-center text-blue-600">
                  <div className="h-5 w-[70%] bg-gray-300 dark:bg-gray-500 animate-pulse rounded"></div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

const Constructors = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const { year: urlYear } = useParams();
  const [year, setYear] = useState();
  const [userSelectedYear, setUserSelectedYear] = useState();
  const [displayYear, setDisplayYear] = useState();
  const [constructors, setConstructors] = useState([]);
  const [invalidYear, setInvalidYear] = useState(false);
  const [invalidURL, setInvalidURL] = useState(false);

  // Query function to fetch constructors for each year
  const {
    data,
    refetch: fetchConstructors,
    isLoading,
    error,
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

  // Scroll to Top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Set constructors for the current year into the state
  useEffect(() => {
    if (data?.data?.constructors) {
      setConstructors(data?.data?.constructors?.constructors?.constructors);
      setDisplayYear(data?.data?.constructors?.year);
    }
  }, [data?.data]);

  // Fetch Constructors
  useEffect(() => {
    if (year) {
      fetchConstructors();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchConstructors, year]);

  // Set window title.
  useEffect(() => {
    document.title = displayYear
      ? `Constructors ${displayYear} | GridBox F1`
      : `Constructors | GridBox F1`;
  }, [displayYear]);

  return (
    <main className="bg-greyBG dark:bg-darkbg flex justify-center py-10 rounded-lg">
      <section className="w-full max-w-[96%] rounded px-2 py-5 shadow bg-white  dark:bg-secondarydarkbg">
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
          {/* Change the URL to fetch data */}
          <CTAButton
            className="w-full md:w-fit py-2 px-6 border-2 rounded"
            disabled={isLoading || invalidYear || !userSelectedYear}
            onClick={() => {
              navigate(`/constructors/${userSelectedYear}`);
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
          Year must be between 1950 & 2024
        </div>

        {/* Title */}
        <h1 className="text-4xl py-5 border-t-4 border-r-4 border-black dark:border-darkmodetext rounded-xl font-semibold px-2">
          Constructors {displayYear}
        </h1>

        {/* Data unavailable */}
        {error && error?.response?.status == 404 && (
          <div className="py-20 flex justify-center items-center">
            <ErrorDiv text="Constructors data for the requested year is not available." />
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

        {/* Show constructor name and country when constructor data is present */}
        {constructors.length > 0 && (
          <>
            {/* Table to be displayed on larger screens */}
            <div className="hidden md:block pt-10 pb-5 overflow-x-auto">
              <table className="rounded-lg w-full overflow-hidden bg-white dark:bg-secondarydarkbg">
                <TableHeader>
                  <TableRow className="text-left  bg-gray-50 dark:bg-zinc-800 dark:border-b-2  dark:border-zinc-600">
                    <TableHead className="font-bold text-black dark:text-darkmodetext  py-6 pl-3 text-nowrap">
                      Sr. no.
                    </TableHead>
                    <TableHead className="font-bold text-black dark:text-darkmodetext">
                      Constructor
                    </TableHead>
                    <TableHead className="font-bold text-black dark:text-darkmodetext">
                      Nationality
                    </TableHead>
                    <TableHead className="font-bold text-black dark:text-darkmodetext">
                      Know More
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {constructors?.map((constructor, i) => {
                    const country =
                      nationalityMap[String(constructor?.nationality).trim()];
                    const countryCode = countries.getAlpha2Code(country, "en");

                    return (
                      <TableRow
                        className="text-left border-b-2 border-gray-100  dark:border-zinc-600"
                        key={constructor.constructorId}
                      >
                        {/* Sr no */}
                        <TableCell className="font-medium py-3 px-3 md:w-[5em]">
                          {i + 1}.
                        </TableCell>
                        {/* Constructor */}
                        <TableCell>{constructor?.name}</TableCell>
                        {/* Nationality */}
                        <TableCell className="gap-x-2 text-nowrap">
                          <span
                            className={`mx-2 fi fi-${countryCode?.toLowerCase()}`}
                          ></span>
                          <span>{constructor?.nationality}</span>
                        </TableCell>
                        {/* Wikipedia link */}
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
            {/* Cards to be displayed on smaller screens */}
            <div className="md:hidden flex flex-col items-center gap-y-5 py-10">
              {constructors?.map((constructor, i) => {
                return (
                  <ConstructorCard
                    constructor={constructor}
                    index={i}
                    key={constructor.constructorId}
                  />
                );
              })}
            </div>
          </>
        )}

        {/* Show placeholder table when constructors are not present */}
        {!invalidURL && !error && constructors.length == 0 && (
          <LoadingTableCard />
        )}
      </section>
    </main>
  );
};

export default Constructors;
