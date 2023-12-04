import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import styles from "./../../components/Table/Table.module.css";

function RentalsList() {
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

    axios
      .get(`https://localhost:7091/Rental/AllRentals?${queryString}`)
      .then((data) => {
        setItems(data.data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [filterInfo.PageNumber, filterInfo.PageSize]);

  if (!items.items) {
    return <p>"Loading"</p>;
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <table className={`${styles.table}`}>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Klient</th>
                      <th>Samochód</th>
                      <th>Od</th>
                      <th>Do</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.items.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.carName}</td>
                        <td>{item.rentalStart}</td>
                        <td>{item.rentalEnd}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default RentalsList;
