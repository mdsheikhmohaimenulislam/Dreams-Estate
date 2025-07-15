import axios from "axios";
import { useLocation, useNavigate, useParams} from "react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import Review from "./Review/Review";
import Wishlist from "./Review/Wishlist";
import useUserroll from "../../hooks/userRoll";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";

const fetchProperty = async (id) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/properties/${id}`);
  if (!res.ok) throw new Error("Property not found");
  return res.json();
};

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roll, isRollLoading] = useUserroll();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);

  const location = useLocation();
  const { status } = location.state || {}; //  fallback in case state is null



  const {
    data: property,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["property", id],
    queryFn: () => fetchProperty(id),
    enabled: !!id,
    onError: () => navigate("/not-found"),
  });

  const submitReviewMutation = useMutation({
    mutationFn: (newReview) =>
      axios.post(`${import.meta.env.VITE_API_URL}/reviews`, newReview),
    onSuccess: () => {
      toast.success("Review submitted!");
      setReviewText("");
      setRating(5);
      refetch();
      // Invalidate and refetch queries to refresh property data
      queryClient.invalidateQueries(["property", id]);

      // Close modal if open
      const modal = document.getElementById("my_modal_1");
      if (modal) modal.close();
    },
    onError: () => {
      toast.error("Failed to submit review");
    },
  });

  if (isLoading || isRollLoading) return <LoadingSpinner />;
  if (isError || !property) return <p>Property not found</p>;

  const {
    title,
    image,
    location:propertyLocation,
    Details,
    MaximumPrice,
    MinimumPrice,
  } = property;

  const handleSubmitReview = (e) => {
    e.preventDefault();
    submitReviewMutation.mutate({
      userName: user?.displayName,
      userImage: image,
      userEmail: user?.email,
      propertyTitle: title,
      agentName: property.agent.name,
      propertyId: property._id,
      rating,
      comment: reviewText,
    });
  };

  return (
    <div>
      <div className="w-11/12 mx-auto mt-20">
        <div className="flex flex-col md:flex-row gap-6 p-6">
          <div className="w-full md:w-1/2">
            <img
              src={image}
              alt={title}
              className="w-full h-[400px] object-cover rounded-xl shadow-md"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <h2 className="text-3xl font-bold">{title}</h2>
            <p>
              <span className="font-semibold">Location:</span> {propertyLocation}
            </p>
            <p>
              <span className="font-semibold">minPrice:</span> ${MinimumPrice}
            </p>
            <p>
              <span className="font-semibold">maxPrice:</span> ${MaximumPrice}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
              <div className="space-y-2">
                <div className="space-x-4">
                  <div className="flex space-y-5">
                    <img
                      alt=""
                      src={property?.agent?.image}
                      className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500"
                    />
                    <div className="ml-5">
                      <a
                        rel="noopener noreferrer"
                        href="#"
                        className="text-sm font-semibold"
                      >
                        {property?.agent?.name}
                      </a>
                      <p
                        className={`text-sm font-semibold ${
                          status ? "text-green-600" : "text-yellow-500"
                        }`}
                      >
                        {status ? " Verified" : " Pending"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 flex-1 flex">
                    <button
                      disabled={roll !== "user"}
                      className="btn cursor-pointer bg-[#004d56] text-white"
                      onClick={() =>
                        document.getElementById("my_modal_1").showModal()
                      }
                    >
                      Reviews
                    </button>

                    <dialog id="my_modal_1" className="modal">
                      <div className="modal-box">
                        <form
                          onSubmit={handleSubmitReview}
                          className="space-y-4"
                        >
                          <div>
                            <label className="block text-sm font-medium">
                              Your Review:
                            </label>
                            <textarea
                              value={reviewText}
                              onChange={(e) => setReviewText(e.target.value)}
                              className="w-full textarea textarea-bordered"
                              rows={3}
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Your Rating:
                            </label>
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => {
                                const starValue = i + 1;
                                return (
                                  <button
                                    key={starValue}
                                    type="button"
                                    onClick={() => setRating(starValue)}
                                  >
                                    <FaStar
                                      size={24}
                                      className={`cursor-pointer ${
                                        starValue <= rating
                                          ? "text-yellow-400"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="btn btn-success w-full"
                            disabled={submitReviewMutation.isLoading}
                          >
                            {submitReviewMutation.isLoading
                              ? "Submitting..."
                              : "Submit Review"}
                          </button>
                        </form>

                        <div className="modal-action">
                          <form method="dialog">
                            <button className="btn">Close</button>
                          </form>
                        </div>
                      </div>
                    </dialog>

                    <Wishlist
                      roll={roll}
                      property={property}
                      id={property._id}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-300">
                  <h3 className="text-xl font-semibold mb-1">Description:</h3>
                  <p className="leading-relaxed">{Details}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Review id={property._id} />
    </div>
  );
};

export default PropertyDetails;
