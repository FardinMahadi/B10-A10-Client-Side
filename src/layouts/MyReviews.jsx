import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import ReviewCard from "../components/ReviewCard";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error}</p>;
  if (reviews.length === 0) return <p>No reviews found.</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4 text-center">My Reviews</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <ReviewCard key={review.id || review._id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default MyReviews;
