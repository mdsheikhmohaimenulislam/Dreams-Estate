import { BsFingerprint } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
// import { GrUserAdmin } from "react-icons/gr";
import MenuItem from "./MenuItem";
// import { useState } from "react";
// import BecomeSellerModal from "../../../Modal/BecomeSellerModal";
const UserMenu = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const closeModal = () => {
//     setIsOpen(false);
//   };

  return (
    <>
      
      <MenuItem icon={FaHeart} label="Wishlist" address="wishlist" />
      <MenuItem icon={FaHome} label="Property bought" address="PropertyBought" />
      <MenuItem icon={MdRateReview} label="My reviews" address="myReviews" />










{/* lost */}
      {/* <div
        // onClick={() => setIsOpen(true)}
        className="flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer"
      >
        <GrUserAdmin className="w-5 h-5" />

        <span className="mx-4 font-medium">Become A Seller</span>
      </div> */}

      {/* <BecomeSellerModal closeModal={closeModal} isOpen={isOpen} /> */}
    </>
  );
};

export default UserMenu;
