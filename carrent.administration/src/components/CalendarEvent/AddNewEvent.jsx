import { useState } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import AddRent from "./AddRent";
import AddVehicleInspection from "./AddVehicleInspection";
import AddService from "./AddService";

function AddNewEvent({ onCancel }) {
  const [view, setView] = useState("");
  const RENT = "RENT";
  const VEHICLEINSPECTION = "VEHICLEINSPECTION";
  const SERVICE = "SERVICE";

  const setDefaultView = () => {
    setView("");
  };

  const handleClik = () => {
    onCancel();
  };

  const changeView = (view) => {
    setView(view);
  };

  let selectedView = (
    <ListGroup as="ul">
      <ListGroup.Item as="li" action onClick={() => changeView(RENT)}>
        Wynajem
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        action
        onClick={() => changeView(VEHICLEINSPECTION)}
      >
        Przegląd
      </ListGroup.Item>
      <ListGroup.Item as="li" action onClick={() => changeView(SERVICE)}>
        Serwis
      </ListGroup.Item>
    </ListGroup>
  );

  if (view === RENT) {
    selectedView = <AddRent />;
  }

  if (view === VEHICLEINSPECTION) {
    selectedView = <AddVehicleInspection />;
  }

  if (view === SERVICE) {
    selectedView = <AddService />;
  }

  return (
    <>
      <Card>
        <Card.Header>
          <Row>
            <Col>
              <Card.Title as="h5">Wybierz</Card.Title>
            </Col>
            <Col>
              <Button size="sm" onClick={handleClik}>
                Anuluj
              </Button>
            </Col>
            <Col>
              <Button size="sm" onClick={setDefaultView}>
                Back
              </Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>{selectedView}</Card.Body>
      </Card>
    </>
  );
}

export default AddNewEvent;
