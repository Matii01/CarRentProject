import { useLocation } from "react-router-dom";

function RentalConfirmation() {
  const loaction = useLocation();
  const rentalDetails = loaction.state?.details;
  console.log("rental data = " + rentalDetails);

  return <p>Your rental was added = {rentalDetails.totalCost}</p>;
}
export default RentalConfirmation;

/*carName
: 
"Skoda Fabia IV"
clientName
: 
"Adam Testowy"
dateFrom
: 
"2023-11-05T00:00:00"
dateTo
: 
"2023-11-06T00:00:00"
totalCost
: 
150 */
