import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import defaultUserImg from "../assets/user.png";

const ReviewCard = ({ review }) => {
  const { isDarkMode } = useContext(AuthContext);
  const [game, setGame] = useState(null);
  const [reviewUser, setReviewUser] = useState(null);

  useEffect(() => {
    fetch("games.json")
      .then((res) => res.json())
      .then((data) => {
        const matchedGame = data.find((g) => g.id === review.gameId);
        setGame(matchedGame);
      })
      .catch((error) => console.error("Error fetching games:", error));
  }, [review.gameId]);

  useEffect(() => {
    if (review.email) {
      fetch(`http://localhost:5000/users?email=${review.email}`)
        .then((res) => res.json())
        .then((data) => {
          setReviewUser(data.photoURL);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }
  }, [review.email]);

  return (
    <div
      className={`p-6 rounded-lg shadow-md hover:scale-105 transition ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {game && (
        <div className="flex items-center gap-4">
          <img
            src={reviewUser || defaultUserImg}
            alt={review.displayName}
            className="w-12 h-12 rounded-full object-cover border border-gray-300"
          />
          <h3 className="text-lg font-bold">{review.title}</h3>
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
