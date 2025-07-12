import React from "react";
import { useLocation } from "react-router";
import useAuth from "../../../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const OfferPage = () => {
  const location = useLocation();
  const { property } = location.state || {};
  const { user } = useAuth();

  const {
    _id: propertyId,
    propertyName,
    propertyImage,
    propertyLocation,
    agentName,
    MinimumPrice,
    MaximumPrice,
  } = property;

  console.log(property);

  //  Always ensure correct price range
  const priceMin = Math.min(parseInt(MinimumPrice), parseInt(MaximumPrice));
  const priceMax = Math.max(parseInt(MinimumPrice), parseInt(MaximumPrice));

  const { mutate: submitOffer, isPending } = useMutation({
    mutationFn: async (offerData) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/makeOffer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(offerData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Offer submission failed");
      }

      return res.json();
    },
    onSuccess: () => {
      toast.success("Offer submitted successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const values = Object.fromEntries(formData);

    const offerAmount = Number(values.offer);
    if (offerAmount < priceMin || offerAmount > priceMax) {
      return toast.error(`Offer must be between ${priceMin} and ${priceMax}`);
    }

    const offerData = {
      propertyId,
      propertyImage,
      propertyTitle: propertyName,
      location: propertyLocation,
      agentName,
      agentEmail: property?.agentEmail,
      offerAmount,
      buyerEmail: user?.email,
      buyerName: user?.displayName,
      status: "pending",
      createdAt: new Date(),
    };

    submitOffer(offerData);
    form.reset();
  };

  return (
    <div>
      <div>
        <form
          onSubmit={handleForm}
          className="max-w-xl mx-auto mt-20 bg-white shadow p-6 rounded space-y-4"
        >
          <h2 className="text-xl font-bold mb-4">Submit Offer</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Property Name</label>
              <input
                type="text"
                name="property"
                defaultValue={propertyName}
                readOnly
                className="input input-bordered"
              />
            </div>
            <div>
              <label>Location</label>
              <input
                type="text"
                name="location"
                defaultValue={propertyLocation}
                readOnly
                className="input input-bordered"
              />
            </div>
            <div>
              <label>Agent Name</label>
              <input
                type="text"
                name="agentName"
                defaultValue={agentName}
                readOnly
                className="input input-bordered"
              />
            </div>
            <div>
              <label>Buyer Email</label>
              <input
                type="email"
                name="buyerEmail"
                defaultValue={user?.email}
                readOnly
                className="input input-bordered"
              />
            </div>
            <div>
              <label>Buyer Name</label>
              <input
                type="text"
                name="buyerName"
                defaultValue={user?.displayName}
                readOnly
                className="input input-bordered"
              />
            </div>
            <div>
              <label>Offer Amount</label>
              <input
                type="number"
                name="offer"
                placeholder={`Enter between ${priceMin} and ${priceMax}`}
                className="input input-bordered"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="btn bg-[#004d56] text-white w-full"
          >
            {isPending ? "Submitting..." : "Offer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OfferPage;
