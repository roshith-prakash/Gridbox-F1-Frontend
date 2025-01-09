import { SiF1 } from "react-icons/si";
import { Link } from "react-router-dom";
import { useDarkMode } from "@/context/DarkModeContext";

const Footer = () => {
  const { isDarkMode } = useDarkMode();
  return (
    <footer
      className={` ${
        isDarkMode
          ? "bg-secondarydarkbg border-t-2 border-darkmodetext"
          : " bg-gradient-to-b from-hovercta to-cta"
      } font-inter pb-20 min-h-50vh relative text-white`}
    >
      {/* Black div - floating into page */}
      <div className="absolute dark:border-2 dark:border-white -top-16 w-[90vw] lg:w-[80vw] left-1/2 -translate-x-1/2 rounded-lg h-32 flex justify-center items-center bg-darkbg text-white">
        <p className="text-lg md:text-xl font-medium text-center">
          GridBox F1 - Your one shot stop for everything F1 !
        </p>
      </div>

      {/* Rest of the footer */}
      <div className="pt-24 md:pt-36 font-medium flex flex-col lg:flex-row">
        <div className="flex-1">
          {/* Site Name */}
          <p className="flex justify-center items-center gap-x-2 text-3xl text-center">
            GridBox <SiF1 className="translate-y-1 text-5xl" />
          </p>

          {/* Links on Medium & Large Screens */}
          <div className="hidden md:grid md:grid-cols-2 gap-x-5 gap-y-5 mt-10 text-center">
            <div className="flex justify-center">
              <Link to="/" className="hover:scale-110 transition-all">
                Home
              </Link>
            </div>

            <div className="flex justify-center">
              <Link to="/circuits" className="hover:scale-110 transition-all">
                Circuits
              </Link>
            </div>

            <div className="flex justify-center">
              <Link to="/drivers" className="hover:scale-110 transition-all">
                Drivers
              </Link>
            </div>

            <div className="flex justify-center">
              <Link
                to="/constructors"
                className="hover:scale-110 transition-all"
              >
                Constructors
              </Link>
            </div>

            <div className="flex justify-center">
              <Link to="/schedule" className="hover:scale-110 transition-all">
                Schedule
              </Link>
            </div>

            <div className="flex justify-center">
              <Link
                to="/the-paddock-report"
                className="hover:scale-110 transition-all"
              >
                The Paddock Report
              </Link>
            </div>

            <div className="flex justify-center">
              <Link
                to="/drivers-standings"
                className="hover:scale-110 transition-all"
              >
                Drivers Standings
              </Link>
            </div>

            <div className="flex justify-center">
              <Link
                to="/constructors-standings"
                className="hover:scale-110 transition-all"
              >
                Constructors Standings
              </Link>
            </div>
          </div>

          {/* Links on Small Screens */}
          <div className="md:hidden grid grid-cols-1 gap-x-5 gap-y-5 mt-10 text-center">
            <div className="flex justify-center">
              <Link to="/" className="hover:scale-110 transition-all">
                Home
              </Link>
            </div>

            <div className="flex justify-center">
              <Link to="/drivers" className="hover:scale-110 transition-all">
                Drivers
              </Link>
            </div>

            <div className="flex justify-center">
              <Link
                to="/constructors"
                className="hover:scale-110 transition-all"
              >
                Constructors
              </Link>
            </div>

            <div className="flex justify-center">
              <Link
                to="/drivers-standings"
                className="hover:scale-110 transition-all"
              >
                Drivers Standings
              </Link>
            </div>

            <div className="flex justify-center">
              <Link
                to="/constructors-standings"
                className="hover:scale-110 transition-all"
              >
                Constructors Standings
              </Link>
            </div>

            <div className="flex justify-center">
              <Link
                to="/the-paddock-report"
                className="hover:scale-110 transition-all"
              >
                The Paddock Report
              </Link>
            </div>

            <div className="flex justify-center">
              <Link to="/circuits" className="hover:scale-110 transition-all">
                Circuits
              </Link>
            </div>

            <div className="flex justify-center">
              <Link to="/schedule" className="hover:scale-110 transition-all">
                Schedule
              </Link>
            </div>
          </div>

          {/* Developed by Roshith */}
          <p className="mt-14 text-center">Developed by Roshith.</p>

          {/* Year of Development */}
          <p className="mt-3 text-center">2024.</p>
        </div>

        {/* Image - Hidden on Smaller Screens */}
        <div className="hidden flex-1 lg:flex justify-center items-center">
          <img
            src="https://res.cloudinary.com/do8rpl9l4/image/upload/v1736414559/logo_cnblu2.png"
            alt="Gridbox F1"
            className="h-60 pointer-events-none"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
