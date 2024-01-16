import Modal from "react-bootstrap/Modal";
import { Button, Row, Col, Form } from "react-bootstrap";
import { useState } from "react";
import styles from "./../../components/Table/Table.module.css";
import jwtInterceptor from "../../utils/jwtInterceptor";

function ChangeRentalStatusModal({ onHide, items, rentalStauses, ...props }) {
  return (
    <>
      <Modal
        onHide={onHide}
        {...props}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
        style={{ top: "50", height: "90%" }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Aktualizuj statusy
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <table className={`${styles.table}`}>
                <thead>
                  <tr>
                    <th></th>
                    <th>Samochód</th>
                    <th>Rabat</th>
                    <th>Cena</th>
                    <th>Status</th>
                    <th>Akcja</th>
                  </tr>
                </thead>
                <tbody>
                  {items &&
                    items.map((it, key) => (
                      <ChangeIndividualRentalStatus
                        key={key}
                        it={it}
                        rentalStauses={rentalStauses}
                      />
                    ))}
                </tbody>
              </table>
            </Col>
          </Row>
          <Row className="mt-5"></Row>
        </Modal.Body>
      </Modal>
    </>
  );
}

function ChangeIndividualRentalStatus({ it, rentalStauses }) {
  const [oldStatus, setOldStatus] = useState(it.rental.rentalStatusId);
  const [selectedStatusId, setSelectedStatusId] = useState(
    it.rental.rentalStatusId
  );

  const handleChange = (event) => {
    setSelectedStatusId(event.target.value);
  };

  const onSaveClick = () => {
    if (oldStatus != selectedStatusId) {
      updateStatus();
    }
  };

  const updateStatus = () => {
    const data = {
      oldStatus: oldStatus,
      newStatus: selectedStatusId,
    };

    jwtInterceptor
      .post(
        `Rental/UpdateRentalStatus/${it.rental.rentalId}`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <tr>
        <td>
          <img src={it.rental.carImage} style={{ maxWidth: 150 }} />
        </td>
        <td>{it.rental.carName}</td>
        <td>{it.rabat}</td>
        <td>{it.gross}</td>
        <td>
          <Form className="p-3">
            <Form.Group>
              <Form.Select value={selectedStatusId} onChange={handleChange}>
                {rentalStauses &&
                  rentalStauses.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.status}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </td>
        <td>
          <Button onClick={onSaveClick}>Zatwierdź</Button>
        </td>
      </tr>
    </>
  );
}

export default ChangeRentalStatusModal;
