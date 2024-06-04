import { Button, Card } from "react-bootstrap";

function NotificationDetails({ item, onGoBack }) {
  return (
    <>
      <Card>
        <Card.Header>
          <Button onClick={onGoBack} className="customButton">
            GoBack
          </Button>
        </Card.Header>
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Card.Text>{item.message}</Card.Text>
        </Card.Body>
        <Card.Footer>Wysłano: {item.createdDate}</Card.Footer>
      </Card>
    </>
  );
}

export default NotificationDetails;
