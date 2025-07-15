import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import MySoldTableBody from "./MySoldTableBody";

const fetchSoldProperties = async (email) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/makeOffer`, {
    params: { buyerEmail: email },  // use the parameter 'email'
  });
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
    queryKey: ["order", user?.email],
    queryFn: () => fetchSoldProperties(user.email),
    enabled: !!user?.email,
  });

  if (isLoading) return <p className="text-center">Loading sold properties...</p>;
  if (isError) return <p className="text-red-500 text-center">Error: {error.message}</p>;

console.log(soldProperties);


  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">My Sold Properties</h2>
      {soldProperties.length === 0 ? (
        <p className="text-center">No properties sold yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th>Property Title</th>
                <th>Location</th>
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
