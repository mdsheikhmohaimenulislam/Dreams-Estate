import { useEffect, useState } from "react";
import { PropertyCard } from "./PropertyCard";

const NewPropertiesSection = () => {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/new-properties`
        );
        const data = await res.json();
        setAllData(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="mt-20 w-11/12 mx-auto ">
        <h1 className="text-4xl font-bold mb-8 text-center">New Properties</h1>
        <div className="grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4 gap-5">
          {allData.map((item) => (
            <PropertyCard key={item._id} property={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewPropertiesSection;
