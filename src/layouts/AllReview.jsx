import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import ReviewCard from "../components/ReviewCard";
import { AuthContext } from "../provider/AuthProvider";

const AllReview = () => {
  const { isDarkMode } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("reviews.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  useEffect(() => {
    fetch("https://b10-a10-server-side-chi.vercel.app/reviews")
      .then((res) => res.json())
      .then((data) => setReviews((prevReviews) => [...prevReviews, ...data]));
  }, []);

  // Function to handle navigate to a specific review
  const handleExploreDetails = (id) => {
    navigate(`/addReview/game/${id}`); // Navigate to the dynamic route
  };

  return (
    <div
      className={`container mx-auto px-4 py-8 ${
        isDarkMode ? "" : "bg-white text-gray-900"
      }`}
    >
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Game Reviews</h1>
        <p className="mt-2">
          Read what gamers have to say about the latest titles.
        </p>
      </div>

      {/* Reviews Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.length > 0 ? (
          reviews.map((review, idx) => (
            <div className="flex flex-col" key={idx}>
              <ReviewCard review={review} isDarkMode={isDarkMode} />
              <button
                onClick={() => handleExploreDetails(review.gameId)} // Pass the review id
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
              >
                {console.log(review)}
                Explore Details
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default AllReview;
