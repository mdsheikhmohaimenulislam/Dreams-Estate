import React from "react";
import Swal from "sweetalert2";

const WishRemove = ({ handleRemove, id }) => {
  const deleted = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_URL}/wishlist/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your item has been deleted.",
                icon: "success",
              });

              // Update parent state to remove the deleted item
              handleRemove(id);
            } else {
              Swal.fire("Oops!", "Item not found or already deleted.", "info");
            }
          })
          .catch((err) => {
            Swal.fire("Error!", "Failed to delete item.", "error");
            console.error(err);
          });
      }
    });
  };

  return (
    <div>
      <button
        onClick={deleted}
        className="btn rounded  bg-red-500 text-white hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
};

export default WishRemove;
