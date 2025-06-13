import { Link } from "react-router-dom";
import { useDarkMode } from "@/context/DarkModeContext";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ChevronRight,
  Mail,
  Github,
} from "lucide-react";

// @ts-expect-error asset declaration not found
import footerImage from "../assets/footer.svg";
// @ts-expect-error asset declaration not found
import car from "../assets/racing-car-dark.png";

const Footer = () => {
  const { isDarkMode } = useDarkMode();

  const mainLinks = [
    { name: "Home", path: "/" },
    { name: "Drivers", path: "/drivers" },
    { name: "Constructors", path: "/constructors" },
    { name: "Circuits", path: "/circuits" },
  ];

  const standingsLinks = [
    { name: "Drivers Standings", path: "/drivers-standings" },
    { name: "Constructors Standings", path: "/constructors-standings" },
  ];

  const otherLinks = [
    { name: "Schedule", path: "/schedule" },
    { name: "The Paddock Report", path: "/the-paddock-report" },
  ];

  return (
    <footer className="relative bg-secondarydarkbg border-t-2 border-darkmodetext/30 text-white">
      {/* Main footer content */}
      <div className="container mx-auto pt-28 pb-12 px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src={car} className="h-14" alt="GridBox" />
              <span className="text-4xl font-bold">GridBox</span>
            </div>
            <p className="text-gray-300">
              Your one-stop destination for everything Formula 1. Get the latest
              news, standings, race results, and more.
            </p>
            <div className="flex gap-4">
              <a
                href="https://x.com/roshith_prakash"
                className="hover:text-darkmodeCTA transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={25} />
              </a>
              <a
                href="https://github.com/roshith-prakash"
                className="hover:text-darkmodeCTA transition-colors"
                aria-label="Instagram"
              >
                <Github size={25} />
              </a>
              <a
                href="mailto:roshithprakash07@gmail.com"
                className="hover:text-darkmodeCTA transition-colors"
                aria-label="Email"
              >
                <Mail size={25} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-gray-700 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {mainLinks.map((link) => (
                <li key={link.path} className="flex items-center">
                  <ChevronRight size={16} className="text-darkmodeCTA mr-2" />
                  <Link
                    to={link.path}
                    className="hover:text-darkmodeCTA transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Standings */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-gray-700 pb-2">
              Standings
            </h3>
            <ul className="space-y-3">
              {standingsLinks.map((link) => (
                <li key={link.path} className="flex items-center">
                  <ChevronRight size={16} className="text-darkmodeCTA mr-2" />
                  <Link
                    to={link.path}
                    className="hover:text-darkmodeCTA transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              {otherLinks.map((link) => (
                <li key={link.path} className="flex items-center">
                  <ChevronRight size={16} className="text-darkmodeCTA mr-2" />
                  <Link
                    to={link.path}
                    className="hover:text-darkmodeCTA transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <img
              src={footerImage}
              alt="GridBox"
              className="h-20 md:h-24 pointer-events-none"
            />
          </div>
          <div className="text-center md:text-right text-gray-400">
            <p>Developed by Roshith Prakash</p>
            <p className="mt-1">
              © {new Date().getFullYear()} GridBox. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
