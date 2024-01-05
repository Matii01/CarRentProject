import { useEffect } from "react";
import { useParams } from "react-router";
import jwtInterceptor from "../../utils/jwtInterceptor";

function RentalDetails() {
  const param = useParams();

  useEffect(() => {
    getRentalData();
  }, []);

  const getRentalData = () => {
    jwtInterceptor
      .get(`Rental/${param.rentalId}`)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return <>Details rental {param.rentalId} </>;
}

export default RentalDetails;
