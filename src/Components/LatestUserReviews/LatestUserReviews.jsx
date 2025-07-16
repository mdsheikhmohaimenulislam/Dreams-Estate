import { useQuery } from "@tanstack/react-query";

const fetchLatestReviews = async () => {
  const token = localStorage.getItem("access-token");

  const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Network response was not ok");

  const data = await res.json();

  // Sort by newest and get top 3
  return data
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);
};

const LatestUserReviews = () => {
  const {
    data: reviews = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["latest-reviews"],
    queryFn: fetchLatestReviews,
  });

  if (isLoading) return <p className="text-center">Loading reviews...</p>;
  if (error)
    return <p className="text-center text-red-600">Failed to load reviews</p>;


  return (
    <section className="max-w-6xl mx-auto p-6 mt-20">
      <h2 className="text-3xl font-bold text-center mb-8">
        Latest User Reviews
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white rounded-2xl p-5 shadow-md border hover:shadow-lg transition-all"
          >
            <div className="flex items-center mb-4 gap-3">
              <img
                src={review.userImage || "/default-avatar.png"}
                alt={review.userName || "Anonymous"}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="text-lg font-semibold">
                  {review.userName || "Anonymous"}
                </h4>
                <p className="text-sm text-gray-500">
                  {review.propertyTitle || "Property"}
                </p>
              </div>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestUserReviews;
