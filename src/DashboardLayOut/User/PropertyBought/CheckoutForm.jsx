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
      //Server request.....

      const { data } = await axiosSecure.post("/create-paymentSecret", {
        price: orderData?.offerAmount,
        orderPropertyId: orderData?._id,
      });

      setClientSecret(data?.clientSecret);
    };
    getClientSecret();
  }, [axiosSecure, orderData]);

  const handleSubmit = async (event) => {
    setProcessing(true);
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
      setProcessing(false);
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardError(null);
    }

    // Taka katar pala
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        },
      },
    });

if (result?.error) {
  setCardError(result.error.message);
  return;
}

if (result?.paymentIntent?.status === 'succeeded') {
  orderData.transactionId = result.paymentIntent.id;
  try {
    const { data } = await axiosSecure.post('/order', orderData);
    console.log(data);
    if (data?.insertedId) {
      toast.success('Order Placed Successfully!');
    }
  } catch (err) {
    console.log(err);
    toast.error('You have already added a parcel');
  } finally {
    setProcessing(false);
    setCardError(null);
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
