import Modal from "react-bootstrap/Modal";
import styles from "./../../components/Table/Table.module.css";
import { Button, Row, Col, Form } from "react-bootstrap";
import { useState } from "react";
import transformObjectToQueryString from "./../../utils/transformObjectToQuery";
import jwtInterceptor from "../../utils/jwtInterceptor";

function CancelRental({ show, onHide, rentalId, ...props }) {
  const onCancelRental = () => {
    console.log("anuluj: " + rentalId);

    //onHide();
  };

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Anulowanie wypożyczenia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} style={{ height: 100 }} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Powrót
          </Button>
          <Button variant="primary" onClick={onCancelRental}>
            Anuluj wypożyczenie
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CancelRental;
