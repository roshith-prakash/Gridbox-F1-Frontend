import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa6";
import logo from "../assets/logo.png";
import { SiF1 } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-cta to-hovercta font-inter pb-20 min-h-50vh relative text-white">
      <div className="absolute -top-16 w-[90vw] lg:w-[80vw] left-1/2 -translate-x-1/2 rounded-lg h-32 flex justify-center items-center bg-[#1f1e1e] text-white">
        <p className="text-lg md:text-xl font-medium text-center">
          GridBox F1 - Your one shot stop for everything F1 !
        </p>
      </div>

      <div className="pt-36 font-medium flex flex-col lg:flex-row">
        <div className="flex-1">
          <p className="flex justify-center items-center gap-x-2 text-3xl text-center">
            GridBox <SiF1 className="translate-y-1 text-5xl" />
          </p>

          <div className="hidden md:flex justify-center gap-x-8 mt-10">
            <a
              href="https://github.com/roshith-prakash"
              target="_blank"
              rel="noreferrer"
              className="p-3 text-white hover:bg-white hover:text-cta transition-all cursor-pointer rounded-full border-2 border-white"
              aria-label="Visit GitHub Profile"
            >
              <FaGithub className="text-2xl" />
            </a>
            <a
              href="https://www.linkedin.com/in/roshith-prakash/"
              target="_blank"
              rel="noreferrer"
              className="p-3 text-white hover:bg-white hover:text-cta transition-all cursor-pointer rounded-full border-2 border-white"
              aria-label="Visit LinkedIn Profile"
            >
              <FaLinkedin className="text-2xl" />
            </a>
            <a
              href="mailto:roshithprakash07@gmail.com"
              className="p-3 text-white hover:bg-white hover:text-cta transition-all cursor-pointer rounded-full border-2 border-white"
              aria-label="Email Roshith Prakash"
            >
              <FaEnvelope className="text-2xl" />
            </a>
          </div>

          <p className="mt-14 text-center">Developed by Roshith Prakash.</p>
          <p className="mt-3 text-center">2024.</p>
        </div>

        <div className="hidden flex-1 lg:flex justify-center items-center">
          <img
            src={logo}
            alt="Illustration of a programmer"
            className="h-60 pointer-events-none"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
