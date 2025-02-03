import { useContext, useEffect, useState } from "react";
import ReviewCard from "../components/ReviewCard";
import { AuthContext } from "../provider/AuthProvider";

const AllReview = () => {
  const { isDarkMode } = useContext(AuthContext);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("reviews.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then((res) => res.json())
      .then((data) => setReviews((prevReviews) => [...prevReviews, ...data]));
  }, []);

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
            <ReviewCard key={idx} review={review} isDarkMode={isDarkMode} />
          ))
        ) : (
          <p className="text-center col-span-full">No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default AllReview;
