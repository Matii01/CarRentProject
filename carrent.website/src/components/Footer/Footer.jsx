import { Button, Col, Container, Form, Row } from "react-bootstrap";
import style from "./Footer.module.css";
import axios from "axios";
import { useState } from "react";

function FooterList({ title, items }) {
  return (
    <>
      <Row>
        <Col xs={12} className={`${style.listTitle} mt-3`}>
          {title}
        </Col>
        <Col xs={12}>
          <ul className={style.list}>
            {items.map((item, index) => (
              <li key={index}>{item.title}</li>
            ))}
          </ul>
        </Col>
      </Row>
    </>
  );
}

function MediaInfo() {
  return (
    <>
      <Row>
        <Col xs={12} className={`${style.listTitle} m-3 ms-4`}>
          Car Rent
        </Col>
        <Col xs={12} className={`${style.footerText} m-1 ms-4`}>
          Drive Your Dreams: Explore More with Every Mile!
        </Col>
        <Col xs={12} className="m-1 ms-4">
          <Row>
            <Col>
              <i className="fa-brands fa-facebook p-1"></i>
              <i className="fa-brands fa-youtube p-1"></i>
              <i className="fa-brands fa-instagram p-1"></i>
              <i className="fa-brands fa-tiktok p-1"></i>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

function NewsLetter() {
  return (
    <>
      <Row>
        <Col xs={12} className={`${style.listTitle} m-3 ms-4`}>
          Subscribe to our newsletter
        </Col>
        <Col xs={12} className={`${style.footerText} m-1 ms-4`}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. At itaque
          temporibus.
        </Col>
        <Col xs={12} className="m-1 ms-4">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            {/* <Button variant="primary" type="submit">
          Submit
        </Button> */}
          </Form>
        </Col>
      </Row>
    </>
  );
}

function Footer() {
  const [footer, setFooter] = useState({});
  const company = [
    { title: "Login", link: "Login" },
    { title: "Register", link: "Register" },
    { title: "Account", link: "Account" },
    { title: "Wishlist", link: "Wishlist" },
  ];

  const rental = [
    { title: "Car List", link: "Car List" },
    { title: "Home", link: "Home" },
    { title: "Contact", link: "" },
    { title: "Recommend", link: "Latest" },
    { title: "Help", link: "Latest" },
  ];

  axios
    .get("https://localhost:7091/ContentManagement/footer")
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <>
      <div style={{ backgroundColor: "#e9ecef" }}>
        <Container className="p-5">
          <Row>
            <Col xs={12} md={6} lg={3}>
              <MediaInfo />
            </Col>
            <Col xs={12} md={6} lg={2} className="d-flex justify-content-left">
              <FooterList title={"User"} items={company} />
            </Col>
            <Col xs={12} md={6} lg={2} className="d-flex justify-content-left">
              <FooterList title={"Company"} items={rental} />
            </Col>
            <Col xs={12} md={6} lg={4}>
              <NewsLetter />
            </Col>
          </Row>
        </Container>
      </div>
      <div
        style={{
          backgroundColor: "#343a40",
          width: "100%",
        }}
      >
        <Container>
          <Row>
            <Col className="text-white p-4">
              © 2023, Car Rent. All rights reserved.
            </Col>
          </Row>
        </Container>
      </div>
      {/* <div style={{ backgroundColor: "#343a40", height: "50px"  }}>
        © 2021, Your company. All rights reserved.
      </div> */}
    </>
  );
}

export default Footer;
