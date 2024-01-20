import { Card, Row, Col, Button, Tabs, Tab } from "react-bootstrap";
import UserNotification from "./UserNotification";
import UserDetails from "./UserDetails";
import UserRabats from "./Userrabats";

function ManageUser({ user }) {
  return (
    <Card className="p-1">
      <Card.Header>Użytkownik</Card.Header>
      <Card.Body>
        <Tabs>
          <Tab eventKey="notification" title="Powiadomienia">
            <UserNotification userId={user.id} />
          </Tab>
          <Tab eventKey="info" title="Informacje">
            <UserDetails user={user} />
          </Tab>
          <Tab eventKey="rabats" title="Rabaty">
            <UserRabats userId={user.id} />
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  );
}

export default ManageUser;
