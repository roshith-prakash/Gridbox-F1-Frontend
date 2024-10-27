import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RotateLoader } from "react-spinners";
import { axiosInstance } from "./utils/axios";
import { useQuery } from "@tanstack/react-query";
import { GiCarWheel } from "react-icons/gi";
import SecurityHeaders from "./components/SecurityHeaders";
import { Drivers } from "./pages";

function App() {
  // Check if server is active
  const { isLoading, error } = useQuery({
    queryKey: ["check"],
    queryFn: () => {
      return axiosInstance.get("/");
    },
    refetchInterval: 10000,
    retry: 5,
  });

  return (
    <>
      <SecurityHeaders />

      {/* If server isn't ready for use, show a loading indicator */}
      {isLoading && (
        <main className="h-screen w-full flex flex-col gap-y-5 justify-center items-center">
          <p className="text-2xl md:text-4xl flex items-center gap-x-2 font-bold italic">
            <GiCarWheel className="animate-spin text-3xl md:text-5xl" />{" "}
            Starting the Engine
            <GiCarWheel className="animate-spin text-3xl md:text-5xl" />
          </p>
          <img
            alt="Man giving a presentation"
            src="https://res.cloudinary.com/do8rpl9l4/image/upload/v1729931902/logo_ahpe4j.png"
            className="w-60 md:w-72 pointer-events-none"
          />
          {/* Three dots loading indicator */}
          <RotateLoader
            color={"#000000"}
            loading={isLoading}
            size={25}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </main>
      )}

      {/* Show error text if we could not connect to server */}
      {error && (
        <main className="h-screen w-full flex flex-col gap-y-10 justify-center items-center">
          {/* Error text */}
          <p className="text-red-600 text-xl md:text-2xl text-center">
            Cannot connect to server. Please try later.
          </p>
        </main>
      )}

      {/* Server is ready to be used */}
      {!isLoading && !error && (
        <BrowserRouter>
          <Routes>
            {/* Home page */}
            <Route path="/" element={<Drivers />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
