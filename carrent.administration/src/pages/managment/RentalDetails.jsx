import { useEffect, useState } from "react";
import { useParams } from "react-router";
import jwtInterceptor from "../../utils/jwtInterceptor";
import { Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import styles from "./../../components/Table/Table.module.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import MyVerticallyCenteredModal from "../../components/Modals/MyVerticallyCenteredModal";
import PaymentSummary from "../../components/RentalsManagment/PaymentSummary";
import IndividualClientData from "../../components/RentalsManagment/IndividualClientData";
import FirmClientData from "../../components/RentalsManagment/FirmClientData";

function RentalDetails() {
  const param = useParams();
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    getRentalData();
  }, []);

  const getRentalData = () => {
    jwtInterceptor
      .get(`Rental/${param.rentalId}`)
      .then((data) => {
        console.log(data.data);
        setData(data.data);
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

  const printTooltip = (props) => <Tooltip {...props}>Drukuj</Tooltip>;

  const Link = ({ id, children, title }) => (
    <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
      {children}
    </OverlayTrigger>
  );

  return (
    <>
      <Container>
        <Row>
          <Col>Szczegóły {param.rentalId}</Col>
          <Col>
            <Button variant="primary" onClick={() => setModalShow(true)}>
              Launch vertically centered modal
            </Button>
          </Col>
          <Col>
            <Row className="d-flex justify-content-end">
              <Col xs="auto">
                <Link title="Drukuj" id="t-1">
                  <i className="fa-solid fa-print"></i>
                </Link>{" "}
              </Col>
              <Col xs="auto">
                <Link title="Zwrot" id="t-1">
                  <i className="fa-solid fa-arrows-turn-right"></i>
                </Link>{" "}
              </Col>
              <Col xs="auto">
                <Form.Select aria-label="Default select example">
                  <option>Więcej</option>
                  <option value="1">Wymiana</option>
                  <option value="2">Two</option>
                </Form.Select>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col xl={8} className="me-2">
            <Row>
              {data.invoiceIndividual && (
                <RentalDetailsTable
                  items={data.invoiceIndividual.invoiceItems}
                />
              )}
              {data.invoiceFirm && (
                <RentalDetailsTable items={data.invoiceFirm.invoiceItems} />
              )}
            </Row>
            <Row>
              <Col>
                {data.invoiceIndividual && (
                  <IndividualClientData
                    client={data.invoiceIndividual.client}
                  />
                )}
                {data.invoiceFirm && (
                  <FirmClientData client={data.invoiceFirm.client} />
                )}
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
              {data.invoiceIndividual && (
                <PaymentSummary
                  invoiceItems={data.invoiceIndividual.invoiceItems}
                />
              )}
              {data.invoiceFirm && (
                <PaymentSummary invoiceItems={data.invoiceFirm.invoiceItems} />
              )}
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
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </Container>
    </>
  );
}

export default RentalDetails;

function RentalDetailsTable({ items }) {
  return (
    <>
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
              {items.map((it, key) => (
                <tr key={key}>
                  <td>
                    <img src={it.rental.carImage} style={{ maxWidth: 150 }} />
                  </td>
                  <td>{it.rental.carName}</td>
                  <td>{it.rental.carMark}</td>
                  <td>{it.rabat}</td>
                  <td>{it.gross}</td>
                  <td>{it.gross}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card.Body>
      </Card>
    </>
  );
}

function PaymentData() {
  return (
    <>
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
    </>
  );
}
