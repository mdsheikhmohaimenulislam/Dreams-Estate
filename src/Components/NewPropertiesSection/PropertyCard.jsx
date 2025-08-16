import { Link } from "react-router";

export const PropertyCard = ({ property }) => {

   const { title, image, _id, MinimumPrice, MaximumPrice, location, status } =
    property || {};


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
              <span
                className={`px-2 py-1 text-center rounded-full text-white text-xs font-semibold
                      ${
                        status === "verified"
                          ? "bg-green-500"
                          : status === "rejected"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
              >
                {status}
              </span>
            </div>
          </div>
        </div>

        {status === "verified" ? (
          <Link
            state={{ status }}
            to={`/DetailsPage/${_id}`}
            className="btn bg-[#064d57] text-white"
          >
            details
          </Link>
        ) : status === "pending" ? (
          <p className="btn text-yellow-500">pending</p>
        ) : status === "rejected" ? (
          <p className="btn text-red-500">rejected</p>
        ) : null}
      </div>
    </div>

  );
};

