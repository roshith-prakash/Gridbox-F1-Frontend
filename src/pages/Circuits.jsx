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

// To show flags for the circuits
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import "flag-icons/css/flag-icons.min.css";
import { useParams } from "react-router-dom";
import { ErrorDiv, YearPicker } from "../components";

// Register the locale for the countries constructor
countries.registerLocale(enLocale);

// To be displayed on Mobile screens
const CircuitCard = ({ circuit }) => {
  const [loading, setLoading] = useState(true);
  const countryCode = countries.getAlpha2Code(circuit?.location?.country, "en");

  return (
    <div className="flex flex-col divide-y-2 divide-gray-100 border-2 w-full max-w-[95%] rounded-lg shadow-lg">
      <p className="text-lg px-5 font-medium py-3 gap-x-2 bg-gray-100">
        {circuit?.circuitName}
      </p>
      <div className="flex px-5 py-3">
        Location :{" "}
        {circuit?.location?.locality ? circuit?.location?.locality : "-"},{" "}
        {circuit?.location?.country ? circuit?.location?.country : "-"}
        <span className={`mx-2 fi fi-${countryCode?.toLowerCase()}`}></span>
      </div>
      <div className={`px-5 py-3 flex justify-center `}>
        <div
          className={`h-80 w-full rounded ${
            loading && "bg-gray-200 animate-pulse"
          }`}
        >
          <iframe
            onLoad={() => setLoading(false)}
            className="w-full h-full"
            src={`https://maps.google.com/maps?q=${circuit?.location?.lat},${circuit?.location?.long}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
          />
        </div>
      </div>
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
    location: PropTypes.object.isRequired,
    url: PropTypes.string,
  }).isRequired,
};

const CircuitRow = ({ circuit, i }) => {
  const [loading, setLoading] = useState(true);

  const countryCode = countries.getAlpha2Code(circuit?.location?.country, "en");

  return (
    <TableRow
      className="text-left border-b-2 border-gray-100"
      key={circuit.circuitId}
    >
      <TableCell className="font-medium text-center py-3 px-3 md:w-[5em]">
        {i + 1}.
      </TableCell>
      <TableCell className="px-2">{circuit?.circuitName}</TableCell>
      <TableCell className="gap-x-2 px-2 text-nowrap">
        <span className={`mx-2 fi fi-${countryCode?.toLowerCase()}`}></span>
        <span>{circuit?.location?.country}</span>
      </TableCell>
      <TableCell>{circuit?.location?.locality}</TableCell>
      <TableCell className="py-2 text-nowrap">
        <div className={`h-52 ${loading && "bg-gray-200 animate-pulse"}`}>
          <iframe
            onLoad={() => setLoading(false)}
            className="h-full"
            src={`https://maps.google.com/maps?q=${circuit?.location?.lat},${circuit?.location?.long}&t=&z=15&ie=UTF8&iwloc=&output=embed&z=14`}
          />
        </div>
      </TableCell>
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
    location: PropTypes.object.isRequired,
    url: PropTypes.string,
  }).isRequired,
  i: PropTypes.number,
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
              <TableHead>Circuit Name</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Locality</TableHead>
              <TableHead className="text-center">Map</TableHead>
              <TableHead className="text-center">Know More</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array(10)
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
                className="flex flex-col divide-y-2 divide-gray-100 border-2 w-full max-w-[95%] rounded-lg shadow-lg"
              >
                <div className="text-lg px-5 font-medium py-3 gap-x-2 bg-gray-100">
                  <div className="h-5 w-[70%] bg-gray-300 rounded"></div>
                </div>
                <div className="flex px-5 gap-x-2 py-3">
                  <div className="h-5 w-[70%] bg-gray-300 rounded"></div>
                  <div className="h-5 w-[10%] bg-gray-300 rounded"></div>
                </div>
                <div className="px-5 py-3 flex justify-center">
                  <div className="h-80 w-full bg-gray-300 rounded" />
                </div>
                <div className="flex justify-center gap-x-2 py-5 items-center">
                  <div className="h-5 w-[30%] bg-gray-300 rounded"></div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

const Circuits = () => {
  const { year: urlYear } = useParams();
  const [year, setYear] = useState();
  const [displayYear, setDisplayYear] = useState();
  const [circuits, setCircuits] = useState([]);
  const [open, setOpen] = useState();

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

  useEffect(() => {
    fetchCircuits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchCircuits, !!year]);

  console.log(open);

  return (
    <>
      <div className="flex gap-x-5 p-5">
        <YearPicker setOpen={setOpen} setYear={setYear} />
        <button disabled={isLoading} onClick={fetchCircuits}>
          Fetch
        </button>
      </div>

      {isLoading && <p>Fetching circuits...</p>}

      {/* Data unavailable */}
      {error && error?.response?.status == 404 && (
        <div className="h-[90vh] flex justify-center items-center">
          <ErrorDiv text="Constructor data for the requested year is not available." />
        </div>
      )}

      {/* Server error */}
      {error && error?.response?.status != 404 && (
        <div className="h-[90vh] flex justify-center items-center">
          <ErrorDiv />
        </div>
      )}

      {/* Show driver name and country when driver data is present */}
      {!error && circuits.length > 0 && (
        <>
          <p className="text-2xl font-semibold px-2">
            Circuits in the {displayYear} season
          </p>
          <div className="hidden md:flex justify-center py-10 overflow-x-auto">
            <table className="rounded-lg w-full lg:max-w-[95%] overflow-hidden bg-white shadow-lg">
              <TableHeader>
                <TableRow className="text-left bg-gray-100">
                  <TableHead className="py-6">Sr. no.</TableHead>
                  <TableHead>Circuit Name</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Locality</TableHead>
                  <TableHead className="text-center">Map</TableHead>
                  <TableHead className="text-center">Know More</TableHead>
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
          <div className="md:hidden flex flex-col items-center gap-y-5 py-10">
            {circuits?.map((circuit) => {
              return <CircuitCard circuit={circuit} key={circuit.circuitId} />;
            })}
          </div>
        </>
      )}

      {/*When circuits is empty  */}
      {!error && circuits.length == 0 && <LoadingTableCard />}
    </>
  );
};

export default Circuits;
