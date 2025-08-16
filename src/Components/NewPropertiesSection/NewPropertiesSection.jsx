import React, { useEffect, useState } from "react";

const NewPropertiesSection = () => {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/new-properties`);
        const data = await res.json();
        setAllData(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchData();
  }, []);

  console.log(allData);

  return <div></div>;
};

export default NewPropertiesSection;
