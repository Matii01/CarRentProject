import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import styles from "./../../components/Table/Table.module.css";
import jwtInterceptor from "../../utils/jwtInterceptor";
import TablePagination from "../../components/Pagination/TablePagination";
import { useNavigate } from "react-router";

function RentalsList() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [filterInfo, setFilterInfo] = useState({
    PageNumber: 1,
    PageSize: 10,
  });

  useEffect(() => {
    const filteredParams = Object.keys(filterInfo).reduce((acc, key) => {
      if (filterInfo[key] !== null && filterInfo[key] !== undefined) {
        acc[key] = filterInfo[key];
      }
      return acc;
    }, {});

    const queryString = new URLSearchParams(filteredParams).toString();

    jwtInterceptor
      .get(`Rental/AllRentals?${queryString}`)
      .then((data) => {
        setItems(data.data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [filterInfo.PageNumber, filterInfo.PageSize]);

  const formatDate = (date) => {
    return date.slice(0, 10);
  };

  const onDoubleClik = (id) => {
    console.log(id);
    navigate(`details/${id}`);
  };

  const handlePageChange = (num) => {
    setFilterInfo((prev) => ({
      ...prev,
      PageNumber: num,
    }));
  };

  const handlePageSizeChange = (event) => {
    const { value } = event.target;
    setFilterInfo((prev) => ({
      ...prev,
      PageSize: value,
    }));
  };

  const addNewRental = () => {
    navigate(`/rental/new`);
  };

  if (!items.items) {
    return <p>"Loading"</p>;
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Button variant="dark" size="sm" onClick={addNewRental}>
              Nowe zamówienie
            </Button>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <Card>
              <Card.Body>
                <table className={`${styles.table}`}>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Klient</th>
                      <th>Samochód</th>
                      <th>Status</th>
                      <th>Od</th>
                      <th>Do</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.items.map((item) => (
                      <tr
                        key={item.id}
                        onDoubleClick={() => onDoubleClik(item.id)}
                      >
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.carName}</td>
                        <td>{item.status}</td>
                        <td>{formatDate(item.rentalStart)}</td>
                        <td>{formatDate(item.rentalEnd)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Row>
                  <Col className="mt-2 d-flex justify-content-start">
                    <Form>
                      <Form.Select
                        size="sm"
                        onChange={handlePageSizeChange}
                        defaultValue={10}
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={items.metaData.totalCount}>
                          Wszystkie
                        </option>
                      </Form.Select>
                    </Form>
                  </Col>
                  <Col className="mt-2 d-flex justify-content-end">
                    <TablePagination
                      paginationData={items.metaData}
                      pageChange={handlePageChange}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default RentalsList;
