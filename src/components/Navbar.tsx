import { Link } from "react-router-dom";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { cn } from "@/lib/utils";
import * as PropTypes from "prop-types";

import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { IoMoon, IoSunnySharp } from "react-icons/io5";
import { useDarkMode } from "@/context/DarkModeContext";

// @ts-expect-error asset declaration error
import car from "@/assets/racing-car.png";
// @ts-expect-error asset declaration error
import carDark from "@/assets/racing-car-dark.png";

const ListItem = ({ className, title, to, ...props }) => {
  return (
    <NavigationMenuLink asChild>
      <Link
        to={to}
        className={cn(
          "block w-full select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors  focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        <div className="text-lg font-medium leading-none text-nowrap">
          {title}
        </div>
      </Link>
    </NavigationMenuLink>
  );
};

ListItem.displayName = "ListItem";

ListItem.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  to: PropTypes.string,
};

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <nav className="px-5 md:px-10 py-4 flex justify-between items-center shadow-md relative z-2">
      {/* Link to Home Page */}
      <Link
        to="/"
        className=" font-bold italian flex gap-x-3 items-center text-3xl hover:text-cta transition-all"
      >
        <img src={isDarkMode ? carDark : car} className="h-8" />
        GridBox
      </Link>

      {/* Navigation links on large screens */}
      <div className="hidden lg:flex gap-x-5  pt-1 text-lg font-medium">
        {/* Link to drivers page */}
        <Link to="/drivers" className="hover:text-cta transition-all">
          Drivers
        </Link>
        {/* Link to constructors page */}
        <Link to="/constructors" className="hover:text-cta transition-all">
          Constructors
        </Link>

        {/* Pop-out menu to display standings links */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-lg -translate-y-1">
                Standings
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-2">
                <ListItem
                  to="/drivers-standings"
                  title="Drivers Standings"
                  className="text-lg text-center hover:text-cta transition-all"
                ></ListItem>
                <ListItem
                  to="/constructors-standings"
                  title="Constructors Standings"
                  className="text-lg text-center hover:text-cta transition-all"
                ></ListItem>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Link to Paddock Report */}
        <Link
          to="/the-paddock-report"
          className="hover:text-cta -translate-x-1 transition-all"
        >
          The Paddock Report
        </Link>

        {/* Link to Schedule */}
        <Link to="/schedule" className="hover:text-cta transition-all">
          Schedule
        </Link>

        {/* Link to circuits */}
        <Link to="/circuits" className="hover:text-cta transition-all">
          Circuits
        </Link>

        <button
          onClick={toggleDarkMode}
          className="hidden lg:block outline-none"
        >
          {isDarkMode ? (
            <IoSunnySharp className="text-2xl -translate-y-1 hover:text-cta transition-all" />
          ) : (
            <IoMoon className="text-2xl -translate-y-1 hover:text-cta transition-all" />
          )}
        </button>
      </div>

      {/* Navigation links on small screens - Drawer pops out from right side */}
      <div className="lg:hidden font-f1 flex gap-x-5 items-center">
        <button
          onClick={toggleDarkMode}
          className="translate-y-0.5 outline-none"
        >
          {isDarkMode ? (
            <IoSunnySharp className="text-2xl hover:text-cta transition-all" />
          ) : (
            <IoMoon className="text-2xl hover:text-cta transition-all" />
          )}
        </button>
        <Drawer direction="right">
          {/* Button to open drawer */}
          <DrawerTrigger asChild>
            <button>
              <RxHamburgerMenu className="text-2xl translate-y-0.5" />
            </button>
          </DrawerTrigger>
          {/* Drawer component */}
          <DrawerContent className="top-0 min-h-screen">
            <div>
              <div className="flex justify-between w-full">
                {/* Link to Home */}
                <DrawerClose asChild>
                  <Link
                    to="/"
                    className=" font-bold font-f1 text-3xl italian flex gap-x-3 items-center "
                  >
                    <img src={isDarkMode ? carDark : car} className="h-8" />
                    GridBox
                  </Link>
                </DrawerClose>
                {/* Button to close drawer */}
                <DrawerClose asChild>
                  <button>
                    <RxCross2 className="text-2xl" />
                  </button>
                </DrawerClose>
              </div>

              {/* Links Section */}
              <div className="pt-20 flex flex-col text-lg items-center gap-y-10">
                {/* Link to Home Page */}
                <DrawerClose asChild>
                  <Link to="/" className="hover:text-cta transition-all">
                    Home
                  </Link>
                </DrawerClose>

                {/* Link to Drivers page */}
                <DrawerClose asChild>
                  <Link to="/drivers" className="hover:text-cta transition-all">
                    Drivers
                  </Link>
                </DrawerClose>

                {/* Link to constructors page */}
                <DrawerClose asChild>
                  <Link
                    to="/constructors"
                    className="hover:text-cta transition-all"
                  >
                    Constructors
                  </Link>
                </DrawerClose>

                {/* Pop out menu to display standings links */}
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="text-lg bg-transparent font-normal -translate-y-1">
                        Standings
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="p-2">
                        <DrawerClose asChild>
                          <ListItem
                            to="/drivers-standings"
                            title="Drivers Standings"
                            className="text-lg text-center hover:text-cta transition-all"
                          ></ListItem>
                        </DrawerClose>
                        <DrawerClose asChild>
                          <ListItem
                            to="/constructors-standings"
                            title="Constructors Standings"
                            className="text-lg text-center hover:text-cta transition-all"
                          ></ListItem>
                        </DrawerClose>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>

                {/* Link to paddock report */}
                <DrawerClose asChild>
                  <Link
                    to="/the-paddock-report"
                    className="hover:text-cta transition-all"
                  >
                    The Paddock Report
                  </Link>
                </DrawerClose>

                {/* Link to schedule */}
                <DrawerClose asChild>
                  <Link
                    to="/schedule"
                    className="hover:text-cta transition-all"
                  >
                    Schedule
                  </Link>
                </DrawerClose>

                {/* Link to circuits */}
                <DrawerClose asChild>
                  <Link
                    to="/circuits"
                    className="hover:text-cta transition-all"
                  >
                    Circuits
                  </Link>
                </DrawerClose>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
