import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { useLocation } from "react-router";
import CheckoutForm from "./CheckoutForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);

const PaymentPage = () => {
  const location = useLocation();
  const data = location.state || {};

  console.log('mi',data);

  const {
    propertyTitle,
    location: Location,
    agentName,
    offerAmount,
    propertyImage,
    pending,
  } = data || {};




  return (
    <div>
      <div className="card w-4/6 mx-auto bg-base-100 mt-10 shadow-sm">
        <div>
          <figure>
            <img src={propertyImage} alt={propertyTitle} />
          </figure>
        </div>
        <div className="card-body text-center">
          {/* Text Right */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900">
              {propertyTitle || "No Title"}
            </h3>
            <p className="text-sm md:text-base text-gray-600 mb-1">
              <strong>Location:</strong> {Location || "Unknown"}
            </p>
            <p className="text-sm md:text-base text-gray-600 mb-1">
              <strong>Agent:</strong> {agentName || "Unknown"}
            </p>
            <p className="text-sm mb-2 md:text-base font-semibold text-green-600">
              Offer Amount: ${offerAmount?.toLocaleString() || "N/A"}
            </p>
            {/* Verification Status */}
            <p
              className={`text-sm font-semibold ${
                pending ? "text-green-600" : "text-yellow-500"
              }`}
            >
              {pending ? " Verified" : " Pending"}
            </p>
          </div>
          {/* Stripe CheckOut form */}
          <Elements stripe={stripePromise}>
            <CheckoutForm data={data} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
