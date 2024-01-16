import { Card, Row, Col, Button, Tabs, Tab } from "react-bootstrap";
import UserNotification from "./UserNotification";

function ManageUser({ user }) {
  return (
    <Card className="p-1">
      <Card.Header>Użytkownik</Card.Header>
      <Card.Body>
        <Tabs>
          <Tab eventKey="home" title="Home">
            Tab content for Home NotificationParameters
          </Tab>
          <Tab eventKey="notification" title="Notification">
            <UserNotification userId={user.id} />
          </Tab>
          <Tab eventKey="contact" title="Contact">
            Tab content for Contact
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  );
}

export default ManageUser;
