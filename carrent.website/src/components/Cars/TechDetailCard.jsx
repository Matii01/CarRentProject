import { Card } from "react-bootstrap";

function TechDetailCard({ title, subtitle, icon }) {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title className="text-center mb-4">
            <i className={icon}></i>
          </Card.Title>

          <Card.Subtitle className="mb-2 text-muted text-center">
            {subtitle}
          </Card.Subtitle>
          <Card.Title className="text-center">{title}</Card.Title>
        </Card.Body>
      </Card>
    </>
  );
}
export default TechDetailCard;
