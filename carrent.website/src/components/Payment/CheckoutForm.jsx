import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  CardElement,
} from "@stripe/react-stripe-js";
import { Button } from "react-bootstrap";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("click");

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const cardElemet = elements.getElement(CardElement);
    const { clientSecret } = await fetch(
      "https://localhost:7091/Payment/NewPayment",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(allRentalData), // Amount in cents
      }
    ).then((r) => r.json());

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElemet,
      },
    });

    if (result.error) {
      setError(result.error.message);
      console.log(result.error.message);
    } else {
      setPaymentIntentId(result.paymentIntent.id);
      // Show a success message or update the UI
    }
  };

  return (
    // <form onSubmit={handleSubmit}>
    <>
      <CardElement />
      <Button type="submit" disabled={!stripe}>
        Pay
      </Button>
      {error && <div>{error}</div>}
      {paymentIntentId && <div>Payment Successful: {paymentIntentId}</div>}
    </>
    // </form>
  );
};

export default CheckoutForm;
