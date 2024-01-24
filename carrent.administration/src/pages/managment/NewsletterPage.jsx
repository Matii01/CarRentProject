import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";

function NewsletterPage() {
  const [sendedHistory, setSendedHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [newsletterSub, setNewsletterSub] = useState([]);
  const [filteredSub, setFilteredSub] = useState([]);

  const getSendedHistory = () => {
    jwtInterceptor
      .get("CarMake")
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default NewsletterPage;
