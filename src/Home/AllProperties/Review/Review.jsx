import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

const Review = ({ id }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!id) return;

    const fetchReviews = async () => {
      try {
        const resReviews = await axios.get(`${import.meta.env.VITE_API_URL}/reviews/${id}`);
        setReviews(resReviews.data || []);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchReviews();
  }, [id]);

const handleDelete = async (reviewId) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  });

  if (!result.isConfirmed) return;

  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/reviews/${reviewId}`, {
      data: { userEmail: user.email }, // verify ownership on backend
    });

    // Remove from state
    setReviews((prev) => prev.filter((r) => r._id !== reviewId));

    // Show success
    Swal.fire({
      title: "Deleted!",
      text: "Your review has been deleted.",
      icon: "success"
    });
  } catch (error) {
    console.error("Failed to delete review:", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Failed to delete review.",
    });
  }
};

  return (
    <div className="mb-6 text-center w-2/ mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">User Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-600">No reviews yet. Be the first to leave one!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-gray-100 p-4 rounded shadow text-left relative">
              <p className="text-gray-800 font-medium">
                {review.userEmail || review.userName || "Anonymous"}
              </p>
              {/* Stars */}
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
              <p className="text-gray-600 text-sm">{review.comment}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>

              {/* Delete button */}
              {user?.email === review.userEmail && (
                <button
                  onClick={() => handleDelete(review._id)}
                  className="btn absolute top-2 right-2 border border-red-500 hover:text-red-800"
                  title="Delete review"
                >
                  deleted
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Review;
