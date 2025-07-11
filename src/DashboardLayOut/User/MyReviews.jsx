import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const MyReviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!user?.email) return;
    axios
      .get(`${import.meta.env.VITE_API_URL}/my-reviews/${user.email}`)
      .then((res) => setReviews(res.data))
      .catch((err) => {
        console.error("Error fetching reviews:", err);
      });
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `${import.meta.env.VITE_API_URL}/reviews/${id}?userEmail=${
              user.email
            }`
          )
          .then(() => {
            setReviews((prev) => prev.filter((review) => review._id !== id));
            Swal.fire("Deleted!", "Your review has been deleted.", "success");
          })
          .catch((err) => {
            console.error("Error deleting review:", err);
            Swal.fire("Error", "Failed to delete review.", "error");
          });
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white p-4 rounded shadow border relative"
          >
            {/* Star rating */}
            <div className="flex text-yellow-400 mb-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={i < review.rating ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.162 6.68a1 1 0 00.95.69h7.035c.969 0 1.371 1.24.588 1.81l-5.695 4.15a1 1 0 00-.364 1.118l2.162 6.679c.3.921-.755 1.688-1.538 1.118L12 17.347l-5.696 4.15c-.783.57-1.838-.197-1.538-1.118l2.162-6.68a1 1 0 00-.364-1.118L1.87 11.107c-.783-.57-.38-1.81.588-1.81h7.035a1 1 0 00.95-.69l2.162-6.68z"
                  />
                </svg>
              ))}
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              {review.propertyTitle}
            </h3>
            <p className="text-sm text-gray-500 mb-1">
              Agent: {review.agentName}
            </p>
            <p className="text-gray-700 mb-1">{review.comment}</p>
            <p className="text-xs text-gray-400">
              Reviewed on: {new Date(review.createdAt).toLocaleDateString()}
            </p>

            <button
              onClick={() => handleDelete(review._id)}
              className="btn absolute top-2 right-2 border border-red-500 hover:text-red-800"
            >
              Delete
            </button>
          </div>
        ))}

        {reviews.length === 0 && (
          <p className="text-gray-600">You haven't written any reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyReviews;
