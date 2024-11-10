import { useEffect } from "react";
import { SiF1 } from "react-icons/si";
import { CTAButton, TyreModel } from "../components";
import { Link } from "react-router-dom";

const Home = () => {
  // Scroll to Top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="bg-greyBG pb-10">
      {/* Hero Section */}
      <div className="bg-hero flex flex-wrap bg-cover min-h-[85vh]">
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
          <div className="hidden xl:block flex-1 relative max-w-[50%]">
            <TyreModel />
            <div className="absolute left-0 top-0 h-full w-full p-1"></div>
          </div>
        </div>
      </div>

      {/* Drivers Section */}
      <div
        data-aos="fade-up"
        className="py-20 flex flex-wrap-reverse gap-y-10 min-h-[70vh]"
      >
        <section className="w-full md:flex-1 flex flex-col justify-center gap-y-12 px-10">
          <p className="text-5xl font-mono font-medium">
            Champions & Contenders
          </p>
          <p className="text-xl italic leading-7 drop-shadow-lg">
            Discover the drivers who defined each Formula 1 season on the
            GridBox F1 Drivers page! Select a year to view every competitor,
            from seasoned champions to promising newcomers. Relive the history
            and legacy of F1 through the drivers who brought each race to life!
          </p>
          <Link to="/drivers">
            <CTAButton text="View Drivers" />
          </Link>
        </section>
        <div className="w-full md:flex-1 flex justify-center items-center">
          <img src="https://res.cloudinary.com/do8rpl9l4/image/upload/v1731256673/charles_transparent_upecsy.png" />
        </div>
      </div>

      {/* Constructors Section */}
      <div
        data-aos="fade-up"
        className="py-20 flex flex-wrap gap-y-10 bg-hovercta/5 min-h-[70vh]"
      >
        <div className="w-full md:flex-1 flex justify-center items-center">
          <img
            src="https://res.cloudinary.com/do8rpl9l4/image/upload/v1731258487/file_vdgcy9.png"
            className="[transform:rotateY(180deg)]"
          />
        </div>
        <section className="w-full md:flex-1 flex flex-col justify-center gap-y-12 px-10">
          <p className="text-5xl font-medium md:text-right font-mono ">
            The Power Behind the Cars
          </p>
          <p className="text-xl italic leading-7 drop-shadow-lg md:text-right">
            Explore the teams behind the machines on the GridBox F1 Constructors
            page! Select a season to view every constructor that competed, from
            legendary names to new challengers. Discover the engineering
            prowess, strategy, and innovation that drives the world of Formula
            1, one constructor at a time.
          </p>
          <div className="md:flex justify-end">
            <Link to="/constructors">
              <CTAButton text="View Constructors" />
            </Link>
          </div>
        </section>
      </div>

      {/* Drivers Standings Section */}
      <div
        data-aos="fade-up"
        className="py-20 flex flex-wrap-reverse gap-y-10 min-h-[70vh]"
      >
        <section className="w-full md:flex-1 flex flex-col justify-center gap-y-8 px-10">
          <p className="text-5xl font-mono font-medium">
            Race to the Championship
          </p>
          <p className="text-xl italic leading-7 drop-shadow-lg">
            Track the rise and fall of F1&apos;s finest on the Drivers Standings
            page! Choose a year to view the official rankings and see how each
            driver stacked up throughout the season.
          </p>
          <Link to="/drivers-standings">
            <CTAButton text="View Drivers Standings" />
          </Link>
        </section>
        <div className="w-full md:flex-1 flex justify-center items-center">
          <img src="https://res.cloudinary.com/do8rpl9l4/image/upload/v1731259507/max_t8vzkt.png" />
        </div>
      </div>

      {/* Constructors Standings Section */}
      <div
        data-aos="fade-up"
        className="py-20 flex flex-wrap gap-y-10 bg-hovercta/5 min-h-[70vh]"
      >
        <div className="w-full md:flex-1 flex justify-center items-center">
          <img
            src="https://res.cloudinary.com/do8rpl9l4/image/upload/v1731261465/ferrari_hx9mje.png"
            className="[transform:rotateY(180deg)]"
          />
        </div>
        <section className="flex-1 flex flex-col justify-center gap-y-12 px-10">
          <p className="text-5xl font-medium md:text-right font-mono ">
            The Battle of Constructors
          </p>
          <p className="text-xl italic leading-7 drop-shadow-lg md:text-right">
            Discover the teams that dominated each Formula 1 season on the
            Constructors Standings page! Select a year to view the official
            rankings, showcasing each team&apos;s journey to the top of the
            championship. Relive the intense competition that crowned the top
            constructors in F1 history.
          </p>
          <div className="md:flex justify-end">
            <Link to="/constructors-standings">
              <CTAButton text="View Constructors Standings" />
            </Link>
          </div>
        </section>
      </div>

      {/* The Paddock Report */}
      <div
        data-aos="fade-up"
        className="py-20 flex flex-wrap-reverse gap-y-10 min-h-[70vh]"
      >
        <section className="w-full md:flex-1 flex flex-col justify-center gap-y-8 px-10">
          <p className="text-5xl font-mono font-medium">The Paddock Report</p>
          <p className="text-xl italic leading-7 drop-shadow-lg">
            Stay up-to-date with the latest in Formula 1 on the GridBox
            F1&apos;s Paddock Report! From breaking news and race recaps to
            in-depth analysis of team strategies and driver performances, our
            articles keep you connected to the pulse of the F1 world. The
            Paddock Report is your source for all things F1, beyond the track!
          </p>
          <Link to="/the-paddock-report">
            <CTAButton text="View The Paddock Report" />
          </Link>
        </section>
        <div className="w-full md:flex-1  flex justify-center items-center">
          <img src="https://res.cloudinary.com/do8rpl9l4/image/upload/v1731259507/max_t8vzkt.png" />
        </div>
      </div>

      {/* Schedule Section */}
      <div
        data-aos="fade-up"
        className="py-20 flex flex-wrap gap-y-10 bg-hovercta/5 min-h-[70vh]"
      >
        <div className="w-full md:flex-1 flex justify-center items-center">
          <img src="https://res.cloudinary.com/do8rpl9l4/image/upload/v1731261225/f1_s04v3f.png" />
        </div>
        <section className="flex-1 flex flex-col justify-center gap-y-12 px-10">
          <p className="text-5xl font-medium md:text-right font-mono ">
            Grand Prix Calendar
          </p>
          <p className="text-xl italic leading-7 drop-shadow-lg md:text-right">
            Plan your season with the full F1 race schedule on the Schedule
            page! Choose a year to view every Grand Prix, including dates,
            locations, and circuit details for each event. Follow the journey
            from the season opener to the championship-deciding finale and never
            miss a moment of the action. Stay on top of each race and be ready
            to experience the thrill of F1!
          </p>
          <div className="md:flex justify-end">
            <Link to="/schedule">
              <CTAButton text="View Season Schedule" />
            </Link>
          </div>
        </section>
      </div>

      {/* Circuits Section */}
      <div
        data-aos="fade-up"
        className="py-20 flex flex-wrap-reverse gap-y-10 min-h-[70vh]"
      >
        <section className="w-full md:flex-1 flex flex-col justify-center gap-y-8 px-10">
          <p className="text-5xl font-mono font-medium">Iconic F1 Tracks</p>
          <p className="text-xl italic leading-7 drop-shadow-lg">
            Explore the iconic circuits that make up each Formula 1 season on
            the Circuits page! Select a year to discover every track on the
            calendar, from high-speed straights to challenging turns. Experience
            the global journey of F1 through the circuits that test the limits
            of drivers and teams alike.
          </p>
          <Link to="/circuits">
            <CTAButton text="View Circuits" />
          </Link>
        </section>
        <div className="w-full md:flex-1 flex justify-center items-center">
          <img src="https://res.cloudinary.com/do8rpl9l4/image/upload/v1731260323/monaco_how939.png" />
        </div>
      </div>
    </div>
  );
};

export default Home;
