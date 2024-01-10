import { useEffect, useState } from "react";
import { useParams } from "react-router";
import jwtInterceptor from "../../utils/jwtInterceptor";
import {
  Card,
  Col,
  Container,
  Row,
  Form,
  Button,
  Modal,
} from "react-bootstrap";
import styles from "./../../components/Table/Table.module.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import MyVerticallyCenteredModal from "../../components/Modals/MyVerticallyCenteredModal";
import PaymentSummary from "../../components/RentalsManagment/PaymentSummary";
import IndividualClientData from "../../components/RentalsManagment/IndividualClientData";
import FirmClientData from "../../components/RentalsManagment/FirmClientData";
import CarReplacementModal from "../../components/RentalsManagment/CarReplacementModal";
import ConfirmOverlay from "../../components/Overlay/ConfirmOverlay";

function RentalDetails() {
  const param = useParams();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [carReplacement, setCarReplacement] = useState(false);
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

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const Link = ({ id, children, title }) => (
    <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
      {children}
    </OverlayTrigger>
  );

  const onSelect = (event) => {
    switch (event.target.value) {
      case "replacement":
        setCarReplacement(true);
        break;
      case "test":
        setModalShow(true);
        break;
      default:
        console.log("incorect");
        break;
    }
  };

  const onChangeCar = (rentalId, carId) => {
    setShowConfirmModal(true);

    //const Newasd = { RentalId: rentalId, NewCarId: carId }("Rental/replaceCar");

    jwtInterceptor
      .post(
        "Rental/replaceCar",
        JSON.stringify({ RentalId: rentalId, NewCarId: carId }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        getRentalData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Container style={{ position: "relative" }}>
        <Row>
          <Col>Szczegóły {param.rentalId}</Col>
          <Col></Col>
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
                <Form.Select
                  aria-label="Default select example"
                  onChange={onSelect}
                >
                  <option>Więcej</option>
                  <option value="replacement">Wymiana</option>
                  <option value="test">Two</option>
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
      </Container>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      {data.invoiceIndividual && (
        <CarReplacementModal
          items={data.invoiceIndividual.invoiceItems}
          show={carReplacement}
          onHide={() => setCarReplacement(false)}
          showConfirmModal={onChangeCar}
        />
      )}
      {data.invoiceFirm && (
        <CarReplacementModal
          items={data.invoiceFirm.invoiceItems}
          show={carReplacement}
          onHide={() => setCarReplacement(false)}
          showConfirmModal={onChangeCar}
        />
      )}
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
