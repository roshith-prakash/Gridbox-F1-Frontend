import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axios";
import { nationalityMap } from "../data/nationalityToCountry";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import "flag-icons/css/flag-icons.min.css";

// Register the locale for the countries constructor
countries.registerLocale(enLocale);

const Home = () => {
  const [year, setYear] = useState();
  const [drivers, setDrivers] = useState([]);

  // Query function to fetch drivers for each year
  const { data, refetch: fetchDrivers } = useQuery({
    queryKey: ["drivers", year],
    queryFn: () => {
      return axiosInstance.post("/getDrivers", {
        year: year,
      });
    },
    enabled: false,
  });

  // Set drivers for the current year into the state
  useEffect(() => {
    if (data?.data) {
      setDrivers(data?.data?.drivers?.drivers?.drivers);
    }
  }, [data?.data]);

  return (
    <>
      <div className="flex gap-x-5 p-5">
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border-2 rounded"
        ></input>
        <button onClick={fetchDrivers}>Fetch</button>
      </div>

      {/* Show driver name and country when driver data is present */}
      {data && (
        <div>
          {drivers?.map((driver) => {
            const country = nationalityMap[driver?.nationality];
            console.log(country);
            const countryCode = countries.getAlpha2Code(country, "en");
            console.log(countryCode);

            return (
              <p key={driver?.driverId}>
                {" "}
                <span
                  className={`mx-2 fi fi-${countryCode.toLowerCase()}`}
                ></span>
                {driver?.givenName} {driver?.familyName}
              </p>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Home;
