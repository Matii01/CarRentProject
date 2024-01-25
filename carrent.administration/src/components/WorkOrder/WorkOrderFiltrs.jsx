import { useEffect, useState } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";

function WorkOrderFiltrs({
  filtrs,
  setFiltrs,
  forFilters,
  onApplayFiltrs,
  isAdmin,
}) {
  const [showFilters, setShowFilters] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFiltrs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onApplayFiltrs();
  };

  const toggleFiltrs = () => {
    setShowFilters(!showFilters);
  };

  return (
    <Card>
      <Card.Header>
        <Row>
          <Col>
            <Button variant="dark" onClick={toggleFiltrs}>
              {showFilters && "Ukryj"} {!showFilters && "Pokaż filtry"}{" "}
            </Button>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        {showFilters && (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select onChange={handleChange} name="WorkOrderStatus">
                    <option value={null}>Select... </option>
                    {forFilters &&
                      forFilters.statuses.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Priorytet</Form.Label>
                  <Form.Select onChange={handleChange} name="WorkOrderPriority">
                    <option value={null}>Select... </option>
                    {forFilters &&
                      forFilters.priorities.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                {isAdmin && (
                  <Form.Group className="mb-3">
                    <Form.Label>Pracownik</Form.Label>
                    <Form.Select onChange={handleChange} name="WorkerId">
                      <option value={null}>Select... </option>
                      {forFilters &&
                        forFilters.worker.map((type) => (
                          <option key={type.workerId} value={type.workerId}>
                            {type.name}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                )}
              </Col>
            </Row>

            <Row>
              <Col xl={4} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Utworzona od</Form.Label>
                  <Form.Control
                    name="CreatedDataStart"
                    type="date"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xl={4} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Utworzona do</Form.Label>
                  <Form.Control
                    name="CreatedDataEnd"
                    type="date"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xl={4} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Wykonana od</Form.Label>
                  <Form.Control
                    name="CompletedDateStart"
                    type="date"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xl={4} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Wykonana do</Form.Label>
                  <Form.Control
                    name="CompletedDateEnd"
                    type="date"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xl={4} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Zaplanowana od</Form.Label>
                  <Form.Control
                    name="ScheduledDateStart"
                    type="date"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xl={4} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Zaplanowana do</Form.Label>
                  <Form.Control
                    name="ScheduledDateEnd"
                    type="date"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Założony czas min</Form.Label>
                  <Form.Control
                    name="EstimatedHoursMin"
                    type="number"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Założony czas max</Form.Label>
                  <Form.Control
                    name="EstimatedHoursMax"
                    type="number"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Rzeczywisty min</Form.Label>
                  <Form.Control
                    name="ActualHoursMin"
                    type="number"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Rzeczywisty max</Form.Label>
                  <Form.Control
                    name="ActualHoursMax"
                    type="number"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <Button variant="dark" type="submit">
                  Zastosuj
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
}

export default WorkOrderFiltrs;
