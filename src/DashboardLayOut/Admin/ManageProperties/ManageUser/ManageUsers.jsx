import React, { useEffect } from "react";
import LoadingSpinner from "../../../../Components/Shared/LoadingSpinner";
import ManageUserBody from "./ManageUserBody";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosSecure } from "../../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import axios from "axios";

const ManageUsers = () => {
  const queryClient = useQueryClient();
  const { data: users, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users");
      return data;
    },
  onSuccess: () => {
     queryClient.invalidateQueries(['user']) // refresh the user list
  },
  });

  const handleDeleted = async (userId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/user/${userId}`);
      toast.success("User deleted successfully");
      // Refresh user list or update state
    } catch (err) {
      toast.error("Failed to delete user");
      console.error(err);
    }
  };

  useEffect(() => {
    document.title = "ManageUsers";
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (!users || users.length === 0) {
    return <p>No users found</p>;
  }
  return (
    <div className="overflow-x-auto p-4 overflow-scroll">
      {/* {users.length === 0 && <LoadingSpinner />} */}
      <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">User Name</th>
            <th className="border border-gray-300 p-2">User Email</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <ManageUserBody
              queryClient={queryClient}
              key={user._id}
              user={user}
              handleDeleted={handleDeleted}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
