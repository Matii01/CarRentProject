import { useEffect, useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";

function UpdateRentalStatus({
  statuses,
  invoiceId,
  invoiceStatusId,
  onUpdateRentalClick,
}) {
  const [oldStatus, setOldStatus] = useState(invoiceStatusId);
  const [selectedInvoiceStatusId, setSelectedInvoiceStatusId] =
    useState(invoiceStatusId);

  useEffect(() => {
    if (invoiceStatusId === null) {
      setOldStatus(-1);
    } else {
      setOldStatus(invoiceStatusId);
    }
  }, [invoiceStatusId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (oldStatus != selectedInvoiceStatusId) {
      updateInvoiceStatus();
    }
  };

  const updateInvoiceStatus = () => {
    const data = {
      oldStatus: oldStatus,
      newStatus: selectedInvoiceStatusId,
    };

    console.log(data);
    jwtInterceptor
      .post(`Rental/UpdateInvoiceStatus/${invoiceId}`, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setSelectedInvoiceStatusId(event.target.value);
  };

  return (
    <>
      <Card>
        <Card.Header>Status</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-4">
              <Col className="w-100">
                <Button
                  className="w-75"
                  variant="dark"
                  onClick={onUpdateRentalClick}
                >
                  Aktualizuj statusy wypożyczenia
                </Button>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Płatność</Form.Label>
              <Form.Select
                value={selectedInvoiceStatusId}
                onChange={handleChange}
              >
                {statuses.invoiceStatus &&
                  statuses.invoiceStatus.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>

            <Button variant="dark" type="submit">
              Aktualizuj statusy płatności
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default UpdateRentalStatus;

/**
 
The status of an invoice typically reflects its position in the billing and payment cycle. Different businesses might use slightly different terminologies or stages, but generally, the common statuses of an invoice are:

Draft: The invoice has been created but not yet finalized or sent to the client. At this stage, it can still be edited or adjusted.

Issued/Sent: The invoice has been finalized and sent to the client. It indicates that the invoice is now officially in the hands of the client for payment.

Outstanding/Pending: The invoice has been issued but not yet paid. This status is used to track invoices that are currently active and awaiting payment.

Past Due/Overdue: The invoice has not been paid and is past its due date. This status is critical for tracking delinquent accounts.

Partially Paid: The client has made a partial payment on the invoice. The remaining balance is still due.

Paid: The invoice has been fully paid. No further action is needed on this invoice, and it's typically filed away for record-keeping.

Cancelled: The invoice has been cancelled and is no longer valid. This might happen if there was an error on the invoice, the goods or services were not delivered, or other reasons.

Disputed: The client has contested the invoice. This status is used when there are disagreements over charges, quantities, terms, etc.

Write-Off: The invoice is considered uncollectible and is written off as a loss. This typically happens when the client is unable or unwilling to pay, and all collection efforts have been exhausted.

These statuses help businesses track their accounts receivable process efficiently and take appropriate action at each stage of the invoice lifecycle. Different accounting or invoicing software may have additional or slightly varied statuses, but these cover the most common scenarios.
 */
