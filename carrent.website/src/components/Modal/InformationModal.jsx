import { Modal, Button, Row, Col } from "react-bootstrap";

function InformationModal({ show, onClose, infoText }) {
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="m-0 p-0" style={{ height: "90%" }}>
        <Row style={{ height: "50vh" }}>
          <Col
            className="d-flex justify-content-center align-items-center flex-column"
            style={{ fontSize: 25 }}
          >
            <Row>
              <Col>{infoText}</Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <Button className="customButton" onClick={onClose}>
                  OK
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default InformationModal;
