import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/utils/axios";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaLink } from "react-icons/fa6";
import * as PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorDiv, YearPicker, CTAButton } from "@/components";
import { SyncLoader } from "react-spinners";
import { useDarkMode } from "@/context/DarkModeContext";
import { isAxiosError } from "axios";

// To show flags for the circuits
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import "flag-icons/css/flag-icons.min.css";

// Register the locale for the countries constructor
countries.registerLocale(enLocale);

// To be displayed on Mobile screens
const CircuitCard = ({ circuit, index }) => {
  const [loading, setLoading] = useState(true);
  const countryCode = countries.getAlpha2Code(circuit?.Location?.country, "en");

  return (
    <div className="flex flex-col overflow-hidden divide-y-2 divide-gray-100 dark:divide-zinc-600 border-2 w-full max-w-[95%] rounded-lg shadow-lg">
      {/* Display sr.no and Circuit Name */}
      <p className="text-lg px-5 font-medium py-3 flex items-center gap-x-2 bg-gray-100 dark:bg-zinc-800">
        <span>{index + 1}.</span> {circuit?.circuitName}
      </p>
      {/* Location of Circuit */}
      <div className="flex px-5 py-3">
        Location :{" "}
        {circuit?.Location?.locality ? circuit?.Location?.locality : "-"},{" "}
        {circuit?.Location?.country ? circuit?.Location?.country : "-"}
        <span className={`mx-2 fi fi-${countryCode?.toLowerCase()}`}></span>
      </div>
      {/* Map Container */}
      <div className={`px-5 py-3 flex justify-center `}>
        <div
          className={`h-80 w-full rounded ${
            loading && "bg-gray-300 dark:bg-gray-500 animate-pulse"
          }`}
        >
          {/* Map element - uses Google Maps */}
          <iframe
            onLoad={() => setLoading(false)}
            className="w-full h-full"
            src={`https://maps.google.com/maps?q=${circuit?.Location?.lat},${circuit?.Location?.long}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
          />
        </div>
      </div>
      {/* Link to Wikipedia Page */}
      <a
        href={circuit?.url}
        target="_blank"
        className="flex justify-center gap-x-2 py-5 items-center text-blue-600"
      >
        Read More <FaLink />
      </a>
    </div>
  );
};

CircuitCard.propTypes = {
  circuit: PropTypes.shape({
    circuitName: PropTypes.string.isRequired,
    Location: PropTypes.object.isRequired,
    url: PropTypes.string,
  }).isRequired,
  index: PropTypes.number,
};

const CircuitRow = ({ circuit, i }) => {
  const [loading, setLoading] = useState(true);

  const countryCode = countries.getAlpha2Code(circuit?.Location?.country, "en");

  return (
    <TableRow
      className="text-left border-b-2 border-gray-100 dark:border-zinc-600"
      key={circuit.circuitId}
    >
      {/* Sr. No  */}
      <TableCell className="font-medium text-center py-3 px-3 md:w-[5em]">
        {i + 1}.
      </TableCell>
      {/* Circuit Name */}
      <TableCell className="px-2">{circuit?.circuitName}</TableCell>
      {/* Location of Circuit */}
      <TableCell className="gap-x-2 px-2 text-nowrap">
        <span className={`mx-2 fi fi-${countryCode?.toLowerCase()}`}></span>
        <span>{circuit?.Location?.country}</span>
      </TableCell>
      {/* Locality */}
      <TableCell>{circuit?.Location?.locality}</TableCell>
      {/* Map Container */}
      <TableCell className="py-2 text-nowrap">
        <div className={`h-52 ${loading && "bg-gray-200 animate-pulse"}`}>
          <iframe
            onLoad={() => setLoading(false)}
            className="h-full"
            src={`https://maps.google.com/maps?q=${circuit?.Location?.lat},${circuit?.Location?.long}&t=&z=15&ie=UTF8&iwloc=&output=embed&z=14`}
          />
        </div>
      </TableCell>
      {/* Link to wikipedia page */}
      <TableCell className="px-2">
        <a
          href={circuit?.url}
          target="_blank"
          className="text-blue-600 flex items-center pl gap-x-2 w-fit"
        >
          <FaLink />
          <span className="hidden lg:block">{circuit?.url}</span>
        </a>
      </TableCell>
    </TableRow>
  );
};

CircuitRow.propTypes = {
  circuit: PropTypes.shape({
    circuitId: PropTypes.string,
    circuitName: PropTypes.string.isRequired,
    Location: PropTypes.object.isRequired,
    url: PropTypes.string,
  }).isRequired,
  i: PropTypes.number,
};

// Loading Placeholder Table / Card
const LoadingTableCard = () => {
  return (
    <>
      <div className="hidden lg:block py-10 overflow-x-auto">
        <table className="rounded-lg w-full overflow-hidden bg-white dark:bg-secondarydarkbg">
          <TableHeader>
            <TableRow className="text-left bg-gray-50 dark:bg-zinc-800">
              <TableHead className="font-bold text-black dark:text-darkmodetext py-6 pl-3 text-nowrap">
                Sr. no.
              </TableHead>
              <TableHead className="font-bold text-black dark:text-darkmodetext">
                Circuit Name
              </TableHead>
              <TableHead className="font-bold text-black dark:text-darkmodetext">
                Country
              </TableHead>
              <TableHead className="font-bold text-black dark:text-darkmodetext">
                Locality
              </TableHead>
              <TableHead className="font-bold text-black dark:text-darkmodetext text-center">
                Map
              </TableHead>
              <TableHead className="font-bold text-black dark:text-darkmodetext text-center">
                Know More
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array(10)
              .fill(null)
              ?.map((driver, i) => {
                return (
                  <TableRow
                    className="text-left border-b-2 border-gray-100 dark:border-zinc-600"
                    key={i}
                  >
                    <TableCell className="font-medium py-3 px-3 md:w-[5em]">
                      <div className="bg-gray-300 animate-pulse w-10 h-5 rounded"></div>
                    </TableCell>
                    <TableCell className="px-2 w-36">
                      <div className="bg-gray-300 animate-pulse h-5 rounded"></div>
                    </TableCell>
                    <TableCell className="px-2 w-36">
                      <div className="bg-gray-300 animate-pulse h-5 rounded"></div>
                    </TableCell>
                    <TableCell className="px-2 w-36">
                      <div className="bg-gray-300 animate-pulse h-5 rounded"></div>
                    </TableCell>
                    <TableCell className="gap-x-2 px-2 py-2 text-nowrap">
                      <div className="bg-gray-300 animate-pulse w-full min-w-20 h-52 rounded"></div>
                    </TableCell>
                    <TableCell className="px-2 text-nowrap">
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
                className="flex flex-col divide-y-2 divide-gray-100 dark:divide-zinc-600 border-2 w-full max-w-[95%] rounded-lg shadow-lg"
              >
                <div className="text-lg px-5 font-medium py-3 gap-x-2 bg-gray-100 dark:bg-zinc-800">
                  <div className="h-5 w-[70%] bg-gray-300 dark:bg-gray-500 animate-pulse rounded"></div>
                </div>
                <div className="flex px-5 gap-x-2 py-3">
                  <div className="h-5 w-[70%] bg-gray-300 dark:bg-gray-500 animate-pulse rounded"></div>
                  <div className="h-5 w-[10%] bg-gray-300 dark:bg-gray-500 animate-pulse rounded"></div>
                </div>
                <div className="px-5 py-3 flex justify-center">
                  <div className="h-80 w-full bg-gray-300 dark:bg-gray-500 animate-pulse rounded" />
                </div>
                <div className="flex justify-center gap-x-2 py-5 items-center">
                  <div className="h-5 w-[30%] bg-gray-300 dark:bg-gray-500 animate-pulse rounded"></div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

const Circuits = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const { year: urlYear } = useParams();
  const [year, setYear] = useState<undefined | number>();
  const [userSelectedYear, setUserSelectedYear] = useState<
    undefined | number
  >();
  const [displayYear, setDisplayYear] = useState<undefined | number>();
  const [circuits, setCircuits] = useState([]);
  const [invalidYear, setInvalidYear] = useState();
  const [invalidURL, setInvalidURL] = useState(false);

  // Query function to fetch circuits for each year
  const {
    data,
    refetch: fetchCircuits,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["circuits", year],
    queryFn: () => {
      return axiosInstance.post("/getCircuits", {
        year: year,
      });
    },
    enabled: false,
    staleTime: Infinity,
  });

  // Scroll to Top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Set circuits for the current year into the state
  useEffect(() => {
    if (data?.data?.circuits) {
      setCircuits(data?.data?.circuits?.circuits?.circuits);
      setDisplayYear(data?.data?.circuits?.year);
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

  // Fetch Circuits
  useEffect(() => {
    if (year) {
      fetchCircuits();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchCircuits, year]);

  // Set window title.
  useEffect(() => {
    document.title = displayYear
      ? `Circuits ${displayYear} | GridBox F1`
      : `Circuits | GridBox F1`;
  }, [displayYear]);

  return (
    <main className="bg-greyBG dark:bg-darkbg flex justify-center py-10 rounded-lg">
      <section className="w-full max-w-[96%] rounded px-2 py-5 shadow bg-white dark:bg-secondarydarkbg">
        {/* Input section */}
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
          {/* Change the URL to fetch data */}
          <CTAButton
            className="w-full md:w-fit py-2 px-6 border-2 rounded"
            disabled={isLoading || invalidYear || !userSelectedYear}
            onClick={() => {
              navigate(`/circuits/${userSelectedYear}`);
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
          className={`text-red-600 dark:text-red-500 font-medium px-5 overflow-hidden  ${
            invalidYear ? "h-14" : "h-0"
          } transition-all`}
        >
          Year must be between 1950 & {new Date().getFullYear()}.
        </div>

        {/* Title */}
        <h1 className="text-4xl py-5 border-t-4 border-r-4 border-black dark:border-darkmodetext rounded-xl font-semibold px-2">
          Circuits {displayYear}
        </h1>

        {/* Data unavailable */}
        {error && isAxiosError(error) && error?.response?.status == 404 && (
          <div className="py-20 flex justify-center items-center">
            <ErrorDiv text="Circuits data for the requested year is not available." />
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
        {!error && circuits.length > 0 && (
          <>
            {/* Table to be displayed on Large Screens */}
            <div className="hidden lg:block py-10 overflow-x-auto">
              <table className="rounded-lg w-full overflow-hidden bg-white dark:bg-secondarydarkbg">
                <TableHeader>
                  <TableRow className="text-left bg-gray-50 dark:bg-zinc-800">
                    <TableHead className="font-bold text-black dark:text-darkmodetext py-6 pl-3 text-nowrap">
                      Sr. no.
                    </TableHead>
                    <TableHead className="font-bold text-black dark:text-darkmodetext">
                      Circuit Name
                    </TableHead>
                    <TableHead className="font-bold text-black dark:text-darkmodetext">
                      Country
                    </TableHead>
                    <TableHead className="font-bold text-black dark:text-darkmodetext">
                      Locality
                    </TableHead>
                    <TableHead className="font-bold text-black dark:text-darkmodetext text-center">
                      Map
                    </TableHead>
                    <TableHead className="font-bold text-black dark:text-darkmodetext text-center">
                      Know More
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {circuits?.map((circuit, i) => {
                    return (
                      <CircuitRow
                        circuit={circuit}
                        i={i}
                        key={circuit?.circuitId}
                      />
                    );
                  })}
                </TableBody>
              </table>
            </div>
            {/* Cards to be displayed on smaller screens */}
            <div className="lg:hidden flex flex-col items-center gap-y-5 py-10">
              {circuits?.map((circuit, i) => {
                return (
                  <CircuitCard
                    circuit={circuit}
                    index={i}
                    key={circuit.circuitId}
                  />
                );
              })}
            </div>
          </>
        )}

        {/*When circuits is empty  */}
        {!invalidURL && !error && circuits.length == 0 && <LoadingTableCard />}
      </section>
    </main>
  );
};

export default Circuits;
