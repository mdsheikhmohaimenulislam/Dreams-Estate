import React from "react";

const ManagePropertiesBody = ({ data, handleUpdateStatus }) => {
  const { title, location, status, MaximumPrice, MinimumPrice, _id } =
    data || {};

  return (
    <>
      <tr>
        <td>{title}</td>
        <td>{location}</td>
        <td>{data?.agent?.name}</td>
        <td>{data?.agent?.email}</td>
        <td>
          Max: {MaximumPrice}$ Min: {MinimumPrice}$
        </td>

        {/* Status Cell */}
        <td>
          <span
            className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${
              status === "verified"
                ? "bg-green-500"
                : status === "rejected"
                ? "bg-red-500"
                : "bg-yellow-500"
            }`}
          >
            {status}
          </span>
        </td>
        {/* Action Buttons */}
        <td>
          {status === "pending" && (
            <div className="flex gap-2">
              <button
                className="btn btn-sm bg-green-500 text-white"
                onClick={() => handleUpdateStatus(_id, "verified")}
              >
                verified
              </button>
              <button
                className="btn btn-sm bg-red-500 text-white "
                onClick={() => handleUpdateStatus(_id, "rejected")}
              >
                rejected
              </button>
            </div>
          )}
        </td>
      </tr>
    </>
  );
};

export default ManagePropertiesBody;
