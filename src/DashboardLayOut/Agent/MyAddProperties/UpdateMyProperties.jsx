import React, { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast, Bounce } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../api/utils";

const UpdateMyProperties = ({ handleUpdateProperty, property }) => {
  const { title, location, _id, image: oldImage,MinimumPrice,MaximumPrice } = property || {};
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const modalRef = useRef();

  const [uploadedImage, setUploadedImage] = useState(oldImage || "");
  const [imageUploadError, setImageUploadError] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const { mutate: updateProperty, isLoading: isUpdating } = useMutation({
    mutationFn: async ({ id, updatedProperty }) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/properties/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedProperty),
        }
      );
      const data = await res.json();
      if (data.modifiedCount <= 0) throw new Error("Update failed");
      return updatedProperty;
    },
    onSuccess: (data) => {
      toast.success("Property updated successfully!", {
        position: "top-right",
        autoClose: 1500,
        transition: Bounce,
      });
      window.location.reload();
      handleUpdateProperty?.(data);

      queryClient.invalidateQueries({
        queryKey: ["myProperties"],
        refetchType: "active",
      });
      modalRef.current?.close();
      // Optionally force reload page or re-fetch other data here if needed
      // window.location.reload(); // Uncomment if you want full page reload
    },
    onError: () => {
      toast.error("Failed to update property");
    },
  });

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;
    setIsUploadingImage(true);
    setImageUploadError(null);

    try {
      const url = await imageUpload(image);
      setUploadedImage(url);
      setImageUploadError(null);
    } catch (err) {
      console.error(err);
      setImageUploadError("Image upload failed! Please try again.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    // Prevent submit if image is uploading or upload failed
    if (isUploadingImage) {
      toast.warn("Please wait for the image to finish uploading.");
      return;
    }
    if (!uploadedImage) {
      toast.error("Please upload an image before submitting.");
      return;
    }
    if (imageUploadError) {
      toast.error("Please fix the image upload error before submitting.");

      return;
    }

    const form = e.target;
    const updatedProperty = {
      title: form.title.value,
      location: form.location.value,
      image: uploadedImage,
      agent: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
      updatedAt: new Date().toISOString(),
    };

    updateProperty({ id: _id, updatedProperty });
  };

  return (
    <div>
      <button
        className="px-4 py-1 rounded bg-green-500 text-white "
        onClick={() => modalRef.current?.showModal()}
      >
        Update
      </button>

      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <form onSubmit={handleUpdate} className="space-y-4">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Property Image
              </label>
              <div className="flex items-center gap-5">
                <label
                  className={`bg-[#064d57] text-white px-3 py-1 rounded-md cursor-pointer hover:bg-[#053d45] ${
                    isUploadingImage ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <input
                    onChange={handleImageUpload}
                    type="file"
                    accept="image/*"
                    hidden
                    disabled={isUploadingImage}
                  />
                  {isUploadingImage ? "Uploading..." : "Upload"}
                </label>
                {uploadedImage && (
                  <img
                    src={uploadedImage}
                    alt="Preview"
                    className="w-24 rounded border"
                  />
                )}
              </div>
              {imageUploadError && (
                <p className="text-red-500 text-sm mt-1">{imageUploadError}</p>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="block font-medium">Title</label>
              <input
                type="text"
                name="title"
                defaultValue={title}
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block font-medium">Location</label>
              <input
                type="text"
                name="location"
                defaultValue={location}
                className="input input-bordered w-full"
                required
              />
            </div>
            {/* maxPrice */}
            <div>
              <label className="block font-medium">maxPrice</label>
              <input
                type="text"
                name="MaximumPrice"
                defaultValue={MaximumPrice}
                className="input input-bordered w-full"
                required
              />
            </div>
            {/* maxPrice */}
            <div>
              <label className="block font-medium">maxPrice</label>
              <input
                type="text"
                name="MinimumPrice"
                defaultValue={MinimumPrice}
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Agent Info */}
            <div>
              <label className="block font-medium">Agent Name</label>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>
            <div>
              <label className="block font-medium">Agent Email</label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>

            {/* Buttons */}
            <div className="modal-action">
              <button
                type="submit"
                className="btn bg-[#004d56] text-white"
                disabled={isUpdating || isUploadingImage}
              >
                {isUpdating
                  ? "Updating..."
                  : isUploadingImage
                  ? "Uploading Image..."
                  : "Update Property"}
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => modalRef.current?.close()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default UpdateMyProperties;
