import { Button, Card, Col, ListGroup, Row, Table } from "react-bootstrap";

function UserRentalDetails({ onGoBackClick, rentalDetail }) {
  const formatDate = (date) => {
    return date.slice(0, 10);
  };

  return (
    <>
      <Card>
        <Card.Header className="cardHeader">
          <Button variant="outline-light" size="sm" onClick={onGoBackClick}>
            Go back
          </Button>
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
          <Col className="text-center">
            <Button className="customButton w-50">Invoice</Button>
          </Col>
        </Card.Body>
      </Card>
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
