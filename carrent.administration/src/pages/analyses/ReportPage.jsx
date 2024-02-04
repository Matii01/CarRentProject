import { Card, Container, Form, Row, Col, Button } from "react-bootstrap";

function ReportPage() {
  const onSubmit = () => {};
  return (
    <>
      <Container>
        <Row>
          <Card>
            <Card.Header></Card.Header>
            <Card.Body>
              <Form onSubmit={onSubmit}>
                <Row>
                  <Col xl={3} md={6}>
                    <Form.Group>
                      <Form.Label>State</Form.Label>
                      <Form.Select defaultValue="Choose...">
                        <option>Choose...</option>
                        <option>...</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col>
                    <Button className="me-2" size="sm">
                      Wykonaj
                    </Button>
                    <Button className="me-2" size="sm">
                      Generuj Excel
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Row>
        <Row></Row>
      </Container>
    </>
  );
}

export default ReportPage;
