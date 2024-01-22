import { Card, Row, Col, Button } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";
import { toast } from "react-toastify";

function ManageOpinion({ opinion, onChange, onDelete }) {
  const toggleAccepted = (event) => {
    if (event.target.checked) {
      acceptOpinion();
    } else {
      hideOpinion();
    }
  };

  const acceptOpinion = () => {
    jwtInterceptor
      .post(`CarOpinion/accept/${opinion.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        onChange(opinion.id, true);
        toast.success("Zakceptowano");
      })
      .catch((error) => {
        toast.error("Wystąpił błąd");
        console.log(error);
      });
  };

  const hideOpinion = () => {
    jwtInterceptor
      .post(`CarOpinion/hide/${opinion.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        onChange(opinion.id, false);
        toast.success("Ukryto opinię");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Wystąpił błąd");
      });
  };

  const deleteOpinion = () => {
    jwtInterceptor
      .delete(`CarOpinion/${opinion.id}`)
      .then((data) => {
        onDelete(opinion.id);
        toast.success("Usunięto");
      })
      .catch((error) => {
        toast.error("Wystąpił błąd");
        console.log(error);
      });
  };

  return (
    <Card className="p-1">
      <Card.Header>Opinia</Card.Header>
      <Card.Body>
        <Row>
          <Col xl={6}>Tytuł:</Col>
          <Col xl="auto">Ocena:</Col>
          <Col xl={3}>{opinion.mark}</Col>
          <Col className="ms-2">{opinion.title}</Col>
        </Row>
        <Row className="mt-3">
          <Col xl={12}>Opinia:</Col>
          <Col className="ms-2">{opinion.text}</Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <label className="p-1">Zaakceptowana: </label>
            <input
              type="checkbox"
              checked={opinion.isAccepted}
              onChange={toggleAccepted}
              style={{ width: 18, height: 18 }}
            />
          </Col>
          <Col xl={4}>
            <Button variant="danger" onClick={deleteOpinion} className="w-100">
              Usuń
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default ManageOpinion;
