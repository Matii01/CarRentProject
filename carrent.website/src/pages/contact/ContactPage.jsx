import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import styles from "./ContactPage.module.css";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../../utils/axiosConfig";

function ContactPage() {
  const data = useLoaderData();
  const contact = data.data;

  return (
    <>
      <Container className="mb-4">
        <Row>
          <Col xs={12} className={`${styles.title} text-center mt-5 mb-2`}>
            <p>{contact.pageTitle}</p>
          </Col>
          <Col className="mb-5 text-center">
            <div className="w-50 m-auto">{contact.pageDescription}</div>
          </Col>
        </Row>
        <hr />
        <Row className="mt-5 mb-5 m-auto">
          <Col sm={12} md={4}>
            <Row>
              <Col xs={12}>
                <i className={contact.addressIcon}></i>
              </Col>
              <Col xs={12} className={`${styles.contactTitle} pt-2 pb-2`}>
                {contact.addressTitle}
              </Col>
              <Col xs={12} className={`${styles.text} w-50`}>
                {contact.addressDetails}
              </Col>
              <Col xs={12} className={`${styles.additional} mt-2`}></Col>
            </Row>
          </Col>
          <Col sm={12} md={4}>
            <Row>
              <Col xs={12}>
                <i className={contact.phoneIcon}></i>
              </Col>
              <Col xs={12} className={`${styles.contactTitle} pt-2 pb-2`}>
                {contact.phoneTitle}
              </Col>
              <Col xs={12} className={`${styles.text} w-50`}>
                {contact.phoneDetails}
              </Col>
              <Col xs={12} className={`${styles.additional} mt-2`}>
                {contact.phoneNumber}
              </Col>
            </Row>
          </Col>
          <Col sm={12} md={4}>
            <Row>
              <Col xs={12}>
                <i className={contact.emailIcon}></i>
              </Col>
              <Col xs={12} className={`${styles.contactTitle} pt-2 pb-2`}>
                {contact.emailTitle}
              </Col>
              <Col xs={12} className={`${styles.text} w-50`}>
                {contact.emailDetails}
              </Col>
              <Col xs={12} className={`${styles.additional} mt-2`}>
                {contact.emailAddress}
              </Col>
            </Row>
          </Col>
        </Row>
        <hr />
        <Row className="mt-5 mb-5">
          <ContactForm
            title={contact.contactSectionTitle}
            textOne={contact.textRowOne}
            textTwo={contact.textRowTwo}
          />
        </Row>
      </Container>
    </>
  );
}

function ContactForm({ title, textOne, textTwo }) {
  const [message, setMessage] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setMessage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(message);
    axiosInstance
      .post(`Messages/sendMessage`, JSON.stringify(message), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        setShow(true);
        setMessage({
          name: "",
          email: "",
          message: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thank you </Modal.Title>
        </Modal.Header>
        <Modal.Body>Your message has been sent </Modal.Body>
        <Modal.Footer>
          <Button className="customButton" onClick={handleClose}>
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
      <Container>
        <Row className="mb-4">
          <Col>
            <h3>{title}</h3>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6}>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={message.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Your Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter your email"
                  value={message.email}
                  name="email"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Your message</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  rows={3}
                  name="message"
                  value={message.message}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Button className="customButton" type="submit">
                  Send Message
                </Button>
              </Form.Group>
            </Form>
          </Col>
          <Col xs={12} sm={6} className="pt-2">
            <Row>
              <Col className={`${styles.contactFormText}`}>
                <p>{textOne}</p>
              </Col>
            </Row>
            <Row>
              <Col className={`${styles.contactFormText}`}>
                <p>{textTwo}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ContactPage;
