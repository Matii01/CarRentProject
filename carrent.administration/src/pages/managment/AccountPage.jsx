import { useEffect, useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import ChangePassword from "../../components/Account/ChangePassword";

function AccountPage() {
  return (
    <Container>
      <Row>
        <Col xl="5">
          <ChangePassword />
        </Col>
      </Row>
    </Container>
  );
}

export default AccountPage;
