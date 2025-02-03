import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

const ReviewCard = ({ review }) => {
  const { isDarkMode } = useContext(AuthContext);
  const [game, setGame] = useState(null);

  useEffect(() => {
    fetch("games.json")
      .then((res) => res.json())
      .then((data) => {
        const matchedGame = data.find((g) => g.id === review.gameId);
        setGame(matchedGame);
      })
      .catch((error) => console.error("Error fetching games:", error));
  }, [review.gameId]);

  return (
    <div
      className={`p-6 rounded-lg shadow-md ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Game Info (Image + Title) */}
      {game && (
        <div className="flex items-center gap-4">
          {/* Profile-like Game Image */}
          <img
            src={game.gameImage}
            alt={game.title}
            className="w-12 h-12 rounded-full object-cover border border-gray-300"
          />
          <h3 className="text-lg font-bold">{game.title}</h3>
        </div>
      )}

      {/* Review Title */}
      <h2 className="text-xl font-semibold mt-2">{review.title}</h2>

      {/* Username and Date */}
      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
        <span>By {review.username}</span>
        <span>{new Date(review.date).toLocaleDateString()}</span>
      </div>

      {/* Review Content */}
      <p className="mt-4">{review.content}</p>

      {/* Rating */}
      <div className="mt-4 font-bold text-yellow-500">
        ⭐ {review.rating}/10
      </div>
    </div>
  );
};

export default ReviewCard;
