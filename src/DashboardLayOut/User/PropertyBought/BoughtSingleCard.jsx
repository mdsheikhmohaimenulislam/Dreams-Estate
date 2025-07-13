import React from "react";
import { Link } from "react-router";
import useUserroll from "../../../hooks/userRoll";
import LoadingSpinner from "../../../Components/Shared/LoadingSpinner";

const BoughtSingleCard = ({ data }) => {
  const {
    propertyTitle,
    location,
    agentName,
    offerAmount,
    propertyImage,
    pending,
  } = data || {};
  const [roll, isRollLoading] = useUserroll();

  if (isRollLoading) return <LoadingSpinner />;
  return (
    <div className="card bg-base-100 mt-20 shadow-sm">
      <div>
        <figure>
          <img src={propertyImage} alt={propertyTitle} />
        </figure>
      </div>
      <div className="card-body">
        {/* Text Right */}
        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900">
            {propertyTitle || "No Title"}
          </h3>
          <p className="text-sm md:text-base text-gray-600 mb-1">
            <strong>Location:</strong> {location || "Unknown"}
          </p>
          <p className="text-sm md:text-base text-gray-600 mb-1">
            <strong>Agent:</strong> {agentName || "Unknown"}
          </p>
          <p className="text-sm mb-2 md:text-base font-semibold text-green-600">
            Offer Amount: ${offerAmount?.toLocaleString() || "N/A"}
          </p>
          {/* Verification Status */}
          <p
            className={`text-sm font-semibold ${
              pending ? "text-green-600" : "text-yellow-500"
            }`}
          >
            {pending ? " Verified" : " Pending"}
          </p>
        </div>
        <div className="card-actions justify-end">
          {roll !== "user" ? (
            <button
              disabled={roll !== "user"}
              className="btn bg-green-500 text-white hover:cursor-all-scroll"
            >
              Purchase
            </button>
          ) : (
            <Link
              to="/dashboard/PaymentPage"
              state={data}
              className="btn bg-green-500 text-white"
            >
              Purchase
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoughtSingleCard;
