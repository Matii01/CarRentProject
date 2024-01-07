import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function MyVerticallyCenteredModal(props) {
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Large Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>...</Modal.Body>
      </Modal>
    </>
  );
}

export default MyVerticallyCenteredModal;
