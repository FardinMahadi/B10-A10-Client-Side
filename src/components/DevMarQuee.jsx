import React, { useState, useEffect, useContext } from "react";
import Marquee from "react-fast-marquee";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { AuthContext } from "../provider/AuthProvider";

const DevMarQuee = () => {
  const { isDarkMode } = useContext(AuthContext);
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("games.json")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((error) => console.error("Error fetching games:", error));
  }, []);

  // Apply dynamic color based on dark mode
  const bgColor = isDarkMode ? "bg-gray-600" : "bg-gray-300";
  const textColor = isDarkMode ? "text-white" : "text-black";

  return (
    <div className={`${bgColor} py-10 transition-colors duration-300`}>
      <Marquee pauseOnHover>
        {games.map((game, index) => (
          <div key={index} className="mx-10">
            <img
              src={game.devImg}
              alt={game.developer}
              data-tooltip-id={`tooltip-${index}`}
              className="h-16 cursor-pointer rounded"
            />
            <Tooltip
              id={`tooltip-${index}`}
              place="bottom"
              effect="solid"
              className={`${textColor} bg-opacity-90 px-2 py-1 rounded-md`}
            >
              {game.developer}
            </Tooltip>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default DevMarQuee;
