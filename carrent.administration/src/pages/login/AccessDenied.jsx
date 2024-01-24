import { Row, Col, Container, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router";

function AccessDenied() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const url =
    "https://firebasestorage.googleapis.com/v0/b/car-rental-7fc22.appspot.com/o/car-login.jpg?alt=media&token=0bee9f6d-4e32-4eab-9289-e650ba1fedcc";

  //#f7f7f8
  return (
    <div style={{ width: "100%", height: "100vh", backgroundColor: "#f7f7f8" }}>
      <Container
        className="pt-4 pb-4"
        style={{ width: "58rem", backgroundColor: "" }}
      >
        <Card className="p-4">
          <Row>
            <Col
              xs={12}
              md={6}
              className="d-flex justify-content-center align-items-center"
            >
              <div>
                <Row>
                  <p style={{ fontSize: 22, color: "red" }}>Odmowa dostępu</p>
                </Row>
                <Row>
                  <Button
                    variant="dark"
                    type="button"
                    className=""
                    onClick={goToLogin}
                  >
                    Login
                  </Button>
                </Row>
              </div>
            </Col>
            <Col className="mt-4 mb-4">
              <Card.Img src={url} />
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
}

export default AccessDenied;
