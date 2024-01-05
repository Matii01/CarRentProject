import { Button, Col, Container, Form, Row } from "react-bootstrap";
import styles from "./ContactPage.module.css";
import { useLoaderData } from "react-router-dom";

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
  const onSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <>
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
                <Form.Control type="text" placeholder="Name" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Your Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Your message</Form.Label>
                <Form.Control as="textarea" rows={3} />
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
