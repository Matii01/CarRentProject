import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Accordion,
} from "react-bootstrap";

function CarDetailsComponent() {
  return (
    <Container className="mt-2">
      <Row>
        <Image
          src="https://cdn.pixabay.com/photo/2012/11/02/13/02/car-63930_1280.jpg"
          fluid
          rounded
          style={{ borderRadius: 5 }}
        />
      </Row>
      <Row>
        <Row>
          <Col>
            <h3>Specifications</h3>
          </Col>
        </Row>
        <Row xs={1} md={2} className="g-3">
          <Col>
            <ListGroup as="ol">
              <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
              <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
              <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
            <ListGroup as="ol">
              <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
              <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
              <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Row>
      <Row>
        <div class="card card-body p-4 card-light mb-4">
          <div class="row row-cols-2 row-cols-sm-4 gx-3 gx-xl-4 gy-4">
            <div class="col text-dark text-center">
              <div class="d-table bg-dark rounded-3 mx-auto p-3">
                <img src="/img/icons/check.svg" width="48" alt="Icon" />
              </div>
              <div class="fs-sm pt-2 mt-1">Checked and Certified by Finder</div>
            </div>
            <div class="col text-dark text-center">
              <div class="d-table bg-dark rounded-3 mx-auto p-3">
                <img
                  src="/img/icons/steering-wheel.svg"
                  width="48"
                  alt="Icon"
                />
              </div>
              <div class="fs-sm pt-2 mt-1">Single Owner</div>
            </div>
            <div class="col text-dark text-center">
              <div class="d-table bg-dark rounded-3 mx-auto p-3">
                <img src="/img/icons/driving-test.svg" width="48" alt="Icon" />
              </div>
              <div class="fs-sm pt-2 mt-1">Well-Equipped</div>
            </div>
            <div class="col text-dark text-center">
              <div class="d-table bg-dark rounded-3 mx-auto p-3">
                <img src="/img/icons/accident.svg" width="48" alt="Icon" />
              </div>
              <div class="fs-sm pt-2 mt-1">No Accident / Damage Reported</div>
            </div>
          </div>
        </div>
      </Row>
      <Row>
        <h3>Features</h3>
      </Row>
      <Row>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Exterior</Accordion.Header>
            <Accordion.Body>
              <ul>
                <li>Alloy Wheels</li>
                <li>Sunroof / Moonroof</li>
                <li>Tinged glass</li>
                <li>LED Headlights</li>
                <li>Foldable Roof</li>
                <li>Tow Hitch</li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Interior</Accordion.Header>
            <Accordion.Body>
              <ListGroup as="ul">
                <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
                <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
                <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Safety</Accordion.Header>
            <Accordion.Body></Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Technology</Accordion.Header>
            <Accordion.Body></Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
      <Row>
        <h3>Seller's Description</h3>
      </Row>
      <Row>
        <p>
          Lorem tincidunt lectus vitae id vulputate diam quam. Imperdiet non
          scelerisque turpis sed etiam ultrices. Blandit mollis dignissim
          egestas consectetur porttitor. Vulputate dolor pretium, dignissim eu
          augue sit ut convallis. Lectus est, magna urna feugiat sed ultricies
          sed in lacinia. Fusce potenti sit id pharetra vel ornare. Vestibulum
          sed tellus ullamcorper arcu.
        </p>
      </Row>
    </Container>
  );
}

export default CarDetailsComponent;
