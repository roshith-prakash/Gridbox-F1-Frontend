import { useEffect } from "react";
import { SiF1 } from "react-icons/si";
import { TyreModel } from "../components";

const Home = () => {
  // Scroll to Top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="bg-greyBG pb-10">
      {/* Hero Section */}
      <div className="bg-hero flex bg-cover min-h-[80vh]">
        {/* Black filter above BG */}
        <div className="flex-1 w-full flex flex-wrap bg-black bg-opacity-75">
          {/* Flex */}
          <div className="px-5 flex-1 text-white flex justify-center items-center font-medium">
            {/* Content Section */}
            <section className="flex flex-col gap-y-8">
              <h1 className="text-3xl">
                <span className="flex text-4xl gap-x-2 items-center">
                  GridBox <SiF1 className="text-7xl translate-y-1.5" />
                </span>{" "}
                Your one shot stop for everything F1 !
              </h1>
              <p className="text-lg italic leading-7 drop-shadow-lg">
                Explore the world of Formula 1 like never before with GridBox
                F1! Instantly access detailed data on every driver and
                constructor that&apos;s raced in any season, view year-by-year
                standings, and dive into race and qualifying results. With
                comprehensive circuit profiles and the latest news in the
                paddock, GridBox F1 is your go-to platform for all things F1,
                whether you&apos;re tracking past champions or viewing the
                latest race outcomes.
              </p>
            </section>
          </div>
          {/* 3D Model of Pirelli Tyres */}
          <div className="hidden lg:block flex-1 relative max-w-[50%]">
            <TyreModel />
            <div className="absolute left-0 top-0 h-full w-full p-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
