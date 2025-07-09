import React, { useEffect, useState } from "react";
import SingleCard from "./SingleCard";

const AllProperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/properties`);
        const data = await res.json();
        setProperties(data);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      }
    };

    fetchProperties();
    document.title = "All Properties";
  }, []);


//   console.log(properties);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 ">
        {properties.map((property) => (
          <SingleCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default AllProperties;
