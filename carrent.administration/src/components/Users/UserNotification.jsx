import { useEffect, useState } from "react";
import jwtInterceptor from "../../utils/jwtInterceptor";
import transformObjectToQueryString from "../../utils/transformObjectToQuery";
import { Card, Row, Col, Button } from "react-bootstrap";
import TableWithPagination from "../Table/TableWithPagination";
import AddNotificationForUser from "./AddNotificationForUser";
import { formatDate } from "../../utils/formDate";

function UserNotification({ userId }) {
  const [showAddNotification, setShowAddNotification] = useState(false);
  const [metaData, setMetaData] = useState([]);
  const [items, setItems] = useState([]);
  const [filtrs, setFiltrs] = useState({
    PageNumber: 1,
    PageSize: 10,
    UserId: userId,
    CreatedStart: null,
    CreatedEnd: null,
    IsRead: null,
  });

  useEffect(() => {
    setFiltrs((prev) => ({
      ...prev,
      UserId: userId,
    }));
  }, [userId]);

  useEffect(() => {
    getFilteredItems();
  }, [filtrs.PageNumber, filtrs.PageSize, filtrs.UserId]);

  const getFilteredItems = () => {
    const queryString = transformObjectToQueryString(filtrs);
    jwtInterceptor
      .get(`Notification/all?${queryString}`)
      .then((data) => {
        console.log(data.data);
        setMetaData(data.data.metaData);
        //setItems(data.data.items);
        transformAndSetItems(data.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const transformAndSetItems = (items) => {
    const transform = items.map((it) => ({
      ...it,
      isRead: it.isRead === true ? "tak" : "nie",
      createdDate: formatDate(it.createdDate),
    }));
    setItems(transform);
  };

  const handlePageChange = (num) => {
    setFiltrs((prev) => ({
      ...prev,
      PageNumber: num,
    }));
  };

  const handlePageSizeChange = (event) => {
    const { value } = event.target;
    setFiltrs((prev) => ({
      ...prev,
      PageSize: value,
    }));
  };

  const handleRowDoubleClick = (id) => {
    //const item = items.find((x) => x.id == id);
    //setSelectedItem(item);
  };

  const onNotificationAdd = () => {
    getFilteredItems();
  };

  const toogleAddNotification = () => {
    setShowAddNotification(!showAddNotification);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Row>
            <Col>
              <Button
                className="w-75"
                variant="dark"
                size="sm"
                onClick={toogleAddNotification}
              >
                {!showAddNotification && "Dodaj nowe powiadomienie +"}
                {showAddNotification && "Ukryj"}
              </Button>
              {showAddNotification && (
                <AddNotificationForUser
                  userId={userId}
                  onAdd={onNotificationAdd}
                />
              )}
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <TableWithPagination
                thead={["ID", "Tytuł", "Data dodania", "Odczytano"]}
                items={items}
                searchTerm={""}
                item={["id", "title", "createdDate", "isRead"]}
                metaData={metaData}
                onDoubleClick={handleRowDoubleClick}
                handlePageChange={handlePageChange}
                handlePageSizeChange={handlePageSizeChange}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default UserNotification;

{
  /* 
<Row>
    <Col>
        <Button>Dodaj powiadomienie</Button>
    </Col>
    <Col>{showAddNotification && <AddNotificationForUser />}</Col>
</Row> */
}
