import { useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import AddCarOpinion from "./AddCarOpinion";
import axiosInstance from "../../utils/axiosConfig";
import { saveAs } from "file-saver";

function UserRentalDetails({ onGoBackClick, rentalDetail }) {
  const [showAddOpinion, setShowAddOpinion] = useState(false);
  const formatDate = (date) => {
    return date.slice(0, 10);
  };

  const handleDownload = async () => {
    try {
      const response = await axiosInstance.get(
        `https://localhost:7091/Rental/getInvoiceDocument/${rentalDetail.id}`,
        {
          responseType: "blob", // Important to handle binary data properly
        }
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      saveAs(blob, "document.docx");
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  return (
    <>
      <Card>
        <Card.Header className="cardHeader">
          <Row>
            <Col>
              <Button variant="outline-light" size="sm" onClick={onGoBackClick}>
                Go back
              </Button>
            </Col>
            <Col className="d-flex justify-content-end p-1 me-2">
              <Button
                variant="link"
                style={{ color: "white" }}
                onClick={handleDownload}
              >
                <i className="fa-solid fa-file-invoice"></i>
              </Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Card.Text>{rentalDetail.carName}</Card.Text>
          <Card.Img variant="top" src={rentalDetail.carImg} />
          <Row></Row>
        </Card.Body>
        {/* <ListGroup className="list-group-flush">
          <ListGroup.Item>
            {formatDate(rentalDetail.rentalStart)}
          </ListGroup.Item>
          <ListGroup.Item>{formatDate(rentalDetail.rentalEnd)}</ListGroup.Item>
          <ListGroup.Item>{rentalDetail.status}</ListGroup.Item>
          <ListGroup.Item>{rentalDetail.totalPrice}</ListGroup.Item>
        </ListGroup> */}
        <Table className="text-center">
          <tbody>
            <tr>
              <td>From</td>
              <td>{formatDate(rentalDetail.rentalStart)}</td>
            </tr>
            <tr>
              <td>To</td>
              <td>{formatDate(rentalDetail.rentalEnd)}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{rentalDetail.status}</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>{rentalDetail.totalPrice}</td>
            </tr>
          </tbody>
        </Table>
        <Card.Body>
          <Row>
            <Col className="text-center">
              <Button className="customButton w-50">Invoice</Button>
            </Col>
            <Col className="text-center">
              <Button
                className="customButton w-50"
                onClick={() => setShowAddOpinion(true)}
              >
                Your opinion{" "}
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {showAddOpinion && (
        <AddCarOpinion
          carId={rentalDetail.carId}
          className="mt-4"
          onCancel={() => setShowAddOpinion(false)}
        />
      )}
    </>
  );
}

export default UserRentalDetails;

/* 
<Card.Body className="p-4">
    <Row>
    <Col>From</Col>
    <Col className="text-end">{rentalDetail.rentalStart}</Col>
    </Row>
    <Row>
    <Col>To</Col>
    <Col className="text-end">{rentalDetail.rentalEnd}</Col>
    </Row>
    <Row>
    <Col>Status</Col>
    <Col className="text-end">{rentalDetail.status}</Col>
    </Row>
    <Row>
    <Col>Price</Col>
    <Col className="text-end">{rentalDetail.totalPrice}</Col>
    </Row>
</Card.Body>
*/
