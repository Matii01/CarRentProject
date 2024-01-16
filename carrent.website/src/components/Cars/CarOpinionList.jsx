import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosConfig";
import { Col, Row } from "react-bootstrap";

function CarOpinionList({ carid }) {
  const [list, setList] = useState([]);
  useEffect(() => {
    axiosInstance
      .get(`https://localhost:7091/CarOpinion/${carid}`)
      .then((data) => {
        console.log(data);
        setList(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {list.map((it) => (
        <>
          <Row key={it.id} className="mb-2">
            <Col xl={3}>
              <Row className="h-50">
                <Col className="d-flex justify-content-center">
                  {it.userName}
                </Col>
              </Row>
              <Row>
                <Col className="d-flex justify-content-center">
                  {it.addedDate}
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Col>{it.title}</Col>
              </Row>
              <Row>
                <Col>
                  <GenrateStars number={it.mark} />
                </Col>
              </Row>
              <Row>
                <Col>{it.text}</Col>
              </Row>
            </Col>
          </Row>
          <hr />
        </>
      ))}
    </>
  );
}

function GenrateStars({ number }) {
  const stars = [];

  for (let i = 0; i < number; i++) {
    stars.push(<i key={i} className="fa-regular fa-star"></i>);
  }

  return <div>{stars}</div>;
}

export default CarOpinionList;
