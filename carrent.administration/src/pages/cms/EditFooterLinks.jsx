import { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";
import { ToastContainer, toast } from "react-toastify";

function EditFooterLinks({ links, onEdit }) {
  const [validated, setValidated] = useState(false);
  const [edited, setEdited] = useState(links);
  const [deleteMode, setDeleteMode] = useState(false);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(edited);

    jwtInterceptor
      .post(
        `ContentManagement/editFooterLinks/${edited.id}`,
        JSON.stringify(edited),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        console.log(data.data);
        toast.success("Zapiasano zmiany");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addNewLink = (linksId) => {
    const items = [
      ...edited.paths,
      {
        displayPosition: 0,
        footerLinksId: linksId,
        id: 0,
        name: "",
        path: "#",
      },
    ];
    setEdited((prev) => ({
      ...prev,
      paths: items,
    }));
  };

  const removeFromList = (id) => {
    const items = edited.paths.filter((it) => it.id != id);

    setEdited((prev) => ({
      ...prev,
      paths: items,
    }));
  };

  const removeLink = (id) => {
    if (id == 0) {
      toast.success("usunięto");
      removeFromList(id);
      return;
    }
    jwtInterceptor
      .delete(`ContentManagement/deleteFooterPathLink/${id}`)
      .then((data) => {
        toast.success("usunięto");
        removeFromList(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleDeleteMode = () => {
    setDeleteMode(!deleteMode);
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
                  <Form.Group as={Col} md="5" controlId="validationCustom01">
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
                  <Form.Group as={Col} md="5" controlId="validationCustom01">
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
                  {deleteMode && (
                    <Form.Group as={Col} md="2" controlId="validationCustom01">
                      <Form.Label>Usuń</Form.Label>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => removeLink(it.id)}
                      >
                        -
                      </Button>
                    </Form.Group>
                  )}
                </Row>
              ))}

            <Row>
              <Col md="3">
                <Button
                  size="sm"
                  variant="dark"
                  type="submit"
                  disabled={deleteMode}
                >
                  Aktualizuj
                </Button>
              </Col>
              <Col md="3">
                <Button
                  size="sm"
                  onClick={() => addNewLink(links.id)}
                  disabled={deleteMode}
                >
                  +
                </Button>
              </Col>
              <Col md="6">
                <Button size="sm" onClick={toggleDeleteMode}>
                  {deleteMode && "Wyłącz"} {!deleteMode && "Tryb usuwania"}
                </Button>
              </Col>
            </Row>
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
