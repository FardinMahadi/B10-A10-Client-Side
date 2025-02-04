import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { AuthContext } from "../provider/AuthProvider";
import ReviewCard from "../components/ReviewCard";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    if (!user) return; // Prevent fetching if user is not logged in

    fetch("http://localhost:5000/reviews")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch reviews");
        return res.json();
      })
      .then((data) => {
        const userReviews = data.filter(
          (review) => review.email === user.email
        );
        setReviews(userReviews);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user]);

  // Handle Update: Navigate to the update page
  const handleUpdate = (reviewId) => {
    navigate(`/update-review/${reviewId}`); // Navigate to the update page
  };

  // Handle Delete: Delete the review from the database and local state
  const handleDelete = (reviewId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (!confirmDelete) return;

    fetch(`http://localhost:5000/reviews/${reviewId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete the review");
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review.id !== reviewId)
        );
      })
      .catch((err) => setError(err.message));
  };

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error}</p>;
  if (reviews.length === 0) return <p>No reviews found.</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4 text-center">My Reviews</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review.id || review._id}>
            <ReviewCard review={review} />
            <div className="flex space-x-4 mt-2">
              <button
                onClick={() => handleUpdate(review.id || review._id)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(review.id || review._id)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;
