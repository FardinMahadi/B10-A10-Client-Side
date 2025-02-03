import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router-dom";

const AllGames = () => {
  const { games, isDarkMode } = useContext(AuthContext);

  return (
    <section className="px-10">
      <h2
        className={`text-3xl font-bold text-center mb-6 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        All games
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
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
    </section>
  );
};

export default AllGames;
