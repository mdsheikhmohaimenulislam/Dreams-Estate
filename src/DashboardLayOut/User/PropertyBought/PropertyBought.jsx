import axios from "axios";
import React, { useEffect, useState } from "react";
import BoughtSingleCard from "./BoughtSingleCard";

const PropertyBought = () => {
const [property, setProperties]= useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/makeOffer`
      );
      setProperties(res.data);
      // optionally: setState(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  fetchData(); // 
  //  call inside useEffect, outside try
}, []);

// console.log(property);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {
            property.map(data => <BoughtSingleCard key={data._id} data={data}/>)
        }
      </div>
    </div>
  );
};

export default PropertyBought;
