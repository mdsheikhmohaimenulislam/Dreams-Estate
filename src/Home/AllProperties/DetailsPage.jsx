import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import Review from "./Review/Review";
import Wishlist from "./Review/Wishlist";
import useUserroll from "../../hooks/userRoll";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roll, isRollLoading] = useUserroll();

  const [property, setProperty] = useState(null);
  const { user } = useAuth();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const {
    title,
    image,
    location,
    isVerified,
    Details,
    MaximumPrice,
    MinimumPrice,
  } = property || {};

  console.log(property);

  useEffect(() => {
    if (!id) return; // just stop effect, no return JSX

    const fetchPropertyAndReviews = async () => {
      try {
        const resProperty = await fetch(
          `${import.meta.env.VITE_API_URL}/properties/${id}`
        );

        if (!resProperty.ok) {
          navigate("/not-found");
          return;
        }

        const dataProperty = await resProperty.json();
        setProperty(dataProperty);
      } catch (error) {
        console.error("Failed to fetch property or reviews:", error);
        navigate("/not-found");
      }
    };

    fetchPropertyAndReviews();
    document.title = "DetailsPage";
  }, [id, navigate]);

  if (!property) {
    return <div>Loading...</div>;
  }

  //   console.log(property._id);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/reviews`, {
        userName: user?.displayName,
        userEmail: user?.email,
        propertyTitle: property.title,
        agentName: property.agent.name,
        propertyId: property._id,
        rating,
        comment: reviewText,
      });
      toast.success("Review submitted!");
      window.location.reload();
      setReviewText("");
      setRating(5);
    } catch (err) {
      if (err) {
        toast.error("Failed to submit review");
      }
    }
  };

  if (isRollLoading) return <LoadingSpinner />;
  return (
    <div>
      {/* Show more property details here */}
      <div className="w-11/12 mx-auto mt-20">
        <div className="flex flex-col md:flex-row gap-6 p-6">
          {/* LEFT: Image */}
          <div className="w-full md:w-1/2">
            <img
              src={image}
              alt={title}
              className="w-full h-[400px] object-cover rounded-xl shadow-md"
            />
          </div>
          {/* RIGHT: Content */}
          <div className="w-full md:w-1/2 space-y-4">
            <h2 className="text-3xl font-bold">{title}</h2>
            <p>
              <span className="font-semibold">Location:</span> {location}
            </p>
            <p>
              <span className="font-semibold">minPrice:</span> ${MinimumPrice}
            </p>
            <p>
              <span className="font-semibold">maxPrice:</span> ${MaximumPrice}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
              <div className="space-y-2">
                {/* agent section */}
                <div className=" space-x-4 ">
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
                      {/* Verification Status */}
                      <p
                        className={`text-sm font-semibold ${
                          isVerified ? "text-green-600" : "text-yellow-500"
                        }`}
                      >
                        {isVerified ? " Verified" : " Pending"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 flex-1 flex">
                    {/* Reviews Button */}
                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                    <button
                      disabled={roll !== "user"}
                      className="btn cursor-pointer bg-[#004d56] text-white"
                      onClick={() =>
                        document.getElementById("my_modal_1").showModal()
                      }
                    >
                      {" "}
                      Reviews
                    </button>
                    <dialog id="my_modal_1" className="modal">
                      <div className="modal-box">
                        {/* Reviews section */}
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
                          >
                            Submit Review
                          </button>
                        </form>

                        <div className="modal-action">
                          <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                          </form>
                        </div>
                      </div>
                    </dialog>

                    {/* Add to Wishlist Button */}
                  
                      <Wishlist roll={roll} property={property} id={property._id} />
     
                  </div>
                </div>
                {/*  Description */}
                <div className="pt-4 border-t border-gray-300">
                  <h3 className="text-xl font-semibold mb-1">Description:</h3>
                  <p className="leading-relaxed">{Details}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}

      <Review id={property._id} />
    </div>
  );
};

export default PropertyDetails;
