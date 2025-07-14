import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const fetchReviews = async (propertyId) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/reviews/${propertyId}`
  );
  return res.data;
};

const Review = ({ id }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch reviews with React Query
  const {
    data: reviews = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => fetchReviews(id),
    enabled: !!id,
  });

  // Mutation for deleting review
  const deleteMutation = useMutation({
    mutationFn: async (reviewId) => {
      // If your backend expects userEmail as query param:
      return axios.delete(
        `${
          import.meta.env.VITE_API_URL
        }/reviews/${reviewId}?userEmail=${encodeURIComponent(user.email)}`
      );
    },
    onSuccess: () => {
      Swal.fire({
        title: "Deleted!",
        text: "Your review has been deleted.",
        icon: "success",
      });
      // Invalidate and refetch reviews
      queryClient.invalidateQueries(["reviews", id]);
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to delete review.",
      });
    },
  });

  const handleDelete = async (reviewId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      deleteMutation.mutate(reviewId);
    }
  };

  if (isLoading) return <p>Loading reviews...</p>;
  if (isError) return <p>Failed to load reviews.</p>;

  return (
    <div className="mb-6 text-center w-2/ mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">User Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-600">
          No reviews yet. Be the first to leave one!
        </p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-gray-100 p-4 rounded shadow text-left relative"
            >
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

              <p className="text-gray-800 font-medium">
                {review.userEmail || review.userName || "Anonymous"}
              </p>
              <p className="text-gray-600 text-sm">{review.comment}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>

              {/* Delete button, only for review owner */}
              {user?.email === review.userEmail && (
                <button
                  onClick={() => handleDelete(review._id)}
                  disabled={deleteMutation.isLoading}
                  className="btn absolute top-2 right-2 border border-red-500 hover:text-red-800"
                  title="Delete review"
                >
                  Delete
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
