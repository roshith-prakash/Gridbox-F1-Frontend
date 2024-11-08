import { Link } from "react-router-dom";
import { SiF1 } from "react-icons/si";
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

const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block w-full select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
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
    <div className="px-10 py-3 flex justify-between items-center shadow-md relative z-2">
      <Link
        to="/"
        className="font-mono font-bold italian flex gap-x-2 items-center text-2xl "
      >
        GridBox <SiF1 className="text-[3rem] translate-y-0.5" />
      </Link>

      <div className="hidden md:flex gap-x-5  pt-1 text-lg font-medium">
        <Link to="/drivers">Drivers</Link>
        <Link to="/constructors">Constructors</Link>

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
                  className="text-lg"
                ></ListItem>
                <ListItem
                  to="/constructors-standings"
                  title="Constructors Standings"
                ></ListItem>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Link to="/schedule">Schedule</Link>
        <Link to="/circuits">Circuits</Link>
      </div>
    </div>
  );
};

export default Navbar;
