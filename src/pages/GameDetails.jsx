import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import PostReview from "../components/PostReview";

const GameDetails = ({ isDarkMode }) => {
  const { game } = useLoaderData();
  const [watchlist, setWatchlist] = useState([]);

  // Load watchlist from localStorage when the component mounts
  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(storedWatchlist);
  }, []);

  // Function to handle watchlist toggle
  const toggleWatchlist = () => {
    let updatedWatchlist;

    if (watchlist.includes(game.id)) {
      // Remove the game from the watchlist
      updatedWatchlist = watchlist.filter((gameId) => gameId !== game.id);
    } else {
      // Add the game ID to the watchlist
      updatedWatchlist = [...watchlist, game.id];
    }

    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  // Check if the game is in the watchlist
  const isInWatchlist = watchlist.includes(game.id);

  if (!game)
    return (
      <div className="text-center text-red-500 text-xl py-10">
        Game not found.
      </div>
    );

  return (
    <div>
      {/* Banner Section */}
      <div
        className="h-64 md:h-96 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${game.bannerImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1
            className={`text-4xl md:text-6xl font-bold ${
              isDarkMode ? "text-red-400" : "text-white"
            }`}
          >
            {game.title}
          </h1>
        </div>
      </div>

      {/* Game Details Section */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Game Image */}
          <div className="flex justify-center">
            <img
              src={game.gameImage}
              alt={game.title}
              className="rounded-lg shadow-lg w-full max-w-md"
            />
          </div>

          {/* Game Information */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">{game.title}</h2>
            <p className="text-lg">
              <span className="font-semibold">Genre:</span> {game.genre}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Developer:</span> {game.developer}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Release Date:</span>{" "}
              {game.releaseDate}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Rating:</span> ⭐ {game.rating}
            </p>

            {/* Platforms */}
            <div>
              <h3 className="text-xl font-semibold">Platforms:</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {game.platforms.map((platform, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      isDarkMode
                        ? "bg-gray-600 text-white"
                        : "bg-gray-800 text-white"
                    }`}
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>

            {/* Watchlist Button */}
            <button
              onClick={toggleWatchlist}
              className={`mt-4 px-6 py-2 text-lg font-bold rounded-lg transition ${
                isInWatchlist
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </button>
          </div>
        </div>
      </div>

      {/* Add review section */}
      <div className="container mx-auto">
        <PostReview game={game} />
      </div>
    </div>
  );
};

export default GameDetails;
