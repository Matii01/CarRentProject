import { useState } from "react";
import UserRentalList from "./UserRentalList";
import UserRentalDetails from "./UserRentalDetails";
import CardOverlay from "../Overlay/CardOverlay";
import transformObjectToQueryString from "../../utils/transformObjectToQuery";
import {
  useGetRentalDetailsQuery,
  useGetUserRentalsQuery,
} from "../../api/userApi";
import { Card } from "react-bootstrap";

function UserOrders() {
  const [showDetails, setShowDetails] = useState(false);
  const [fetchInfo, setFetchInfo] = useState({
    detailsId: 0,
    shouldFetch: false,
  });
  const [filterInfo, setFilterInfo] = useState({
    PageNumber: 1,
    PageSize: 10,
  });

  const { data, error, isLoading } = useGetUserRentalsQuery(
    transformObjectToQueryString(filterInfo)
  );

  const {
    data: rentalDetail,
    error: retailsError,
    isLoading: isRentalLoading,
  } = useGetRentalDetailsQuery(fetchInfo.detailsId, {
    skip: !fetchInfo.shouldFetch,
  });

  const onDetailsClick = (id) => {
    setFetchInfo({
      detailsId: id,
      shouldFetch: true,
    });
    setShowDetails(true);
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

  if (isLoading || isRentalLoading) {
    return (
      <>
        <Card className="h-100">
          <CardOverlay />
        </Card>
      </>
    );
  }

  const rentalList = data.items;
  const metaData = data.metaData;

  return (
    <>
      {!showDetails && (
        <UserRentalList
          items={rentalList}
          onDetailsClick={onDetailsClick}
          hidden={showDetails}
          isLoading={isLoading}
          metaData={metaData}
          onPageChange={onPageChange}
        />
      )}
      {showDetails && (
        <UserRentalDetails
          onGoBackClick={onGoBackClick}
          rentalDetail={rentalDetail}
        />
      )}
    </>
  );
}

export default UserOrders;
