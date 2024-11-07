import { Link } from "react-router-dom";
import { SiF1 } from "react-icons/si";

const Navbar = () => {
  return (
    <div className="px-4 py-3 shadow">
      <Link
        to="/"
        className="font-mono font-bold italian flex gap-x-2 items-center text-2xl"
      >
        GridBox <SiF1 className="text-4xl translate-y-0.5" />
      </Link>
    </div>
  );
};

export default Navbar;
