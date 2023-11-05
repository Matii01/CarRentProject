import { useParams } from "react-router";
import { NavLink } from "react-router-dom";

function CarDetails() {
  const param = useParams();
  return (
    <>
      <p>Car details for {param.carId}</p>
      <NavLink to={`pricelist`}>Cennik</NavLink>
    </>
  );
}

export default CarDetails;
