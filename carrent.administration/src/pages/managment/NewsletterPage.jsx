import { useEffect, useState } from "react";
import { Col, Container, Row, Card, Form, Button } from "react-bootstrap";
import TableWithPagination from "../../components/Table/TableWithPagination";
import jwtInterceptor from "../../utils/jwtInterceptor";
import transformObjectToQueryString from "../../utils/transformObjectToQuery";
import { formatDate } from "./../../utils/formDate";
import ManageNewsletterSub from "../../components/Newsletter/ManageNewsletterSub";
import ManageNewsletterHistory from "../../components/Newsletter/ManageNewsletterHistory";
import SendNewNewsletterMessage from "../../components/Newsletter/SendNewNewsletterMessage";

function NewsletterPage() {
  const [sendNew, setSendNew] = useState(false);
  const [selectedSub, setSelectedSub] = useState();
  const [showSelectedSub, setShowSelectedSub] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState();
  const [showSelectedHistory, setShowSelectedHistory] = useState(false);
  const [sendHistory, setSendHistory] = useState([]);
  const [newsletterSub, setNewsletterSub] = useState([]);
  const [historyMetaData, setHistoryMetaData] = useState([]);
  const [subMetaData, setSubMetaData] = useState([]);
  const [subFiltrs, setSubFiltrs] = useState({ PageNumber: 1, PageSize: 10 });
  const [historyFiltrs, setHistoryFiltrs] = useState({
    PageNumber: 1,
    PageSize: 10,
  });

  useEffect(() => {
    getSendHistory();
    getNewsletterSub();
  }, []);

  const getSendHistory = () => {
    const queryString = transformObjectToQueryString(historyFiltrs);
    jwtInterceptor
      .get(`Newsletter/sendHistory?${queryString}`)
      .then((data) => {
        console.log(data);
        transformSendHistory(data.data.items);
        setHistoryMetaData(data.data.metaData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getNewsletterSub = () => {
    const queryString = transformObjectToQueryString(subFiltrs);
    jwtInterceptor
      .get(`Newsletter/subscribers?${queryString}`)
      .then((data) => {
        console.log(data);
        transformNewsletterSub(data.data.items);
        setSubMetaData(data.data.metaData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const transformNewsletterSub = (data) => {
    const transformed = data.map((it) => ({
      ...it,
      subscribeDate: formatDate(it.subscribeDate),
      unsubscribeDate: formatDate(it.unsubscribeDate),
      isSubscribe: it.isSubscribe === true ? "true" : "false",
    }));
    setNewsletterSub(transformed);
  };

  const transformSendHistory = (data) => {
    const transformed = data.map((it) => ({
      ...it,
      createdDate: formatDate(it.createdDate),
    }));
    setSendHistory(transformed);
  };

  const onHistotyDoubleClick = (id) => {
    const item = sendHistory.find((it) => it.id === id);
    setSelectedHistory(item);
    setShowSelectedHistory(true);
  };

  const onSubDoubleClick = (id) => {
    const item = newsletterSub.find((it) => it.id === id);
    setSelectedSub(item);
    setShowSelectedSub(true);
  };

  const sendNewMessage = () => {
    setSendNew(true);
    setShowSelectedHistory(false);
  };

  return (
    <Container fluid>
      <Row>
        <Col md="6">
          <Row>
            <Row></Row>
            <Row>
              <Card className="" style={{ marginTop: "0px" }}>
                <Card.Header>
                  <Row>
                    <Col className="text-center mb-2">Newsletter - subs</Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button variant="dark" size="sm">
                        Dodaj
                      </Button>
                    </Col>
                    <Col>
                      <Form className="d-flex">
                        <Form.Control
                          size="sm"
                          name="serachTerm"
                          type="search"
                          placeholder="Search"
                          className="me-2"
                          aria-label="Search"
                          value={""}
                        />
                      </Form>
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body>
                  {newsletterSub && (
                    <TableWithPagination
                      thead={["ID", "Tytuł", "Data dołączenia", "Is"]}
                      items={newsletterSub}
                      searchTerm={""}
                      item={["id", "email", "subscribeDate", "isSubscribe"]}
                      metaData={subMetaData}
                      onDoubleClick={onSubDoubleClick}
                    />
                  )}
                </Card.Body>
              </Card>
            </Row>
          </Row>
        </Col>
        <Col md="6">
          {showSelectedSub && selectedSub && (
            <ManageNewsletterSub
              item={selectedSub}
              hide={() => setShowSelectedSub(false)}
            />
          )}
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <Row>
            <Row></Row>
            <Row>
              <Card className="" style={{ marginTop: "0px" }}>
                <Card.Header>
                  <Row>
                    <Col className="text-center mb-2">
                      Newsletter - historia
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button variant="dark" size="sm" onClick={sendNewMessage}>
                        Wyślij nową
                      </Button>
                    </Col>
                    <Col>
                      <Form className="d-flex">
                        <Form.Control
                          size="sm"
                          name="serachTerm"
                          type="search"
                          placeholder="Search"
                          className="me-2"
                          aria-label="Search"
                          value={""}
                        />
                      </Form>
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body>
                  {newsletterSub && (
                    <TableWithPagination
                      thead={["ID", "Tytuł", "Wysłana"]}
                      items={sendHistory}
                      searchTerm={""}
                      item={["id", "title", "createdDate"]}
                      metaData={historyMetaData}
                      onDoubleClick={onHistotyDoubleClick}
                    />
                  )}
                </Card.Body>
              </Card>
            </Row>
          </Row>
        </Col>
        <Col md="6">
          {showSelectedHistory && selectedHistory && (
            <ManageNewsletterHistory
              item={selectedHistory}
              hide={() => setShowSelectedHistory(false)}
            />
          )}
          {sendNew && !showSelectedHistory && <SendNewNewsletterMessage />}
        </Col>
      </Row>
    </Container>
  );
}

export default NewsletterPage;
