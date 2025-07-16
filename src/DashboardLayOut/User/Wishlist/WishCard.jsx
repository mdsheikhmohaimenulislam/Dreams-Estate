import { Link } from "react-router";
import WishRemove from "./WishRemove";

const WishCard = ({ wish, handleRemove}) => {
  const {
    MaximumPrice,
    MinimumPrice,
    agentImage,
    agentName,
    _id,
    createdAt,
    isVerified,
    propertyImage,
    propertyLocation,
    propertyName,
  } = wish || {};

  const convertDate = new Date(createdAt).toLocaleDateString();

// console.log(wish);
  
  return (
    <div>
      <div className="card bg-base-100 shadow-sm">
        <figure>
          <img src={propertyImage} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{propertyName}</h2>
          <p>{propertyLocation}</p>
          <p>{convertDate}</p>

          <div className="flex gap-4 text-sm text-gray-600">
            {/* <span>Max: ${MaximumPrice}</span>
        <span>Min: ${MinimumPrice}</span> */}
          </div>

          {/* agent section */}
          <div className="flex space-x-4">
            <img
              alt=""
              src={agentImage}
              className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500"
            />
            <div className="flex flex-col space-y-1">
              <a
                rel="noopener noreferrer"
                href="#"
                className="text-sm font-semibold"
              >
                {agentName}
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
          <div className="card-actions justify-end">
            <div className="flex gap-3 mt-2">
              <Link
              state={{ property: wish }}
               to={"/dashboard/offerPage"}
                className="btn rounded bg-[#004d56] text-white"
              >
                Make Offer
              </Link>
              <WishRemove id={_id} handleRemove={handleRemove} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishCard;
