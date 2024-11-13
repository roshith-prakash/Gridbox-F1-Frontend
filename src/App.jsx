import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RotateLoader } from "react-spinners";
import { axiosInstance } from "./utils/axios";
import { useQuery } from "@tanstack/react-query";
import { GiCarWheel } from "react-icons/gi";
import {
  Circuits,
  Constructors,
  ConstructorStandings,
  Drivers,
  DriverStandings,
  Home,
  QualiResult,
  RaceResult,
  Schedule,
  Post,
  CreatePost,
  AllPosts,
  NotFound,
  SprintResult,
} from "./pages";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import { useEffect, useState } from "react";
import { Footer, Navbar, SecurityHeaders } from "./components";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [open, setOpen] = useState(true);

  // Check if server is active
  const { isLoading, error } = useQuery({
    queryKey: ["check"],
    queryFn: () => {
      return axiosInstance.get("/");
    },
    refetchInterval: 1000 * 60,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: 5,
  });

  // To initialize AOS animations
  useEffect(() => {
    AOS.init({
      easing: "ease-in-sine",
      delay: 100,
    });
  }, []);

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
        <>
          {/* Data Availability Dialog box */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-[90%] w-80 md:w-96">
              <DialogHeader>
                <DialogTitle>
                  GridBox F1: Data Availability Limitation
                </DialogTitle>
                <DialogDescription className="py-3">
                  GridBox F1 relies on data from the Ergast Database, which will
                  only be available up to the 2024 season. All site data will
                  reflect information from the 2024 season and earlier.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              {/* Navbar */}
              <Navbar />

              {/* Actual Pages */}
              <Routes>
                {/* Home page */}
                <Route path="/" element={<Home />} />

                {/* Drivers who drove in a particular year */}
                <Route path="/drivers" element={<Drivers />} />
                <Route path="/drivers/:year" element={<Drivers />} />

                {/* Constructors who raced in a particular year */}
                <Route path="/constructors" element={<Constructors />} />
                <Route path="/constructors/:year" element={<Constructors />} />

                {/* World Drivers standings for a particular year*/}
                <Route
                  path="/drivers-standings"
                  element={<DriverStandings />}
                />
                <Route
                  path="/drivers-standings/:year"
                  element={<DriverStandings />}
                />

                {/* World Constructors standings for a particular year*/}
                <Route
                  path="/constructors-standings"
                  element={<ConstructorStandings />}
                />
                <Route
                  path="/constructors-standings/:year"
                  element={<ConstructorStandings />}
                />

                {/* The Season Schedule  */}
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/schedule/:year" element={<Schedule />} />

                {/* The Circuits used in a specific year */}
                <Route path="/circuits" element={<Circuits />} />
                <Route path="/circuits/:year" element={<Circuits />} />

                {/* Result for a specific race */}
                <Route
                  path="/race-result/:year/:round"
                  element={<RaceResult />}
                />

                {/* Result for a specific Qualifying session */}
                <Route
                  path="/qualifying-result/:year/:round"
                  element={<QualiResult />}
                />

                {/* Result for a specific sprint race */}
                <Route
                  path="/sprint-result/:year/:round"
                  element={<SprintResult />}
                />

                {/* View All articles */}
                <Route path="/the-paddock-report" element={<AllPosts />} />

                {/* View specific post */}
                <Route path="/the-paddock-report/:postId" element={<Post />} />

                {/* Create an article - locked for admin */}
                <Route path="/create-article" element={<CreatePost />} />

                {/* View All articles */}
                <Route path="*" element={<NotFound />} />
              </Routes>

              {/* Footer */}
              <section className="flex-1 bg-greyBG pt-20">
                <Footer />
              </section>
            </div>
          </BrowserRouter>
        </>
      )}
    </>
  );
}

export default App;
