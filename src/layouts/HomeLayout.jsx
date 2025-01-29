import { useContext, useEffect, useRef } from "react";
import BannerSlider from "../components/BannerSlider";
import Footer from "./../components/Footer";
import Navbar from "./../components/Navbar";
import { AuthContext } from "../provider/AuthProvider";
import Typewriter from "typewriter-effect/dist/core"; // Ensure you have this installed: `npm install typewriter-effect`
import HighestRatedGames from "../components/HighestRatedGames";

const HomeLayout = () => {
  const { categories } = useContext(AuthContext);
  const typewriterRef = useRef(null);

  useEffect(() => {
    if (categories && typewriterRef.current) {
      new Typewriter(typewriterRef.current, {
        strings: categories, // Pass the array of categories
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
        delay: 75,
      });
    }
  }, [categories]);

  return (
    <div>
      <Navbar />
      {/* Banner */}
      <div className="container mx-auto mt-14">
        {/* Heading or Text Section */}
        <div className="text-center mb-8 mt-10">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to{" "}
            <span ref={typewriterRef} className="text-primary"></span>
          </h1>
          <p className="text-lg text-gray-500">
            Discover the latest and most exciting games. Explore now and enjoy
            the ride!
          </p>
        </div>
        {/* Banner Slider */}
        <BannerSlider />
      </div>

      {/* Highest Rated Games */}
      <div className="container mx-auto mt-14">
        <HighestRatedGames />
      </div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
