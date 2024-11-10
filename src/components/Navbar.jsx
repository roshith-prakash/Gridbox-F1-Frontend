import { Link } from "react-router-dom";
import { SiF1 } from "react-icons/si";
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
import React from "react";
import PropTypes from "prop-types";

import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "./ui/drawer";

const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block w-full select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors  focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-lg font-medium leading-none text-nowrap">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    );
  }
);

ListItem.displayName = "ListItem";

ListItem.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.element,
};

const Navbar = () => {
  return (
    <div className="px-5 md:px-10 py-3 flex justify-between items-center shadow-md relative z-2">
      <Link
        to="/"
        className="font-mono font-bold italian flex gap-x-2 items-center text-2xl hover:text-cta transition-all"
      >
        GridBox <SiF1 className="text-[3rem] translate-y-0.5 " />
      </Link>

      <div className="hidden lg:flex gap-x-5  pt-1 text-lg font-medium">
        <Link to="/drivers" className="hover:text-cta transition-all">
          Drivers
        </Link>
        <Link to="/constructors" className="hover:text-cta transition-all">
          Constructors
        </Link>

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

        <Link
          to="/the-paddock-report"
          className="hover:text-cta transition-all"
        >
          The Paddock Report
        </Link>
        <Link to="/schedule" className="hover:text-cta transition-all">
          Schedule
        </Link>
        <Link to="/circuits" className="hover:text-cta transition-all">
          Circuits
        </Link>
      </div>

      <div className="lg:hidden">
        <Drawer direction="right">
          <DrawerTrigger asChild>
            <button>
              <RxHamburgerMenu className="text-2xl translate-y-0.5" />
            </button>
          </DrawerTrigger>
          <DrawerContent className="top-0 min-h-screen">
            <div>
              <div className="flex justify-between w-full">
                <DrawerClose asChild>
                  <Link
                    to="/"
                    className="font-mono font-bold italian flex gap-x-2 items-center text-2xl "
                  >
                    GridBox <SiF1 className="text-[3rem] translate-y-0.5" />
                  </Link>
                </DrawerClose>
                <DrawerClose asChild>
                  <button>
                    <RxCross2 className="text-2xl" />
                  </button>
                </DrawerClose>
              </div>

              <div className="pt-20 flex flex-col text-lg items-center gap-y-10">
                <DrawerClose asChild>
                  <Link to="/" className="hover:text-cta transition-all">
                    Home
                  </Link>
                </DrawerClose>
                <DrawerClose asChild>
                  <Link to="/drivers" className="hover:text-cta transition-all">
                    Drivers
                  </Link>
                </DrawerClose>
                <DrawerClose asChild>
                  <Link
                    to="/constructors"
                    className="hover:text-cta transition-all"
                  >
                    Constructors
                  </Link>
                </DrawerClose>

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

                <DrawerClose asChild>
                  <Link
                    to="/the-paddock-report"
                    className="hover:text-cta transition-all"
                  >
                    The Paddock Report
                  </Link>
                </DrawerClose>

                <DrawerClose asChild>
                  <Link
                    to="/schedule"
                    className="hover:text-cta transition-all"
                  >
                    Schedule
                  </Link>
                </DrawerClose>
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
    </div>
  );
};

export default Navbar;
