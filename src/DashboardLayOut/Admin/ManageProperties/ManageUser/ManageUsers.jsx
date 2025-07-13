import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../../../Components/Shared/LoadingSpinner";
import ManageUserBody from "./ManageUserBody";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  console.log(users);
  // users.forEach(user => console.log(user.roll));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
        setUsers(data.data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };
    fetchUsers();
  }, []);

  


  return (
    <div className="overflow-x-auto p-4">
      {users.length === 0 && <LoadingSpinner />}
      <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">User Name</th>
            <th className="border border-gray-300 p-2">User Email</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <ManageUserBody key={user._id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
