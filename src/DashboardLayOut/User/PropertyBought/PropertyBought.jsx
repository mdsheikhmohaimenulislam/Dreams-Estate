import axios from "axios";
import React, { useEffect, useState } from "react";
import BoughtSingleCard from "./BoughtSingleCard";
import useAuth from "../../../hooks/useAuth";

const PropertyBought = () => {
  const [property, setProperties] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.email) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/makeOffer/${user.email}`
        );
        setProperties(res.data);
      } catch (err) {
        console.error("Error fetching bought properties:", err);
      }
    };

    fetchData();
  }, [user?.email]);

  return (
    <div>
      {property.length === 0 ? (
        <p>No bought properties yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {property.map((data) => (
            <BoughtSingleCard key={data._id} data={data} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyBought;
