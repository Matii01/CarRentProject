import { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";

function EditFooterLinks({ links, onEdit }) {
  const [validated, setValidated] = useState(false);
  const [edited, setEdited] = useState(links);
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPage((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLinksChange = (value, name, id) => {
    const items = edited.paths.map((it) => {
      if (it.id === id) {
        return {
          ...it,
          [name]: value,
        };
      }
      return it;
    });

    setEdited((prev) => ({
      ...prev,
      paths: items,
    }));
  };
  return (
    <>
      <Card>
        <Card.Header>
          <Card.Title as="h4"></Card.Title>
        </Card.Header>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Label>Tytuł Sekcji</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Tytuł"
                  name="title"
                  value={edited.title}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Wymagane
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            {edited.paths &&
              edited.paths.map((it, index) => (
                <Row className="mb-3" key={index}>
                  <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>Tytuł</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Tytuł"
                      value={it.name}
                      name={it.id}
                      onChange={(event) =>
                        handleLinksChange(event.target.value, "name", it.id)
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      Wymagane
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>Link</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Tytuł"
                      value={it.path}
                      name={it.id}
                      onChange={(event) =>
                        handleLinksChange(event.target.value, "path", it.id)
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      Wymagane
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              ))}

            <Button variant="dark" type="submit">
              Aktualizuj
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default EditFooterLinks;

function EditOneLink({ link }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPage((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Row className="mb-3">
      <Form.Group as={Col} md="6" controlId="validationCustom01">
        <Form.Label>Tytuł</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Tytuł"
          name="name"
          value={link.name}
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">Wymagane</Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} md="6" controlId="validationCustom01">
        <Form.Label>Link</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Tytuł"
          name="path"
          value={link.path}
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">Wymagane</Form.Control.Feedback>
      </Form.Group>
    </Row>
  );
}

/**
 
{edited.paths &&
    edited.paths.map((it, index) => (
    <Row className="mb-3" key={index}>
        <Form.Group as={Col} md="6" controlId="validationCustom01">
        <Form.Label>Tytuł</Form.Label>
        <Form.Control
            required
            type="text"
            placeholder="Tytuł"
            value={it.name}
            onChange={handleLinksChange}
        />
        <Form.Control.Feedback type="invalid">
            Wymagane
        </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom01">
        <Form.Label>Link</Form.Label>
        <Form.Control
            required
            type="text"
            placeholder="Tytuł"
            name="title"
            value={it.path}
            onChange={handleLinksChange}
        />
        <Form.Control.Feedback type="invalid">
            Wymagane
        </Form.Control.Feedback>
        </Form.Group>
    </Row>
    ))}
 */
