import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

const PostReview = ({ game }) => {
  const { user, isDarkMode } = useContext(AuthContext);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0); // Selected rating
  const [hoverRating, setHoverRating] = useState(0); // Hovered rating
  const [platform, setPlatform] = useState(""); // Selected platform

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !reviewTitle.trim() ||
      !reviewText.trim() ||
      reviewRating === 0 ||
      !platform
    ) {
      alert(
        "Please fill in all fields, select a rating, and choose a platform before submitting."
      );
      return;
    }
    try {
      const response = await fetch(
        "https://b10-a10-server-side-chi.vercel.app/reviews",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            gameId: game.id,
            userId: user._id,
            email: user.email,
            username: user.displayName,
            title: reviewTitle,
            content: reviewText,
            rating: reviewRating, // Send rating
            platform, // Send selected platform
            date: new Date().toISOString().split("T")[0],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setReviewTitle("");
      setReviewText("");
      setReviewRating(0); // Reset rating
      setPlatform(""); // Reset platform
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div
      className={`max-w-2xl mx-auto p-6 rounded-lg shadow-lg transition-all ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">
        Review for{" "}
        <span className="text-blue-500">{game?.title || "Unknown Game"}</span>
      </h2>
      <p className="text-lg mb-2">
        <strong>Genre:</strong> {game?.genre || "N/A"}
      </p>
      <p className="text-lg mb-4">
        <strong>Reviewed by:</strong> {user?.displayName || "Guest"}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="review-title" className="block font-semibold mb-1">
            Review Title:
          </label>
          <input
            id="review-title"
            type="text"
            name="title"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="review-text" className="block font-semibold mb-1">
            Review:
          </label>
          <textarea
            id="review-text"
            name="content"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 h-32"
          />
        </div>

        {/* Rating Section with Hover Effect */}
        <div>
          <label className="block font-semibold mb-2">Rating:</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`cursor-pointer text-2xl transition-all duration-200 ${
                  star <= (hoverRating || reviewRating)
                    ? "text-yellow-400"
                    : "text-gray-400"
                }`}
                onMouseEnter={() => setHoverRating(star)} // Hover effect
                onMouseLeave={() => setHoverRating(0)} // Reset hover
                onClick={() => setReviewRating(star)} // Set rating on click
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Platform Dropdown */}
        <div>
          <label htmlFor="platform" className="block font-semibold mb-1">
            Select Platform:
          </label>
          <select
            id="platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {game.platforms.map((platform, index) => (
              <option key={index} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default PostReview;
