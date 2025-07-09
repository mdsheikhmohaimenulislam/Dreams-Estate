import React from "react";
import { Link } from "react-router";

const SingleCard = ({ property }) => {
  const { title, image, _id ,MinimumPrice, MaximumPrice, location ,isVerified} = property || {};


  return (
    <div>
      <div className=" card bg-base-100 shadow-sm">
        <figure>
          <img src={image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{location}</p>

          <div className="flex gap-4 text-sm text-gray-600">
            <span>Max: ${MaximumPrice}</span>
            <span>Min: ${MinimumPrice}</span>
          </div>

          {/* agent section */}
          <div className="flex space-x-4 ">
            <img
              alt=""
              src={property?.agent?.image}
              className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500"
            />
            <div className="flex flex-col space-y-1">
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
        </div>
            <Link to={`/DetailsPage/${_id}`} className="btn bg-[#064d57] text-white">details</Link>
      </div>
    </div>
  );
};

export default SingleCard;
