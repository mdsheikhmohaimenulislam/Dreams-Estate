import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

const fetchReviews = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/reviews`);
  return res.data;
};

const ManageReview = () => {
  const queryClient = useQueryClient();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${import.meta.env.VITE_API_URL}/my-reviews/${id}`);
    },
    onSuccess: () => {
      toast.success("Review deleted");
      queryClient.invalidateQueries(["my-reviews"]);
    },
    onError: () => {
      toast.error("Failed to delete review");
    },
  });


  useEffect(() => {
  document.title = "ManageReview";
}, []);

  if (isLoading) return <p className="text-center">Loading reviews...</p>;
  console.log(reviews);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {reviews.map((review) => (
        <div key={review._id} className="card bg-white shadow-md p-4">
          <div className="flex items-center gap-4">
            <img
              src={review.userImage || "/default-avatar.png"}
              alt={review.agentName}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="font-semibold">{review.userName}</h3>
              <p className="text-sm text-gray-500">{review.userEmail}</p>
            </div>
          </div>
          <p className="mt-2 text-gray-700">{review.review}</p>
          <button
            onClick={() => deleteMutation.mutate(review._id)}
            className="btn btn-sm bg-red-500 text-white mt-4"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ManageReview;
