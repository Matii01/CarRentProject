import { Button, Col, Container, Form, Row } from "react-bootstrap";
import styles from "./ContactPage.module.css";

function AddressDetails({ item }) {
  return (
    <>
      <Row>
        <Col xs={12}>
          <i className={item.icon}></i>
        </Col>
        <Col xs={12} className={`${styles.contactTitle} pt-2 pb-2`}>
          {item.title}
        </Col>
        <Col xs={12} className={`${styles.text} w-50`}>
          {item.text}
        </Col>
        <Col xs={12} className={`${styles.additional} mt-2`}>
          {item.additional}
        </Col>
      </Row>
    </>
  );
}

function ContactForm() {
  const onSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Container>
        <Row className="mb-4">
          <Col>
            <h3>Contact</h3>
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
                <p>
                  Effects present letters inquiry no an removed or friends.
                  Desire behind latter me though in. Supposing shameless am he
                  engrossed up additions. My possible peculiar together to.
                  Desire so better am cannot he up before points. Remember
                  mistaken opinions it pleasure of debating. Court front maids
                  forty if aware their at. Chicken use are pressed removed.
                </p>
              </Col>
            </Row>
            <Row>
              <Col className={`${styles.contactFormText}`}>
                <p>
                  Able an hope of body. Any nay shyness article matters own
                  removal nothing his forming. Gay own additions education
                  satisfied the perpetual. If he cause manor happy. Without
                  farther she exposed saw man led. Along on happy could cease
                  green oh.
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

function ContactPage() {
  const address = {
    icon: "fa-solid fa-location-dot",
    title: "Address",
    text: `21/37 Test New Test, 420D Test Test`,
    additional: "",
  };
  const phone = {
    icon: "fa-solid fa-phone",
    title: "Phone",
    text: " Reach us for immediate assistance. Our friendly team is available.",
    additional: "+123456789",
  };
  const email = {
    icon: "fa-solid fa-envelope",
    title: "Email",
    text: "JourneyJetters@gmail.com",
    additional: "",
  };

  return (
    <>
      <Container className="mb-4">
        <Row>
          <Col xs={12} className={`${styles.title} text-center mt-5 mb-2`}>
            <p>Contact</p>
          </Col>
          <Col className="mb-5 text-center">
            <div className="w-50 m-auto">
              Welcome to Car Rentals! We're here to ensure your journey is
              smooth and memorable. For any inquiries, bookings, or assistance,
              please don't hesitate to contact us.
            </div>
          </Col>
        </Row>
        <hr />
        <Row className="mt-5 mb-5 m-auto">
          <Col sm={12} md={4}>
            <AddressDetails item={address} />
          </Col>
          <Col sm={12} md={4}>
            <AddressDetails item={phone} />
          </Col>
          {/* /* className="d-flex justify-content-center"*/}
          <Col sm={12} md={4}>
            <AddressDetails item={email} />
          </Col>
        </Row>
        <hr />
        <Row className="mt-5 mb-5">
          <ContactForm />
        </Row>
      </Container>
    </>
  );
}

export default ContactPage;
