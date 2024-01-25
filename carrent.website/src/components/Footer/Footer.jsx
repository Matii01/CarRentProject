import { Button, Col, Container, Form, Nav, Row } from "react-bootstrap";
import style from "./Footer.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";

function FooterList({ item }) {
  return (
    <>
      <Row>
        <Col xs={12} className={`${style.listTitle} mt-3`}>
          {item.title}
        </Col>
        <Col xs={12}>
          <ul className={style.list}>
            {item.paths.map((item, index) => (
              <li key={index}>
                <Nav.Link to={item.path} as={Link}>
                  {item.name}
                </Nav.Link>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </>
  );
}

function Footer() {
  const [footer, setFooter] = useState({});
  const [newSubscription, setNewSubscription] = useState("");

  useEffect(() => {
    axiosInstance
      .get("ContentManagement/footer")
      .then((data) => {
        console.log(data);
        setFooter(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {
    const { value } = event.target;
    console.log(value);
    setNewSubscription(value);
  };

  const subscribeNewsletter = (event) => {
    event.preventDefault();
    console.log(newSubscription);
    axiosInstance
      .post(`Newsletter/subscribe`, JSON.stringify(newSubscription), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log(data);
        setNewSubscription("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div style={{ backgroundColor: "#e9ecef" }}>
        <Container className="p-5">
          <Row>
            <Col xs={12} md={6} lg={3}>
              <Row>
                <Col xs={12} className={`${style.listTitle} m-3 ms-4`}>
                  {footer.title}
                </Col>
                <Col xs={12} className={`${style.footerText} m-1 ms-4`}>
                  {footer.description}
                </Col>
                <Col xs={12} className="m-1 ms-4">
                  <Row>
                    <Col>
                      {footer.facebookLink && (
                        <a href={footer.facebookLink}>
                          <i className="fa-brands fa-facebook p-1"></i>
                        </a>
                      )}
                      {footer.youTubeLink && (
                        <a href={footer.youTubeLink}>
                          <i className="fa-brands fa-youtube p-1"></i>
                        </a>
                      )}
                      {footer.instagramLink && (
                        <a href={footer.instagramLink}>
                          <i className="fa-brands fa-instagram p-1"></i>
                        </a>
                      )}
                      {footer.tikTokLink && (
                        <a href={footer.tikTokLink}>
                          <i className="fa-brands fa-tiktok p-1"></i>
                        </a>
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            {footer.links &&
              footer.links.map((item, index) => (
                <Col
                  key={index}
                  xs={12}
                  md={6}
                  lg={2}
                  className="d-flex justify-content-left"
                >
                  <FooterList item={item} />
                </Col>
              ))}

            <Col xs={12} md={6} lg={4}>
              <Row>
                <Col xs={12} className={`${style.listTitle} m-3 ms-4`}>
                  {footer.newsLetterTitle}
                </Col>
                <Col xs={12} className={`${style.footerText} m-1 ms-4`}>
                  {footer.newsLetterDescription}
                </Col>
                <Col xs={12} className="m-1 ms-4">
                  <Form onSubmit={subscribeNewsletter}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={newSubscription}
                        onChange={handleChange}
                      />
                      <Form.Text className="text-muted">
                        {footer.newsLetterInfo}
                      </Form.Text>
                    </Form.Group>
                    <Button
                      variant="primary"
                      type="submit"
                      className="customButton"
                    >
                      Submit
                    </Button>
                  </Form>
                </Col>
              </Row>
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
            <Col className="text-white p-4">{footer.info}</Col>
          </Row>
        </Container>
      </div>
      {/* <div style={{ backgroundColor: "#343a40", height: "50px"  }}>
        © 2021, Your company. All rights reserved.
      </div> */}
    </>
  );
}

/*
<Col xs={12} md={6} lg={2} className="d-flex justify-content-left">
    <FooterList title={"User"} items={company} />
  </Col>
  <Col xs={12} md={6} lg={2} className="d-flex justify-content-left">
    <FooterList title={"Company"} items={rental} />
  </Col> 
*/

/*
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
*/

export default Footer;

/**
 * 
 * function FooterList({ title, items }) {
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
 * 
 */
