import { useEffect, useState } from "react";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";
import EditFooterLinks from "./EditFooterLinks";
import { ToastContainer, toast } from "react-toastify";

function EditFooter() {
  const [validated, setValidated] = useState(false);
  const [page, setPage] = useState({
    title: "",
    info: "",
    description: "",
    newsLetterDescription: "",
    newsLetterInfo: "",
    newsLetterTitle: "",
    facebookLink: "",
    instagramLink: "",
    youTubeLink: "",
    tikTokLink: "",
    links: [],
  });

  useEffect(() => {
    jwtInterceptor
      .get("ContentManagement/footer")
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

    console.log(page);

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
      .post(`ContentManagement/editFooter`, JSON.stringify(page), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        if (data.status === 204) {
        }
        toast.success("Zapisano zmiany");
        setValidated(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onEditedLinks = () => {};

  return (
    <>
      <ToastContainer />
      <Container fluid>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edytuj Stopkę</Card.Title>
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
                        name="title"
                        value={page.title}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Wymagane
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                      <Form.Label>Opis </Form.Label>
                      <Form.Control
                        required
                        placeholder="Tytuł sekcji"
                        name="description"
                        value={page.description}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Wymagane
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                      <Form.Label>Instagram</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Link instagrama"
                        name="instagramLink"
                        value={page.instagramLink}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback>Wymagane</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                      <Form.Label>Facebook</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Facebook Link "
                        name="facebookLink"
                        value={page.facebookLink}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback>Wymagane</Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                      <Form.Label>YouTube</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="YouTube"
                        name="youTubeLink"
                        value={page.youTubeLink}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback>Wymagane</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                      <Form.Label>TikTok</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="TikTok"
                        name="tikTokLink"
                        value={page.tikTokLink}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback>Wymagane</Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                      <Form.Label>newsLetterTitle</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="newsLetterTitle"
                        name="newsLetterTitle"
                        value={page.newsLetterTitle}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback>Wymagane</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                      <Form.Label>newsLetterDescription</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="newsLetterDescription"
                        name="newsLetterDescription"
                        value={page.newsLetterDescription}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback>Wymagane</Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                      <Form.Label>newsLetterInfo</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Opis"
                        name="newsLetterInfo"
                        value={page.newsLetterInfo}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback>Wymagane</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                      <Form.Label>info</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="info"
                        name="info"
                        value={page.info}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback>Wymagane</Form.Control.Feedback>
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
        <Row>
          {page.links &&
            page.links.map((item, index) => (
              <Col key={index}>
                <EditFooterLinks links={item} onEdit={onEditedLinks} />
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
}

export default EditFooter;
