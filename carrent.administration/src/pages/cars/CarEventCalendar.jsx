import { Button, Card, Col, Container, Row } from "react-bootstrap";
import styles from "./../../components/Table/Table.module.css";
import AddNewEvent from "../../components/CalendarEvent/AddNewEvent";
import { useState } from "react";

function CarEventCalendar() {
  const [showAddEvent, setShowAddEvent] = useState(false);
  const handleClick = () => {
    console.log("click");
  };

  const hide = () => {
    setShowAddEvent(false);
  };

  return (
    <>
      <Container>
        <Row className="mt-2 mb-2">
          <Col>
            <Button onClick={() => setShowAddEvent(true)}>Dodaj</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <table
                  className={`${styles.table}`}
                  style={{
                    fontSize: "12px",
                  }}
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nazwa</th>
                      <th>Data od</th>
                      <th>Data do</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>2</td>
                      <td>2</td>
                      <td>3</td>
                      <td>
                        <Button size="sm" onClick={() => handleClick()}>
                          Details
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Card.Body>
            </Card>
          </Col>
          {showAddEvent && (
            <Col md={4}>
              <AddNewEvent onCancel={hide} />
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
}

export default CarEventCalendar;
