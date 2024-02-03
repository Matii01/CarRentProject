import { useEffect, useState } from "react";
import { Modal, Button, Image, Row, Col } from "react-bootstrap";

function AdditionalImgModal(props) {
  const [selectedImg, setSelectedImg] = useState(0);

  const onNext = () => {
    let newIndex = selectedImg + 1;
    if (newIndex >= props.imgs.length) {
      newIndex = 0;
    }
    setSelectedImg(newIndex);
  };
  const onPrev = () => {
    let newIndex = selectedImg - 1;
    if (newIndex < 0) {
      newIndex = props.imgs.length - 1;
    }
    setSelectedImg(newIndex);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="m-0 p-0" style={{ height: "90%" }}>
        <Image
          className="w-100"
          style={{ height: "75vh" }}
          src={props.imgs[selectedImg]}
        />
      </Modal.Body>
      <Modal.Footer>
        <Row>
          <Col>
            <Button className="customButton" onClick={onPrev}>
              Prev
            </Button>
          </Col>
          <Col>
            <Button className="customButton" onClick={onNext}>
              Next
            </Button>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
}

export default AdditionalImgModal;
