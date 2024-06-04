import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import ChangePasword from "../../components/User/ChangePasword";
import ChangePersonalDetails from "../../components/User/ChangePersonalDetails";
import ChangeAddress from "../../components/User/ChangeAddress";
import UserOrders from "../../components/User/UserOrders";
import { useNavigate, useParams } from "react-router-dom";
import UserWishList from "../../components/User/UserWishlist";
import UserNotification from "../../components/User/UserNotification";
import ShowRabat from "../../components/User/ShowRabat";

function UserPage() {
  const navigate = useNavigate();
  const param = useParams();

  let selectedView = (
    <>
      <ChangePasword />
      <div className="m-4" />
      <ChangePersonalDetails />
    </>
  );

  switch (param.view) {
    case "address":
      selectedView = <ChangeAddress />;
      break;
    case "order":
      selectedView = <UserOrders />;
      break;
    case "wishlist":
      selectedView = <UserWishList />;
      break;
    case "notification":
      selectedView = <UserNotification />;
      break;
    case "discount":
      selectedView = <ShowRabat />;
      break;
    case "profile":
      selectedView = (
        <>
          <ChangePasword />
          <div className="m-4" />
          <ChangePersonalDetails />
        </>
      );
      break;
  }

  const url =
    "https://firebasestorage.googleapis.com/v0/b/car-rental-7fc22.appspot.com/o/car-login.jpg?alt=media&token=0bee9f6d-4e32-4eab-9289-e650ba1fedcc";

  return (
    <>
      <Container className="mt-5 mb-5" fluid="md">
        <Row>
          <Col lg={9}>{selectedView}</Col>
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
                  <ListGroup.Item
                    action
                    onClick={() => navigate("/user/order")}
                  >
                    Orders
                  </ListGroup.Item>
                  <ListGroup.Item
                    action
                    onClick={() => navigate("/user/wishlist")}
                  >
                    Wishlist
                  </ListGroup.Item>
                  <ListGroup.Item
                    action
                    onClick={() => navigate("/user/profile")}
                  >
                    Profile
                  </ListGroup.Item>
                  <ListGroup.Item
                    action
                    onClick={() => navigate("/user/address")}
                  >
                    Address
                  </ListGroup.Item>
                  <ListGroup.Item
                    action
                    onClick={() => navigate("/user/notification")}
                  >
                    Notification
                  </ListGroup.Item>
                  <ListGroup.Item
                    action
                    onClick={() => navigate("/user/discount")}
                  >
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
