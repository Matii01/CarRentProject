import { Elements } from "@stripe/react-stripe-js";
import RentalDetail from "./RentalDetail";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51ORfB9CVslDt3sXBnA5naMHNVkFLkJ7NO0b6ZOsxgPRvizzp2qtLHvgqwgTVIDU5uk5DHy5gKDD0lmBEz4lQ5WS100g3zcYTo0"
);

function RentalPage() {
  return (
    <>
      <Elements stripe={stripePromise}>
        <RentalDetail />
      </Elements>
    </>
  );
}

export default RentalPage;