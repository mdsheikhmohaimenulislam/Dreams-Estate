import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import MySoldTableBody from "./MySoldTableBody";

const MySoldProperties = () => {
  const { user } = useAuth(); // Logged-in agent
  const [soldProperties, setSoldProperties] = useState([]);

  useEffect(() => {
    const fetchSold = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/sold-properties/${user.email}`
        );
        setSoldProperties(res.data);
      } catch (error) {
        console.error("Error fetching sold properties:", error);
      }
    };

    if (user?.email) {
      fetchSold();
    }
  }, [user?.email]);

  console.log(soldProperties);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Sold Properties</h2>
      {soldProperties.length === 0 ? (
        <p>No properties sold yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Property Title</th>
                <th>Property Location</th>
                <th>Buyer Email</th>
                <th>Buyer Name</th>
                <th>Sold Price</th>
              </tr>
            </thead>
            <tbody>
              {soldProperties.map((soldProperty, index) => (
                <MySoldTableBody key={soldProperty._id || index} soldProperty={soldProperty} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MySoldProperties;
