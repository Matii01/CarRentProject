import { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import axiosInstance from "../../utils/axiosConfig";

function NotificationDetails({ item, onGoBack, onMessageRead }) {
  useEffect(() => {
    readMessage();
  }, [item]);

  const readMessage = () => {
    axiosInstance
      .post(`Notification/read/${item.id}`)
      .then((data) => {
        console.log(data);
        onMessageRead(item.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
