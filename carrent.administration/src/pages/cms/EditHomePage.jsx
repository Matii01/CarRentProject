import { useEffect, useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";

function EditHomePage() {
  const [validated, setValidated] = useState(false);
  const [page, setPage] = useState({
    homePageTitle: "",
    homePageImage: "",
    homePageTextOne: "",
    homePageTextTwo: "",
  });

  useEffect(() => {
    jwtInterceptor
      .get("ContentManagement/homePage")
      .then((data) => {
        console.log(data);
        setPage(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPage((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      editPage();
    }
    setValidated(true);
  };

  const editPage = () => {
    console.log("send data");
    jwtInterceptor
      .post(`ContentManagement/editHomePage`, JSON.stringify(page), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        if (data.status === 204) {
          setValidated(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Container fluid>
        <Row></Row>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edytuj Stronę Główną</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                      <Form.Label>Tytuł</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Tytuł"
                        name="homePageTitle"
                        value={page.homePageTitle}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Wymagane
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                      <Form.Label>Zdjęcie</Form.Label>
                      <Form.Control
                        required
                        placeholder="Tytuł sekcji"
                        name="homePageImage"
                        value={page.homePageImage}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Looks good!
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                      <Form.Label>Tekst 1</Form.Label>
                      <Form.Control
                        style={{ height: "100px" }}
                        as="textarea"
                        rows={4}
                        type="text"
                        name="homePageTextOne"
                        value={page.homePageTextOne}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                      <Form.Label>Tekst 2</Form.Label>
                      <Form.Control
                        style={{ height: "100px" }}
                        as="textarea"
                        rows={4}
                        type="text"
                        name="homePageTextTwo"
                        value={page.homePageTextTwo}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>

                  <Button variant="dark" type="submit">
                    Aktualizuj
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default EditHomePage;
