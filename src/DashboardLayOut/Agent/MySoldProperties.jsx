import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import MySoldTableBody from "./MySoldTableBody";

const fetchSoldProperties = async (email) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/sold-properties/${email}`
  );
  return res.data;
};

const MySoldProperties = () => {
  const { user } = useAuth();

  const {
    data: soldProperties = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["soldProperties", user?.email],
    queryFn: () => fetchSoldProperties(user.email),
    enabled: !!user?.email, // only fetch when user.email is available
  });

  if (isLoading) return <p>Loading sold properties...</p>;
  if (isError) return <p>Error loading sold properties: {error.message}</p>;

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
              {soldProperties.map((soldProperty) => (
                <MySoldTableBody
                  key={soldProperty._id}
                  soldProperty={soldProperty}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MySoldProperties;
