import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import ChangePasword from "../../components/User/ChangePasword";
import ChangePersonalDetails from "../../components/User/ChangePersonalDetails";
import { useEffect, useState } from "react";
import ChangeAddress from "../../components/User/ChangeAddress";
import UserOrders from "../../components/User/UserOrders";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserWishList from "../../components/User/UserWishlist";
import UserNotification from "../../components/User/UserNotification";
import ShowRabat from "../../components/User/ShowRabat";

function UserPage() {
  const navigate = useNavigate();
  const [view, setView] = useState("PROFILE");
  const order = "ORDER";
  const profile = "PROFILE";
  const address = "ADDRESS";
  const wishlist = "WISHLIST";
  const notification = "NOTIFICATION";
  const rabats = "RABATS";
  const user = useSelector((state) => state.user);

  useEffect(() => {
    console.log(window.location.hash);
  }, []);

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

  if (view === wishlist) {
    selectedView = <UserWishList />;
  }

  if (view === notification) {
    selectedView = <UserNotification />;
  }

  if (view === rabats) {
    selectedView = <ShowRabat />;
  }

  const url =
    "https://firebasestorage.googleapis.com/v0/b/car-rental-7fc22.appspot.com/o/car-login.jpg?alt=media&token=0bee9f6d-4e32-4eab-9289-e650ba1fedcc";

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
                  src={url}
                  style={{ borderRadius: "50%", padding: "50px" }}
                />
                <Card.Body>
                  <Card.Title className="text-center"></Card.Title>
                  <Card.Text className="text-center"></Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item action onClick={() => changeView(order)}>
                    Orders
                  </ListGroup.Item>
                  <ListGroup.Item action onClick={() => changeView(wishlist)}>
                    Wishlist
                  </ListGroup.Item>
                  <ListGroup.Item action onClick={() => changeView(profile)}>
                    Profile
                  </ListGroup.Item>
                  <ListGroup.Item action onClick={() => changeView(address)}>
                    Address
                  </ListGroup.Item>
                  <ListGroup.Item
                    action
                    onClick={() => changeView(notification)}
                  >
                    Notification
                  </ListGroup.Item>
                  <ListGroup.Item action onClick={() => changeView(rabats)}>
                    Discount
                  </ListGroup.Item>
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
