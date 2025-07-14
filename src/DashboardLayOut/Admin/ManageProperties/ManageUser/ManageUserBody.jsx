import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const ManageUserBody = ({ user, queryClient ,handleDeleted,isDeleting }) => {
  const axiosSecure = useAxiosSecure();

  const { mutate } = useMutation({
    mutationFn: async (newRole) => {
      const { data } = await axiosSecure.patch(`/user/roll/${user.email}`, {
        roll: newRole,
      });
      return data;
    },
    onSuccess: (data) => {
      if (data) {
        toast.success(`User Role Update Successfully Done.`);
        // invalidate query
        queryClient.invalidateQueries(['user'])
      }
    },
    onError: (err) => {
      console.error("Failed to update role:", err);
    },
  });

  const updateUserRole = (newRole) => {
    mutate(newRole); //  using destructured mutate
  };

  return (
    <tr className="text-center border border-gray-300">
      <td className="border border-gray-300 p-2">{user?.name || "-"}</td>
      <td className="border border-gray-300 p-2">{user?.email}</td>
      <td className="border border-gray-300 p-2">{user?.roll}</td>
      <td className="border border-gray-300 p-2">
        <span
          className={
            user?.status === "verified" ? "text-green-500" : "text-red-500"
          }
        >
          {user?.status === "verified" ? "Verified" : "Unavailable"}
        </span>
      </td>
      <td className="border border-gray-300 space-y-2 p-2 space-x-2">
        {user?.roll === "fraud" ? (
          <span className="text-red-600 font-bold">Fraud</span>
        ) : (
          <>
            <button
              onClick={() => updateUserRole("admin")}
              disabled={user?.roll === "admin"}
              className={`px-2 py-1 rounded bg-green-500 text-white ${
                user?.roll === "admin" ? "opacity-50 cursor-not-allowed" : " cursor-pointer"
              }`}
            >
              Make Admin
            </button>
            <button
              onClick={() => updateUserRole("agent")}
              disabled={user?.roll === "agent"}
              className={`px-2 py-1 rounded bg-blue-500 text-white ${
                user?.roll === "agent" ? "opacity-50 cursor-not-allowed" : " cursor-pointer"
              }`}
            >
              Make Agent
            </button>

            {user?.roll === "agent" && (
              <button
                onClick={() => updateUserRole("fraud")}
                className="px-2 py-1 rounded bg-red-600 text-white cursor-pointer"
              >
                Mark as Fraud
              </button>
            )}
          </>
        )}

        <button
          onClick={() => handleDeleted(user._id)}
          disabled={isDeleting}
          className="btn bg-black text-white"
        >
          {isDeleting ? "Deleting..." : "Delete User"}
        </button>
      </td>
    </tr>
  );
};

export default ManageUserBody;
