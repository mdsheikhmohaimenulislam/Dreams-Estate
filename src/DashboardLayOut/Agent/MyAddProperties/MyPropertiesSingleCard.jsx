import { Link } from "react-router";
import UpdateMyProperties from "./UpdateMyProperties";

const MyPropertiesSingleCard = ({ handleDeleted, property }) => {
  const {
    image,
    title,
    location,
    _id,
    isVerified,
    MaximumPrice,

    MinimumPrice,
  } = property || {};

  const remove = (id) => {
    handleDeleted(id);
  };

  return (
    <div className="card bg-base-100 shadow-sm">
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
        <div className="flex space-x-4">
          <img
            alt=""
            src={property.agent.image}
            className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500"
          />
          <div className="flex flex-col space-y-1">
            <a
              rel="noopener noreferrer"
              href="#"
              className="text-sm font-semibold"
            >
              {property.agent.name}
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
            <UpdateMyProperties property={property} />

            {/* <Link
          to='update'
              className="px-4 py-1 rounded bg-[#064d57] text-white "
            >
              Update
            </Link> */}
            <button
              onClick={() => remove(_id)}
              className="px-4 py-1 rounded bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPropertiesSingleCard;
