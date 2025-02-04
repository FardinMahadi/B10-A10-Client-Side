import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router-dom";

const MyWatchList = () => {
  const { watchlist, games, isDarkMode } = useContext(AuthContext);

  // Filter games that are in the watchlist
  const watchedGames = games.filter((game) => watchlist.includes(game.id));

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-center text-3xl font-bold mb-8">My Watchlist</h2>
      {watchedGames.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8">
          {watchedGames.map((game) => (
            <div
              key={game.id}
              className={`p-6 relative shadow-lg rounded-lg transition-all duration-300 ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
            >
              {game.editorChoice && (
                <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-sm rounded">
                  Editor's Pick
                </span>
              )}
              <img
                src={game.gameImage}
                alt={game.title}
                className="rounded-lg mb-4"
                style={{
                  width: "100%",
                  aspectRatio: "1/1",
                  objectFit: "cover",
                }}
              />
              <h3 className="text-xl font-semibold">{game.title}</h3>
              <p
                className={`mb-3 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {game.shortReview}
              </p>
              <Link
                to={`/addReview/game/${game.id}`}
                className="text-blue-500 hover:underline"
              >
                Read Full Review →
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-gray-600">
          Your watchlist is empty.
        </p>
      )}
    </div>
  );
};

export default MyWatchList;
