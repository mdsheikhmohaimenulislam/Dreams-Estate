import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import WishCard from "./WishCard";

const UserWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.email) return; // Skip fetch if no user

    const fetchWishlist = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/wishlist/${user.email}`
        );
        const data = await res.json();
        setWishlist(data);
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      }
    };
    document.title = "Wishlist";
    fetchWishlist();
  }, [user?.email]);

  const handleRemove = (id) => {
    setWishlist((prev) => prev.filter((wish) => wish._id !== id));
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5 mt-20">
        {wishlist.map((wish) => (
          <WishCard key={wish._id} wish={wish} handleRemove={handleRemove} />
        ))}
      </div>
    </div>
  );
};

export default UserWishlist;
