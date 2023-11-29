import axios from "axios";
import { useEffect } from "react";
import {
  Card,
  Col,
  Container,
  ListGroup,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import { useParams } from "react-router";

function UserDetail() {
  const param = useParams();

  useEffect(() => {
    axios
      .get(
        `https://localhost:7091/Users/userDetails?userName=${param.userName}`
      )
      .then((data) => {
        console.log(data);
        //setUsersList(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>Personal Info</ListGroup.Item>
                <ListGroup.Item>Adres</ListGroup.Item>
                <ListGroup.Item>Wypożyczenia</ListGroup.Item>
                <ListGroup.Item>Prywatność</ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}

export default UserDetail;

/*
 <Tabs
        defaultActiveKey="profile"
        id="justify-tab-example"
        className="mb-3"
        justify
    >
        <Tab eventKey="home" title="Profil">
        Tab content for Profile
        </Tab>
        <Tab eventKey="profile" title="Adres">
        Tab content for Adres
        </Tab>
        <Tab eventKey="longer-tab" title="Wypożczenia">
        Tab content for Orders
        </Tab>
        <Tab eventKey="contact" title="Reset Hasła">
        Tab content for password
        </Tab>
    </Tabs> 
*/
