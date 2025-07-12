import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const RequestedProperties = () => {
  const { user } = useAuth();
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const fetchOffers = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/agent-offers/${user.email}`
        );
        setOffers(res.data);
      } catch (err) {
        console.error("Error fetching offers:", err);
      }
    };

    fetchOffers();
  }, [user?.email]);

  const handleUpdateStatus = async (id, propertyId, status) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/offers/${id}`, {
        status,
        propertyId,
      });

      // update state after success
      setOffers((prev) =>
        prev.map((offer) =>
          offer._id === id
            ? { ...offer, status }
            : offer.propertyId === propertyId && status === "accepted"
            ? { ...offer, status: "rejected" }
            : offer
        )
      );
    } catch (err) {
      console.error("Failed to update offer:", err);
    }
  };

  return (
    <div className="p-4 overflow-scroll">
      <h2 className="text-xl font-bold mb-4">Requested / Offered Properties</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Location</th>
              <th>Buyer Email</th>
              <th>Buyer Name</th>
              <th>Offered Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer._id}>
                <td>{offer.propertyTitle}</td>
                <td>{offer.location}</td>
                <td>{offer.buyerEmail}</td>
                <td>{offer.buyerName}</td>
                <td>${offer.offerAmount || 0}</td>

                {/* ✅ Status Cell */}
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-white text-xs font-semibold
                      ${
                        offer.status === "accepted"
                          ? "bg-green-500"
                          : offer.status === "rejected"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                  >
                    {offer.status}
                  </span>
                </td>

                {/* ✅ Action Buttons */}
                <td>
                  {offer.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        className="btn btn-sm bg-green-500 text-white"
                        onClick={() =>
                          handleUpdateStatus(
                            offer._id,
                            offer.propertyId,
                            "accepted"
                          )
                        }
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-sm bg-red-500 text-white"
                        onClick={() =>
                          handleUpdateStatus(
                            offer._id,
                            offer.propertyId,
                            "rejected"
                          )
                        }
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedProperties;
