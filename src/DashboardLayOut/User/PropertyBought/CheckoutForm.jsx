import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { CircleLoader } from "react-spinners";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";

const CheckoutForm = ({ data: orderData }) => {
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const getClientSecret = async () => {
      const { data } = await axiosSecure.post("/create-paymentSecret", {
        price: orderData?.offerAmount,
        orderPropertyId: orderData?._id,
        agentEmail: orderData?.agentEmail,
      });

      setClientSecret(data?.clientSecret);
    };
    getClientSecret();
  }, [axiosSecure, orderData]);

const handleSubmit = async (event) => {
  event.preventDefault();
  setProcessing(true);
  setCardError(null);

  if (!stripe || !elements) return;

  const card = elements.getElement(CardElement);
  if (!card) return;

  const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
    type: "card",
    card,
    billing_details: {
      name: user?.displayName,
      email: user?.email,
    },
  });

  if (paymentMethodError) {
    setCardError(paymentMethodError.message);
    setProcessing(false);
    return;
  }

  const result = await stripe.confirmCardPayment(clientSecret, {
    payment_method: paymentMethod.id,
  });

  if (result.error) {
    setCardError(result.error.message);
    setProcessing(false);
    return;
  }

  if (result.paymentIntent.status === "succeeded") {
    const transactionId = result.paymentIntent.id;

    try {
      // ✅ Update offer status to 'bought' in makeOffer collection
      await axiosSecure.patch(`/makeOffer/payment-success/${orderData._id}`, {
        transactionId,
      });

      toast.success("Payment successful! Property marked as bought.");
    } catch (err) {
      console.error("Error updating offer:", err.response?.data || err.message);
      toast.error("Payment done, but failed to update offer status.");
    } finally {
      setProcessing(false);
    }
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {cardError && <p className="text-red-500 mb-6">{cardError}</p>}
      <button
        className="btn bg-green-500 w-full text-white"
        type="submit"
        disabled={!stripe || processing}
      >
        {processing ? <CircleLoader size={25} color="blue" /> : "Pay"}
      </button>
    </form>
  );
};

export default CheckoutForm;
