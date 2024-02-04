import { useEffect, useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";
import { toast } from "react-toastify";

function UpdateRentalStatus({
  statuses,
  invoice,
  invoiceStatusId,
  onUpdateRentalClick,
  onRefresh,
}) {
  const [oldStatus, setOldStatus] = useState(invoiceStatusId);
  const [paid, setPaid] = useState(invoice.totalPay);
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
    updateInvoiceStatus();

    // if (oldStatus != selectedInvoiceStatusId) {
    // updateInvoiceStatus();
    // }
  };

  const updateInvoiceStatus = () => {
    const data = {
      oldStatus: oldStatus,
      newStatus: selectedInvoiceStatusId,
      paid: paid,
    };

    console.log(data);
    jwtInterceptor
      .post(`Rental/UpdateInvoiceStatus/${invoice.id}`, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log(data.data);
        onRefresh();
        toast.success("Zaktualizowano");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setSelectedInvoiceStatusId(event.target.value);
  };

  const handlePayChange = (event) => {
    setPaid(event.target.value);
  };

  return (
    <>
      <Card>
        <Card.Header>
          Płatność {invoice.isEditable ? " " : "- edycja zablokowana"}
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="" controlId="formGroupEmail">
                  <Form.Label>Status</Form.Label>
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

                <Form.Group>
                  <Form.Label>Do zapłaty</Form.Label>
                  <Form.Control
                    disabled
                    type="number"
                    value={invoice.totalToPay}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Zapłacono</Form.Label>
                  <Form.Control
                    disabled={!invoice.isEditable}
                    type="number"
                    min={0}
                    max={invoice.totalToPay}
                    value={paid}
                    onChange={handlePayChange}
                  />
                </Form.Group>

                <Button
                  className="mt-3"
                  variant="dark"
                  type="submit"
                  disabled={!invoice.isEditable}
                >
                  Aktualizuj płatność
                </Button>
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default UpdateRentalStatus;

/**
 <Col>
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
  </Col>
 */

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
