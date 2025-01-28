import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const BannerSlider = () => {
  const { games } = useContext(AuthContext);

  return (
    <div className="carousel w-full">
      {games.map((game) => (
        <div
          key={game.id}
          id={`slide${game.id}`}
          className="carousel-game relative w-full"
        >
          <img
            src={game.bannerImage}
            alt={game.title}
            className="w-full object-cover"
          />
          <div className="absolute bottom-5 left-5 text-white text-lg bg-black/50 px-4 py-2 rounded">
            {game.title}
          </div>
          <div className="absolute flex justify-between w-full px-4 top-1/2 transform -translate-y-1/2">
            <a
              href={`#slide${game.id === 1 ? games.length : game.id - 1}`}
              className="btn btn-circle"
            >
              ❮
            </a>
            <a
              href={`#slide${game.id === games.length ? 1 : game.id + 1}`}
              className="btn btn-circle"
            >
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BannerSlider;
