import { useContext } from "react";
import logoImgDark from "../assets/logoImgDark.png";
import logoImgLight from "../assets/logoImgLight.png";
import { AuthContext } from "../provider/AuthProvider";

const Logo = () => {
  const { isDarkMode } = useContext(AuthContext);

  return (
    <div className="flex items-center text-3xl italic dark:bg-black transition-all duration-300">
      {/* Logo with hover effect */}
      <img
        src={isDarkMode ? logoImgDark : logoImgLight}
        alt="ChillGamer Logo"
        className="h-8 mr-2 transition-transform duration-300 transform hover:scale-110"
      />
      {/* Animated text with gradient */}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 font-bold italic hover:animate-pulse">
        Chill
      </span>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 font-bold italic hover:animate-pulse">
        Gamer
      </span>
    </div>
  );
};

export default Logo;
