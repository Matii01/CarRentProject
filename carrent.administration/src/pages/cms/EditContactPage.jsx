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

function EditContactPage() {
  const [validated, setValidated] = useState(false);
  const [page, setPage] = useState({
    addressDetails: "",
    addressIcon: "",
    addressTitle: "",
    contactSectionTitle: "",
    emailAddress: "",
    emailIcon: "",
    emailTitle: "",
    pageDescription: "",
    pageTitle: "",
    phoneDetails: "",
    phoneIcon: "",
    phoneNumber: "",
    phoneTitle: "",
    textRowOne: "",
    textRowTwo: "",
  });

  useEffect(() => {
    jwtInterceptor
      .get("ContentManagement/contact")
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
      .post(`ContentManagement/editContact`, JSON.stringify(page), {
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
      {" "}
      <Container fluid>
        <Row></Row>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edytuj Stronę Kontakt</Card.Title>
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
                        name="pageTitle"
                        value={page.pageTitle}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Wymagane
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                      <Form.Label>Tytuł sekcji wyśli wiadomość </Form.Label>
                      <Form.Control
                        required
                        placeholder="Tytuł sekcji"
                        name="contactSectionTitle"
                        value={page.contactSectionTitle}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Looks good!
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                      <Form.Label>Ikona adresu</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Ikona adresu"
                        name="addressIcon"
                        value={page.addressIcon}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback>Wymagane</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                      <Form.Label>Adres tytuł</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Adres tytuł"
                        name="addressTitle"
                        value={page.addressTitle}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback>Wymagane</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                      <Form.Label>Adres</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Adres"
                        name="addressDetails"
                        value={page.addressDetails}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback>Wymagane</Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                      <Form.Label>Ikona email</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Ikona email"
                        name="emailIcon"
                        value={page.emailIcon}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback>Wymagane</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                      <Form.Label>Email tytuł</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Email tytuł"
                        name="emailTitle"
                        value={page.emailTitle}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback>Wymagane</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                      <Form.Label>Adres Email</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Adres email"
                        name="emailAddress"
                        value={page.emailAddress}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback>Wymagane</Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} md="3" controlId="validationCustom01">
                      <Form.Label>Ikona telefonu</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Ikona telefonu"
                        name="phoneIcon"
                        value={page.phoneIcon}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback>Wymagane</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom02">
                      <Form.Label>Telefon tytuł</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Telefon tytuł"
                        name="phoneTitle"
                        value={page.phoneTitle}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback>Wymagane</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom02">
                      <Form.Label>Telefon Opis</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Opis"
                        name="phoneDetails"
                        value={page.phoneDetails}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback>Wymagane</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom02">
                      <Form.Label>Numer telefonu</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Numer telefonu"
                        name="phoneDetails"
                        value={page.phoneNumber}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback>Wymagane</Form.Control.Feedback>
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
                        name="textRowOne"
                        value={page.textRowOne}
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
                        name="emailTitle"
                        value={page.textRowTwo}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>

                  <Button type="submit">Aktualizuj</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default EditContactPage;

/* 
<Row className="mb-3">
    <Form.Group as={Col} md="4" controlId="validationCustom01">
        <Form.Label>First name</Form.Label>
        <Form.Control
        required
        type="text"
        placeholder="First name"
        defaultValue="Mark"
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
    </Form.Group>
    <Form.Group as={Col} md="4" controlId="validationCustom02">
        <Form.Label>Last name</Form.Label>
        <Form.Control
        required
        type="text"
        placeholder="Last name"
        defaultValue="Otto"
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
    </Form.Group>
    <Form.Group
        as={Col}
        md="4"
        controlId="validationCustomUsername"
    >
        <Form.Label>Username</Form.Label>
        <InputGroup hasValidation>
        <InputGroup.Text id="inputGroupPrepend">
            @
        </InputGroup.Text>
        <Form.Control
            type="text"
            placeholder="Username"
            aria-describedby="inputGroupPrepend"
            required
        />
        <Form.Control.Feedback type="invalid">
            Please choose a username.
        </Form.Control.Feedback>
        </InputGroup>
    </Form.Group>
    </Row>
*/
