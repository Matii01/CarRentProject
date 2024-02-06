import { useState } from "react";
import { Card, Container, Form, Row, Col, Button } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";
import InvoiceReportData from "../../components/Rabats/InvoceReportData";
import transformObjectToQueryString from "../../utils/transformObjectToQuery";
import InvoiceReportTable from "../../components/Rabats/InvoiceReportTable";
import { saveAs } from "file-saver";
import { ToastContainer, toast } from "react-toastify";
import MonthReportData from "../../components/MyReports/MonthReportData";
import MonthReportTable from "../../components/MyReports/MonthReportTable";
import CarReportData from "../../components/MyReports/CarReportData";
import CarReportTable from "../../components/MyReports/CarReportTable";

function ReportPage() {
  const INVOICEREPORT = "INVOICEREPORT";
  const MONTH = "MONTH";
  const CARS = "CARS";
  const [selectedReport, setSelectedReport] = useState("");
  const [invoiceReport, setInvoiceReport] = useState([]);
  const [invoiceParams, setInvoiceParams] = useState({
    CreatedDateFrom: "",
    CreatedDateTo: "",
  });
  const [monthReport, setMonthReport] = useState([]);
  const [monthParams, setMonthParams] = useState({ DateFrom: "", DateTo: "" });
  const [carReport, setCarReport] = useState([]);
  const [carParams, setCarParams] = useState({ DateFrom: "", DateTo: "" });

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

  const getInvoiceDocumentReport = async () => {
    try {
      const response = await jwtInterceptor.get(`Report/getInvoiceDocument`, {
        responseType: "blob", // Important to handle binary data properly
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(blob, "document.xlsx");
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  const getMonthReport = () => {
    const query = transformObjectToQueryString(monthParams);
    jwtInterceptor
      .get(`Report/monthReport?${query}`)
      .then((data) => {
        console.log(data.data);
        setMonthReport(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getMonthDocumentReport = () => {};

  const getCarsReport = () => {
    const query = transformObjectToQueryString(carParams);
    jwtInterceptor
      .get(`Report/carsReport?${query}`)
      .then((data) => {
        console.log(data.data);
        setCarReport(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getCarsDocumentReport = () => {};

  const onSubmit = (event) => {
    event.preventDefault();

    switch (selectedReport) {
      case INVOICEREPORT:
        getInvoiceReport();
        break;
      case MONTH:
        getMonthReport();
        break;
      case CARS:
        getCarsReport();
        break;
      default:
        toast.info("nie wybrano szablonu");
    }
  };

  const onGenerateClick = () => {
    switch (selectedReport) {
      case INVOICEREPORT:
        getInvoiceDocumentReport();
        break;
      case MONTH:
        getMonthDocumentReport();
        break;
      case CARS:
        getCarsDocumentReport();
        break;
      default:
        toast.info("nie wybrano szablonu");
    }
  };

  const handleChange = (event) => {
    setSelectedReport(event.target.value);
  };

  return (
    <>
      <ToastContainer />
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
                        <option value={MONTH}>Miesięcy</option>
                        <option value={CARS}>Samochodów</option>
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
                  {selectedReport === MONTH && (
                    <MonthReportData
                      monthData={monthParams}
                      setMonthData={setMonthParams}
                    />
                  )}
                  {selectedReport === CARS && (
                    <CarReportData
                      carData={carParams}
                      setCarData={setCarParams}
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
          {selectedReport === MONTH && monthReport.length > 0 && (
            <MonthReportTable data={monthReport} />
          )}
          {selectedReport === CARS && carReport.length > 0 && (
            <CarReportTable data={carReport} />
          )}
        </Row>
      </Container>
    </>
  );
}

export default ReportPage;
