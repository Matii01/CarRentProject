import { useState } from "react";
import { Card, Container, Form, Row, Col, Button } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";
import InvoiceReportData from "../../components/Rabats/InvoceReportData";
import transformObjectToQueryString from "../../utils/transformObjectToQuery";
import InvoiceReportTable from "../../components/Rabats/InvoiceReportTable";

function ReportPage() {
  const INVOICEREPORT = "INVOICEREPORT";
  const [selectedReport, setSelectedReport] = useState("");
  const [invoiceReport, setInvoiceReport] = useState([]);
  const [invoiceParams, setInvoiceParams] = useState({
    CreatedDateFrom: "",
    CreatedDateTo: "",
  });

  const getInvoiceReport = () => {
    const query = transformObjectToQueryString(invoiceParams);
    jwtInterceptor
      .get(`Report/invoiceReport?${query}`)
      .then((data) => {
        console.log(data.data);
        setInvoiceReport(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    switch (selectedReport) {
      case INVOICEREPORT:
        getInvoiceReport();
        break;
      default:
        console.log("nie wybrano");
    }
  };

  const onGenerateClick = () => {
    console.log("geneate excel");
  };

  const handleChange = (event) => {
    setSelectedReport(event.target.value);
  };

  return (
    <>
      <Container>
        <Row>
          <Card>
            <Card.Header></Card.Header>
            <Card.Body>
              <Form onSubmit={onSubmit}>
                <Row>
                  <Col xl={3} md={6}>
                    <Form.Group>
                      <Form.Label>State</Form.Label>
                      <Form.Select
                        defaultValue="Choose..."
                        onChange={handleChange}
                      >
                        <option>Wybierz...</option>
                        <option value={INVOICEREPORT}>Faktur</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  {selectedReport === INVOICEREPORT && (
                    <InvoiceReportData
                      invoiceData={invoiceParams}
                      setInvoceData={setInvoiceParams}
                    />
                  )}
                </Row>
                <Row className="mt-2">
                  <Col>
                    <Button className="me-2" size="sm" type="submit">
                      Wykonaj
                    </Button>
                    <Button
                      className="me-2"
                      size="sm"
                      onClick={onGenerateClick}
                    >
                      Generuj Excel
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Row>
        <Row>
          {selectedReport === INVOICEREPORT && invoiceReport.length > 0 && (
            <InvoiceReportTable data={invoiceReport} />
          )}
        </Row>
      </Container>
    </>
  );
}

export default ReportPage;
