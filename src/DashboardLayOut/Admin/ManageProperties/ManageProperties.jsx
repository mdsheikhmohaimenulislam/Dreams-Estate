import React, { useEffect, useState } from "react";
import ManagePropertiesBody from "./ManagePropertiesBody";
import { axiosSecure } from "../../../hooks/useAxiosSecure";

const ManageProperties = () => {
  const [property, setProperty] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/properties`
      );
      setProperty(res.data);
    };
    fetchProperties();
  }, []);





const handleUpdateStatus = async (id, status) => {
  try {
    await axiosSecure.patch(`${import.meta.env.VITE_API_URL}/properties/${id}`, {
      status,
    });

    // update state with new status
    setProperty((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, status } : item
      )
    );
  } catch (err) {
    console.error("Failed to update status:", err);
  }
};

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>property title</th>
              <th>Property location</th>
              <th>Agent name</th>
              <th>agent email</th>
              <th>price range</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {property.map((data, index) => (
              <ManagePropertiesBody
                key={index}
                data={data}
                handleUpdateStatus={handleUpdateStatus}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProperties;
