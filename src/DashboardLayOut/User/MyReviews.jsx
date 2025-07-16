import React, { useEffect } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Get reviews using TanStack Query
  const {
    data: reviews = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["my-reviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-reviews/${user.email}`);
      return data;
    },
  });

  //  Delete mutation using TanStack Mutation
  const { mutate: deleteReview } = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/reviews/${id}`, {
        params: { userEmail: user.email },
      });
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "Your review has been deleted.", "success");
      queryClient.invalidateQueries(["my-reviews", user?.email]); // Refresh list
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete review.", "error");
    },
  });

  // Handle delete with confirmation
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      deleteReview(id);
    }
  };


useEffect(() => {
  document.title = "MyReviews";
}, []);


  if (isLoading) return <p className="text-center">Loading reviews...</p>;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Reviews</h2>
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white p-4 rounded shadow border relative"
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
                className="btn absolute top-2 right-2 border border-red-500 text-red-500 hover:text-white hover:bg-red-500 transition"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600">
            You haven't written any reviews yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyReviews;
