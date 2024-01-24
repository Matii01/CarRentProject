import { useEffect, useState } from "react";
import jwtInterceptor from "../../utils/jwtInterceptor";
import { Card, Row, Form, Button, Col } from "react-bootstrap";
import { toast } from "react-toastify";

function ManageNewsletterSub({ item, hide, refreshView }) {
  const [isSub, setIsSub] = useState(false);

  useEffect(() => {
    if (item.isSubscribe === "true") {
      setIsSub(true);
    } else {
      setIsSub(false);
    }
  }, [item]);

  const handleChange = () => {};

  const onDelete = () => {
    jwtInterceptor
      .delete(`Newsletter/deleteSub/${item.id}`)
      .then((data) => {
        toast.success("Usunięto");
        refreshView();
        hide();
      })
      .catch((error) => {
        toast.error("Bład");
      });
  };

  const onCancelSub = () => {
    jwtInterceptor
      .post(`Newsletter/Unsubscribe/${item.id}`)
      .then((data) => {
        toast.success("Anulowano subskrybcję");
        setIsSub(false);
        refreshView();
      })
      .catch((error) => {
        toast.error("Bład");
      });
  };

  const onRenewSub = () => {
    jwtInterceptor
      .post(`Newsletter/RenewSubscribe/${item.id}`)
      .then((data) => {
        toast.success("Anulowano subskrybcję");
        refreshView();
        setIsSub(true);
      })
      .catch((error) => {
        toast.error("Bład");
      });
  };

  return (
    <Card className="p-3">
      <Card.Header>
        <Row>
          <Col>
            <Button variant="dark" size="sm" onClick={hide}>
              Zamknij
            </Button>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Form>
          <Row className="mb-3">
            <Form.Group>
              <Form.Label>Tyuł</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="tytuł"
                name="Title"
                value={item.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group>
              <Form.Label>Wysłano</Form.Label>
              <Form.Control
                type="text"
                placeholder="tytuł"
                name="Title"
                onChange={handleChange}
                value={item.subscribeDate}
              />
            </Form.Group>
          </Row>
        </Form>
      </Card.Body>
      <Card.Body>
        <Row>
          <Col>
            <Button variant="dark" size="sm" onClick={onDelete}>
              Usuń
            </Button>
          </Col>
          <Col>
            {isSub && (
              <Button variant="dark" size="sm" onClick={onCancelSub}>
                Anuluj subskrybcję
              </Button>
            )}
            {!isSub && (
              <Button variant="dark" size="sm" onClick={onRenewSub}>
                Odnów subskrybcję
              </Button>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default ManageNewsletterSub;
