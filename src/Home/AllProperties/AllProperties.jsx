import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import SingleCard from "./SingleCard";

const fetchProperties = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/properties`);
  if (!res.ok) throw new Error("Failed to fetch properties");
  return res.json();
};

const AllProperties = () => {
  const { data: properties = [], isLoading, isError, error } = useQuery({
    queryKey: ["properties"],
    queryFn: fetchProperties,
  });

  useEffect(() => {
    document.title = "All Properties";
  }, []);

  if (isLoading) return <p className="text-center py-10">Loading properties...</p>;
  if (isError) return <p className="text-red-500 py-10 text-center">{error.message}</p>;

  return (
    <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-20">
      {properties.map((property) => (
        <SingleCard key={property._id} property={property} />
      ))}
    </div>
  );
};

export default AllProperties;
