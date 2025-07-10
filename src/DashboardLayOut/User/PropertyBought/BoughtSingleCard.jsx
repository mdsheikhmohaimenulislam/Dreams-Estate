import React from "react";

const BoughtSingleCard = ({ data }) => {
  const { propertyTitle, location, agentName, offerAmount, propertyImage } =
    data || {};

  return (
    <div className="card bg-base-100 mt-20 shadow-sm">
      <div>
        <figure>
          <img
            src={propertyImage}
            alt={propertyTitle}
          />
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
          <p className="text-sm md:text-base font-semibold text-green-600">
            Offer Amount: ${offerAmount?.toLocaleString() || "N/A"}
          </p>
        </div>
        <div className="card-actions justify-end">
          <button className="btn bg-[#004d56] text-white">Pay</button>
        </div>
      </div>
    </div>
  );
};

export default BoughtSingleCard;
