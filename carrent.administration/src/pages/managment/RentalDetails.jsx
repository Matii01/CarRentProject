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
import CancelRental from "../../components/RentalsManagment/CancelRentalModal";
import UpdateRentalStatus from "../../components/RentalsManagment/UpdateRentalStatus";
import ChangeRentalStatusModal from "../../components/RentalsManagment/ChangeRentalStatusModel";

function RentalDetails() {
  const param = useParams();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCancelModal, setCancelModal] = useState(false);
  const [showChangeRentalStatus, setShowChangeRentalStatus] = useState(false);
  const [carReplacement, setCarReplacement] = useState(false);
  const [statuses, setStatuses] = useState([]);
  const [data, setData] = useState({});

  useEffect(() => {
    getRentalData();
    getStatuses();
  }, []);

  const getStatuses = () => {
    jwtInterceptor
      .get(`Rental/statuses`)
      .then((data) => {
        console.log(data.data);
        setStatuses(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      case "cancel":
        setCancelModal(true);
        break;
      default:
        console.log("incorect");
        break;
    }
  };

  const onChangeCar = (rentalId, carId) => {
    setShowConfirmModal(true);
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

  const onUpdateRentalClick = () => {
    console.log("click");
    setShowChangeRentalStatus(true);
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
                </Link>
              </Col>
              <Col xs="auto">
                <Link title="Zwrot" id="t-1">
                  <i className="fa-solid fa-arrows-turn-right"></i>
                </Link>
              </Col>
              <Col xs="auto">
                <Form.Select
                  aria-label="Default select example"
                  onChange={onSelect}
                >
                  <option>Więcej</option>
                  <option value="replacement">Wymiana</option>
                  <option value="cancel">Anuluj</option>
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
              {data.invoiceIndividual && (
                <UpdateRentalStatus
                  statuses={statuses}
                  invoiceId={data.invoiceIndividual.id}
                  invoiceStatusId={data.invoiceIndividual.invoiceStatusId}
                  rentalId={param.rentalId}
                  onUpdateRentalClick={onUpdateRentalClick}
                />
              )}
              {data.invoiceFirm && (
                <UpdateRentalStatus
                  statuses={statuses}
                  invoiceId={data.invoiceFirm.id}
                  invoiceStatusId={data.invoiceFirm.invoiceStatusId}
                  rentalId={param.rentalId}
                  onUpdateRentalClick={onUpdateRentalClick}
                />
              )}
            </Row>
          </Col>
        </Row>
      </Container>
      <CancelRental
        rentalId={param.rentalId}
        show={showCancelModal}
        onHide={() => setCancelModal(false)}
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

      {data.invoiceFirm && (
        <ChangeRentalStatusModal
          items={data.invoiceFirm.invoiceItems}
          show={showChangeRentalStatus}
          onHide={() => setShowChangeRentalStatus(false)}
          rentalStauses={statuses.rentalStatus}
        />
      )}
      {data.invoiceIndividual && (
        <ChangeRentalStatusModal
          items={data.invoiceIndividual.invoiceItems}
          show={showChangeRentalStatus}
          onHide={() => setShowChangeRentalStatus(false)}
          rentalStauses={statuses.rentalStatus}
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

/**
 <Form.Group className="mb-3" controlId="formGroupPassword">
  <Form.Label>Realizacja</Form.Label>
  <Form.Select defaultValue="Choose...">
    <option>Wydany klientowi</option>
    <option>Zakończona</option>
  </Form.Select>
</Form.Group> 
*/
