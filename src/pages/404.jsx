import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CTAButton } from "../components";

// 404 error page
const NotFound = () => {
  // Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="bg-greyBG flex justify-center py-10 rounded-lg">
      <section className="w-full max-w-[96%] flex flex-col py-10 justify-center items-center gap-y-5 rounded px-2 shadow bg-white">
        {/* Title */}
        <h1 className="text-center text-4xl font-medium">
          Oops! Seems like you went off track!
        </h1>
        {/* Subtitle */}
        <h3 className="text-center text-2xl font-medium">
          Let&apos;s get you back on the road...
        </h3>

        {/* Image of car crashing */}
        <img
          src={
            "https://res.cloudinary.com/do8rpl9l4/image/upload/v1731232561/crash_skhbm8.png"
          }
          className="w-80"
        ></img>

        {/* Button to go to home page */}
        <Link to="/">
          <CTAButton text="Back to the Garage" />
        </Link>
      </section>
    </main>
  );
};

export default NotFound;
