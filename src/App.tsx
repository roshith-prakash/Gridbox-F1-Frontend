import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { useEffect } from "react";
import { Footer, Navbar, SecurityHeaders } from "./components";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init({
      easing: "ease-in-sine",
      delay: 100,
    });
  }, []);

  return (
    <>
      <SecurityHeaders />

      {/* Server is ready to be used */}
      {
        // !isLoading && !error &&
        <>
          <BrowserRouter>
            <div className="min-h-screen font-f1 flex flex-col">
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
              <section className=" bg-greyBG dark:bg-darkbg flex-1 pt-20">
                <Footer />
              </section>
            </div>
          </BrowserRouter>
        </>
      }
    </>
  );
}

export default App;
