import axios from "axios";
import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Wishlist = ({ id, property }) => {
  const { user } = useAuth();
  const [isAdded, setIsAdded] = useState(false);

  console.log(property);
  const handleAddToWishlist = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to add this property to your wishlist?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/wishlist`, {
        userEmail: user?.email,
        propertyImage: property?.image,
        propertyName: property?.title,
        propertyLocation: property?.location,
        agentName: property?.agent.name,
        agentImage: property?.agent.image,
        MaximumPrice: property?.MaximumPrice,
        MinimumPrice: property?.MinimumPrice,
        propertyId: id,
      });

      console.log("Wishlist added:", res.data);

      Swal.fire("Added successfully");
      setIsAdded(true); // disable button now
    } catch (err) {
      console.error(err);
      const message = err?.response?.data?.message
        ? err.response.data.message
        : err.message || "Already added!";
      toast.error(message);
    }
  };

  return (
    <div className="flex">
      <button
        disabled={isAdded}
        onClick={handleAddToWishlist}
        className="btn cursor-pointer bg-[#004d56] text-white ml-2"
      >
        ❤️ Add to Wishlist
      </button>
    </div>
  );
};

export default Wishlist;
