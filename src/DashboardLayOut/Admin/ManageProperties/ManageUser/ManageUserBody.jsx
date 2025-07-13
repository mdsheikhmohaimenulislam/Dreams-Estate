import React from "react";

const ManageUserBody = ({user}) => {
  return (
    <>
      <tr className="text-center border border-gray-300">
        <td className="border border-gray-300 p-2">{user.name || "-"}</td>
        <td className="border border-gray-300 p-2">{user.email}</td>
        <td className="border border-gray-300 space-y-2 p-2 space-x-2">
          {user.roll === "fraud" ? (
            <span className="text-red-600  font-bold">Fraud</span>
          ) : (
            <>
              <button
                //   onClick={() => updateUserRole(user._id, "admin")}
                disabled={user.roll === "admin"}
                className={`px-2 py-1 rounded bg-green-500  text-white ${
                  user.roll === "admin" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                Make Admin
              </button>
              <button
                //   onClick={() => updateUserRole(user._id, "agent")}
                disabled={user.roll === "agent"}
                className={`px-2 py-1 rounded bg-blue-500  text-white ${
                  user.roll === "agent" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                Make Agent
              </button>

              {/* Show Mark as Fraud button only if user is agent */}
              {user.roll === "agent" && (
                <button
                  // onClick={() => markAsFraud(user._id)}
                  className="px-2 py-1 rounded cursor-pointer bg-red-600 text-white"
                >
                  Mark as Fraud
                </button>
              )}
            </>
          )}

          <button
            //   onClick={() => deleteUser(user._id)}
            className="px-2 py-1 rounded bg-gray-700 cursor-pointer text-white"
          >
            Delete User
          </button>
        </td>
      </tr>
    </>
  );
};

export default ManageUserBody;
