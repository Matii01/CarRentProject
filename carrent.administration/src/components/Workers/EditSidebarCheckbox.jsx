import { Row, Col } from "react-bootstrap";

function EditSidebarCheckbox({ name, mainCategory, onChange, item }) {
  const handleCheckboxChange = (event, name) => {
    onChange(event, name);
  };

  return (
    <>
      <Row className="mt-2">
        <Col sm={3} className="text-end">
          {name}:{" "}
        </Col>
        <Col>
          <input
            className="ms-2"
            type="checkbox"
            name={name}
            checked={item.isActive}
            onChange={(event) => handleCheckboxChange(event, mainCategory)}
          />
        </Col>
      </Row>
    </>
  );
}

export default EditSidebarCheckbox;
