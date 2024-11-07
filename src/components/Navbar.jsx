import { Link } from "react-router-dom";
import { SiF1 } from "react-icons/si";

const Navbar = () => {
  return (
    <div className="px-4 py-3 flex justify-between items-center shadow-md relative z-2">
      <Link
        to="/"
        className="font-mono font-bold italian flex gap-x-2 items-center text-2xl "
      >
        GridBox <SiF1 className="text-4xl translate-y-0.5" />
      </Link>

      <div className="hidden md:flex gap-x-5 text-lg font-medium">
        <Link to="/drivers">Drivers</Link>
        <Link to="/constructors">Constructors</Link>
        <Link to="/schedule">Schedule</Link>
        <Link to="/circuits">Circuits</Link>
      </div>
    </div>
  );
};

export default Navbar;
