import { Card, Row, Col, DropdownDivider } from "react-bootstrap";

function UserDetails({ user }) {
  return (
    <Card>
      <Card.Body style={{ margin: 10 }}>
        <Row>
          <Col>Imie, Nazwisko</Col>
          <Col>
            {user.firstName} {user.lastName}
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>Login</Col>
          <Col>{user.userName}</Col>
        </Row>
        <hr />
        <Row>
          <Col>Email</Col>
          <Col>{user.email}</Col>
        </Row>
        <hr />
        <Row>
          <Col>Telefon</Col>
          <Col>{user.phoneNumber}</Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default UserDetails;
