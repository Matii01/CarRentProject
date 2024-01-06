import { useEffect } from "react";
import { useParams } from "react-router";
import jwtInterceptor from "../../utils/jwtInterceptor";
import { Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import CarInfoTable from "../../components/Table/CarInfoTable";
import styles from "./../../components/Table/Table.module.css";

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

  const items = [
    { id: 1, name: "name1", make: "make1" },
    { id: 2, name: "name2", make: "make2" },
    { id: 3, name: "name3", make: "make3" },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Container>
        <Row>
          <Col>Szczegóły {param.rentalId}</Col>
          <Col>
            <Row className="d-flex justify-content-end">
              <Col xs="auto">print</Col>
              <Col xs="auto">refaund</Col>
              <Col xs="auto">more actions</Col>
            </Row>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col xl={8} className="me-2">
            <Row>
              <Card>
                <Card.Body>
                  <table className={`${styles.table}`}>
                    <thead>
                      <tr>
                        <th> </th>
                        <th>Samochód</th>
                        <th>Marka</th>
                        <th>Rabat</th>
                        <th>Cena</th>
                        <th>Całkowita</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <img
                            src="https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_640.jpg"
                            style={{ maxWidth: 150 }}
                          />
                        </td>
                        <td>Skoda favia IV</td>
                        <td>Skoda</td>
                        <td>0</td>
                        <td>2500</td>
                        <td>2500</td>
                      </tr>
                      <tr>
                        <td>
                          <img
                            src="https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_640.jpg"
                            style={{ maxWidth: 150 }}
                          />
                        </td>
                        <td>Skoda favia IV</td>
                        <td>Skoda</td>
                        <td>0</td>
                        <td>2500</td>
                        <td>2500</td>
                      </tr>
                    </tbody>
                  </table>
                </Card.Body>
              </Card>
            </Row>
            <Row>
              <Col>
                <Card>
                  <Card.Header>Dane klienta</Card.Header>
                  <Card.Body>
                    <Row>
                      <Col>Adam Nijaki</Col>
                    </Row>
                    <Row>
                      <Col>795 Folsom Ave, Suite 600</Col>
                    </Row>
                    <Row>
                      <Col>San Francisco, CA 94107</Col>
                    </Row>
                    <Row>
                      <Col>P: (123) 456-7890</Col>
                    </Row>
                    <Row>
                      <Col>M: (+01) 12345 67890</Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Header>Dane Płatności</Card.Header>
                  <Card.Body>
                    <Row>
                      <Col>Payment Type: </Col>
                      <Col>Credit Card</Col>
                    </Row>
                    <Row>
                      <Col>Provider: </Col>
                      <Col>Visa ending in 2851</Col>
                    </Row>
                    <Row>
                      <Col>Valid Date: </Col>
                      <Col>02/2020</Col>
                    </Row>
                    <Row>
                      <Col>CVV: </Col>
                      <Col>xxx</Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Card>
                <Card.Header>Podsumowanie</Card.Header>
                <Card.Body>
                  <Row>
                    <Col>Items subtotal :</Col>
                    <Col className="d-flex justify-content-end">150</Col>
                  </Row>
                  <Row>
                    <Col>Tax :</Col>
                    <Col className="d-flex justify-content-end">150</Col>
                  </Row>
                  <Row>
                    <Col>Subtotal :</Col>
                    <Col className="d-flex justify-content-end">150</Col>
                  </Row>
                  <Row>
                    <Col>Shipping Cost:</Col>
                    <Col className="d-flex justify-content-end">150</Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col>Total: </Col>
                    <Col className="d-flex justify-content-end">150</Col>
                  </Row>
                </Card.Body>
              </Card>
            </Row>
            <Row>
              <Card>
                <Card.Header>Status</Card.Header>
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Label>Płatność</Form.Label>
                      <Form.Select defaultValue="Choose...">
                        <option>Zapłacono</option>
                        <option>Anulowana</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                      <Form.Label>Realizacja</Form.Label>
                      <Form.Select defaultValue="Choose...">
                        <option>Wydany klientowi</option>
                        <option>Zakończona</option>
                      </Form.Select>
                    </Form.Group>
                    <Button variant="dark" type="submit">
                      Aktualizuj statusy
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default RentalDetails;

/* 
 <CarInfoTable
    thead={["id", "name", "make", ""]}
    item={["id", "name", "make"]}
    items={items}
    searchTerm={""}
  />
*/

/* 
<Col>
            <Card>
              <Card.Header>Szczegóły wynajmu</Card.Header>
              <Card.Body>
                <Row>
                  <Col>Od : xx-xx-xxxx</Col>
                </Row>
                <Row>
                  <Col>Do : xx-xx-xxxx</Col>
                </Row>
                <Row className="mt-2">
                  <Col>Status: Zakończono</Col>
                </Row>
                <ListGroup variant="flush" className="mt-5">
                  <ListGroup.Item>Od </ListGroup.Item>
                  <ListGroup.Item>Do </ListGroup.Item>
                  <ListGroup.Item>Płatność</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
*/
