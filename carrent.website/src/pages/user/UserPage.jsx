import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import ChangePasword from "../../components/User/ChangePasword";
import ChangePersonalDetails from "../../components/User/ChangePersonalDetails";
import { useEffect, useState } from "react";
import ChangeAddress from "../../components/User/ChangeAddress";
import UserOrders from "../../components/User/UserOrders";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function UserPage() {
  const navigate = useNavigate();
  const [view, setView] = useState("PROFILE");
  const order = "ORDER";
  const profile = "PROFILE";
  const address = "ADDRESS";
  const user = useSelector((state) => state.user);

  useEffect(() => {
    console.log(user);
    if (!user.isLogin) {
      navigate("/login");
    }
  }, []);

  const changeView = (view) => {
    setView(view);
  };

  let selectedView = (
    <>
      <ChangePasword />
      <div className="m-4" />
      <ChangePersonalDetails />
    </>
  );

  if (view === address) {
    selectedView = (
      <>
        <ChangeAddress />
      </>
    );
  }

  if (view === order) {
    selectedView = (
      <>
        <UserOrders />
      </>
    );
  }

  return (
    <>
      <Container className="mt-5 mb-5" fluid="md">
        <Row>
          <Col lg={9}>
            {/* <ChangePasword />
            <div className="m-4" />
            <ChangePersonalDetails /> */}
            {selectedView}
          </Col>
          <Col lg={3}>
            <Container>
              <Card style={{ width: "18rem", backgroundColor: "#F8F9FA" }}>
                <Card.Img
                  variant="top"
                  src="https://sell-react-b5.vercel.app/img/photo/kyle-loftus-589739-unsplash-avatar.jpg"
                  style={{ borderRadius: "50%", padding: "50px" }}
                />
                <Card.Body>
                  <Card.Title className="text-center">Card Title</Card.Title>
                  <Card.Text className="text-center">
                    Some quick example text
                  </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item action onClick={() => changeView(order)}>
                    Orders
                  </ListGroup.Item>
                  <ListGroup.Item action onClick={() => changeView(profile)}>
                    Profile
                  </ListGroup.Item>
                  <ListGroup.Item action onClick={() => changeView(address)}>
                    Address
                  </ListGroup.Item>
                  <ListGroup.Item action>Logout</ListGroup.Item>
                </ListGroup>
              </Card>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UserPage;

/* <Row></Row>
              <Row>
                <ListGroup>
                  <ListGroup.Item>Cras justo odio</ListGroup.Item>
                  <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                  <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                  <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                  <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
              </Row> */
