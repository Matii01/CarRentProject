import { useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import NotificationDetails from "./NotificationDetails";
import transformObjectToQueryString from "../../utils/transformObjectToQuery";
import CarPagination from "../Pagination/CarPagination";
import {
  useGetNotificationQuery,
  useReadNotificationMutation,
} from "../../api/userApi";

function UserNotification() {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [params, setParams] = useState({
    PageNumber: 1,
    PageSize: 10,
    CreatedStart: " ",
    CreatedEnd: "",
    IsRead: true,
  });

  const [readNotification, result] = useReadNotificationMutation();
  const { data, error, isLoading, refetch } = useGetNotificationQuery(
    transformObjectToQueryString(params)
  );

  const doubleClick = (it) => {
    setSelectedItem(it);
    setShowDetails(true);
  };

  const toggleView = () => {
    setParams((prev) => ({
      ...prev,
      IsRead: !params.IsRead,
    }));
  };

  const onPageChange = (num) => {
    setParams((prev) => ({
      ...prev,
      PageNumber: num,
    }));
  };

  const onGoBackClick = () => {
    if (selectedItem.isRead === false) {
      readNotification(selectedItem.id).then(() => {
        refetch();
      });
    }
    setShowDetails(false);
  };

  if (isLoading) {
    return <>Loading...</>;
  }

  const items = data.items;
  const metaData = data.metaData;

  return (
    <>
      <>
        {!showDetails && (
          <Card>
            <Card.Header className="cardHeader">
              <Row>
                <Col>Notification</Col>
                <Col className="d-flex justify-content-end">
                  <Button
                    className="customButton me-2"
                    size="sm"
                    onClick={toggleView}
                  >
                    {!params.IsRead && "New"}
                    {params.IsRead && "Old"}
                  </Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Table>
                <thead>
                  <tr>
                    <th>id</th>
                    <th>Title</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {items &&
                    items.map((it) => (
                      <tr key={it.id} onDoubleClick={() => doubleClick(it)}>
                        <td>{it.id}</td>
                        <td>{it.title}</td>
                        <td>{it.createdDate}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Card.Body>
            <Row>
              <Col className="ms-2">
                <CarPagination
                  paginationData={metaData}
                  pageChange={onPageChange}
                  size="md"
                />
              </Col>
            </Row>
          </Card>
        )}
        {showDetails && (
          <NotificationDetails item={selectedItem} onGoBack={onGoBackClick} />
        )}
      </>
    </>
  );
}

export default UserNotification;
