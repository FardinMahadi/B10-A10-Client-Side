import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

const BannerSlider = () => {
  const { games } = useContext(AuthContext);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current slide index

  if (!games || games.length === 0) {
    return <div>Loading...</div>; // Handle loading state
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? games.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === games.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full overflow-hidden scale-90">
      <div className="carousel w-full">
        {games.map((game, index) => (
          <div
            key={game.id}
            className={`carousel-item relative w-full h-96 transition-all duration-500 ${
              index === currentIndex ? "block" : "hidden"
            }`}
          >
            <img
              src={game.bannerImage}
              alt={game.title}
              className="w-full h-full object-cover rounded-md"
            />
            <div className="absolute bottom-5 left-5 text-white text-lg bg-black/50 px-4 py-2 rounded flex items-center gap-2">
              <img
                className="h-10 rounded"
                src={game.gameImage}
                alt={game.title}
              />{" "}
              {game.title}
            </div>
          </div>
        ))}
      </div>
      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 btn btn-circle"
      >
        ❮
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 btn btn-circle"
      >
        ❯
      </button>
    </div>
  );
};

export default BannerSlider;
