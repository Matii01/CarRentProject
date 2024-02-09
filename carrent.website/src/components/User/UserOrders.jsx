import { useEffect, useState } from "react";
import UserRentalList from "./UserRentalList";
import UserRentalDetails from "./UserRentalDetails";
import axiosInstance from "../../utils/axiosConfig";
import transformObjectToQueryString from "../../utils/transformObjectToQuery";
import { Row } from "react-bootstrap";
import CarPagination from "../Pagination/CarPagination";

function UserOrders() {
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [rentalDetailData, setRentalDetailData] = useState({});
  const [rentalList, setRentalList] = useState([]);
  const [metaData, setMetaData] = useState({});
  const [filterInfo, setFilterInfo] = useState({
    PageNumber: 1,
    PageSize: 10,
  });

  useEffect(() => {
    const queryString = transformObjectToQueryString(filterInfo);
    setIsLoading(true);
    axiosInstance
      .get(`rental/UserRental?${queryString}`)
      .then((data) => {
        console.log(data.data);
        setMetaData(data.data.metaData);
        setRentalList(data.data.items);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [filterInfo.PageNumber, filterInfo.PageSize]);

  const getRentalDetails = (id) => {
    setIsLoading(true);

    axiosInstance
      .get(`rental/UserRental/${id}`)
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

  const onPageChange = (num) => {
    setFilterInfo((prev) => ({
      ...prev,
      PageNumber: num,
    }));
  };

  return (
    <>
      <UserRentalList
        items={rentalList}
        onDetailsClick={onDetailsClick}
        hidden={showDetails}
        isLoading={isLoading}
        metaData={metaData}
        onPageChange={onPageChange}
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
