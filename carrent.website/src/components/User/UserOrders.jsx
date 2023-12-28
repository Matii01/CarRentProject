import { useEffect, useState } from "react";
import UserRentalList from "./UserRentalList";
import UserRentalDetails from "./UserRentalDetails";
import axiosInstance from "../../utils/axiosConfig";

function UserOrders() {
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [rentalDetailData, setRentalDetailData] = useState({});
  const [rentalList, setRentalList] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axiosInstance
      .get(`https://localhost:7091/rental/UserRental`)
      .then((data) => {
        console.log(data.data);
        setRentalList(data.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const getRentalDetails = (id) => {
    setIsLoading(true);

    axiosInstance
      .get(`https://localhost:7091/rental/UserRental/${id}`)
      .then((response) => {
        console.log(response);
        setRentalDetailData(response.data);
        setShowDetails(true);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onDetailsClick = (id) => {
    getRentalDetails(id);
  };

  const onGoBackClick = () => {
    setShowDetails(false);
  };

  return (
    <>
      <UserRentalList
        items={rentalList}
        onDetailsClick={onDetailsClick}
        hidden={showDetails}
        isLoading={isLoading}
      />
      {showDetails && !isLoading && (
        <UserRentalDetails
          onGoBackClick={onGoBackClick}
          rentalDetail={rentalDetailData}
        />
      )}
    </>
  );
}

export default UserOrders;

/*
console.log("Waiting for 10 seconds...");
    setIsLoading(true);

    setTimeout(function () {
      // Place the code for the function you want to execute after 10 seconds here
      console.log("10 seconds have passed. Executing function.");
      setIsLoading(false);
      // Other function execution
    }, 10000); // 10000 milliseconds = 10 seconds
*/
