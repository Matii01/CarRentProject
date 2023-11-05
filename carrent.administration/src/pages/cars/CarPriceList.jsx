import { useParams } from "react-router";

function CarPriceList() {
  const param = useParams();

  return (
    <>
      <p>Price list for car: {param.carId}</p>
    </>
  );
}

export default CarPriceList;
