import { useEffect, useState } from "react";
import { useParams } from "react-router";
import fetchData from "../../functions/fetchData";
import styles from "./../../components/Table/Table.module.css";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

function CarPriceList() {
  const [priceList, setPriceList] = useState();
  const param = useParams();

  useEffect(() => {
    fetchData(`https://localhost:7091/CarPriceList/${param.carId}`)
      .then((data) => {
        setPriceList(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!priceList) {
    return <p>Loading ... </p>;
  }

  return (
    <>
      <Container>
        <Row>
          <Col md={6}>
            <Card className="" style={{ marginTop: "0px" }}>
              <Card.Header>
                <Row>
                  <Col className="text-center">
                    <p>Cenniki</p>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <table
                  className={`${styles.table}`}
                  style={{ fontSize: "14px" }}
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Data od</th>
                      <th>Data do</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceList.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.dateFrom}</td>
                        <td>{item.dateTo}</td>
                        <td>
                          <Button size="sm">Delete</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}></Col>
        </Row>
      </Container>
    </>
  );
}

export default CarPriceList;
