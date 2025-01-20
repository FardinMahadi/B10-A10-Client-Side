import { useContext } from "react";
import logoImgDark from "../assets/logoImgDark.png";
import logoImgLight from "../assets/logoImgLight.png";
import { AuthContext } from "../provider/AuthProvider";

const Logo = () => {
  const { isDarkMode } = useContext(AuthContext);

  return (
    <div className="flex items-center text-3xl itali dark:bg-black">
      <img src={isDarkMode ? logoImgDark : logoImgLight} className="h-5 mr-2" />
      <span className="text-red-500 font-semibold italic">Chill</span>Gamer
    </div>
  );
};

export default Logo;
