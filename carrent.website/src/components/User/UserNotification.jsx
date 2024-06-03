import { useEffect, useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import NotificationDetails from "./NotificationDetails";
import axiosInstance from "../../utils/axiosConfig";
import transformObjectToQueryString from "../../utils/transformObjectToQuery";
import CarPagination from "../Pagination/CarPagination";

function UserNotification() {
  const [items, setItems] = useState([]);
  const [metaData, setMetaData] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [params, setParams] = useState({
    PageNumber: 1,
    PageSize: 10,
    CreatedStart: " ",
    CreatedEnd: "",
    IsRead: true,
  });

  useEffect(() => {
    const queryString = transformObjectToQueryString(params);
    axiosInstance
      .get(`Notification/myNotification?${queryString}`)
      .then((data) => {
        transformAndSetItems(data.data.items);
        setMetaData(data.data.metaData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.IsRead, params.PageNumber, params.PageSize]);

  const transformAndSetItems = (items) => {
    const transformed = items.map((it) => ({
      ...it,
      createdDate: formDate(it.createdDate),
    }));
    setItems(transformed);
  };

  const formDate = (data) => {
    return data.slice(0, 10);
  };

  const doubleClick = (it) => {
    setSelectedItem(it);
    setShowDetails(true);
  };

  const removeItem = (id) => {
    if (params.IsRead === false) {
      const list = items.filter((it) => it.id != id);
      setItems(list);
    }
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
                    {params.IsRead && "New"}
                    {!params.IsRead && "Old"}
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
          <NotificationDetails
            item={selectedItem}
            onGoBack={() => setShowDetails(false)}
            onMessageRead={removeItem}
          />
        )}
      </>
    </>
  );
}

export default UserNotification;

/*
import { useEffect, useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import NotificationDetails from "./NotificationDetails";
import axiosInstance from "../../utils/axiosConfig";
import transformObjectToQueryString from "../../utils/transformObjectToQuery";
import CarPagination from "../Pagination/CarPagination";

function UserNotification() {
  const [items, setItems] = useState([]);
  const [metaData, setMetaData] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [params, setParams] = useState({
    PageNumber: 1,
    PageSize: 10,
    CreatedStart: " ",
    CreatedEnd: "",
    IsRead: true,
  });

  useEffect(() => {
    const queryString = transformObjectToQueryString(params);
    axiosInstance
      .get(`Notification/myNotification?${queryString}`)
      .then((data) => {
        transformAndSetItems(data.data.items);
        setMetaData(data.data.metaData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.IsRead, params.PageNumber, params.PageSize]);

  const transformAndSetItems = (items) => {
    const transformed = items.map((it) => ({
      ...it,
      createdDate: formDate(it.createdDate),
    }));
    setItems(transformed);
  };

  const formDate = (data) => {
    return data.slice(0, 10);
  };

  const doubleClick = (it) => {
    setSelectedItem(it);
    setShowDetails(true);
  };

  const removeItem = (id) => {
    if (params.IsRead === false) {
      const list = items.filter((it) => it.id != id);
      setItems(list);
    }
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
                    {params.IsRead && "New"}
                    {!params.IsRead && "Old"}
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
          <NotificationDetails
            item={selectedItem}
            onGoBack={() => setShowDetails(false)}
            onMessageRead={removeItem}
          />
        )}
      </>
    </>
  );
}

export default UserNotification;

*/
