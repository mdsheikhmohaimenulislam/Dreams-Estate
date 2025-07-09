import { useEffect, useState } from "react";
import { useParams } from "react-router";

const PropertyDetails = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [property, setProperty] = useState(null);
  const {
    title,
    image,
    location,
    isVerified,
    Details,
    MaximumPrice,
    MinimumPrice,
  } = property || {};

  useEffect(() => {
    if (!id) return; // Only check if id exists

    const fetchProperty = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/properties/${id}`
        );
        const data = await res.json();
        setProperty(data);
        setReviews(data.reviews || []);
      } catch (error) {
        console.error("Failed to fetch property:", error);
      }
    };

    fetchProperty();
    document.title = "DetailsPage";
  }, [id]); // Only depend on id

  if (!property) {
    return <div>Loading...</div>;
  }

  console.log(property);

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

                  <div className="space-y-3">
                    {/* Add to Wishlist Button */}
                    <div className="">
                      <button
                        //   onClick={onAddToWishlist}
                        className="bg-blue-600 text-white btn rounded hover:bg-blue-700 transition-all duration-300"
                      >
                        ❤️ Add to Wishlist
                      </button>
                    </div>
                    {/* Add a Review Button */}
                    <div className="">
                      <button
                        //   onClick={onAddReview}
                        className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition-all duration-300"
                      >
                        ✍️ Add a Review
                      </button>
                    </div>
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
                    <div className="mb-6 text-center">
                      <h2 className="text-xl font-semibold text-gray-800 mb-3">
                        User Reviews
                      </h2>
                      {reviews.length === 0 ? (
                        <p className="text-gray-600">
                          No reviews yet. Be the first to leave one!
                        </p>
                      ) : (
                        <div className="space-y-4">
                          {reviews.map((review, idx) => (
                            <div
                              key={idx}
                              className="bg-gray-100 p-4 rounded shadow"
                            >
                              <p className="text-gray-800 font-medium">
                                {review.userName}
                              </p>
                              <p className="text-gray-600 text-sm">
                                {review.comment}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
    </div>
  );
};

export default PropertyDetails;
