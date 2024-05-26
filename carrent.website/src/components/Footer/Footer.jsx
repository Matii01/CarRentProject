import { Button, Col, Container, Form, Nav, Row } from "react-bootstrap";
import style from "./Footer.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";
import {
  useGetFooterQuery,
  useSubscribeNewsletterMutation,
} from "../../api/contentManagement";

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
  const { data: footer, error, isLoading } = useGetFooterQuery();
  const [subscribe, result] = useSubscribeNewsletterMutation();
  const [newSubscription, setNewSubscription] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    setNewSubscription(value);
  };

  const subscribeNewsletter = (event) => {
    event.preventDefault();
    subscribe(newSubscription)
      .then(() => {
        setNewSubscription("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
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
        </>
      )}
    </>
  );
}

export default Footer;
