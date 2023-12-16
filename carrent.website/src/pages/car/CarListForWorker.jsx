import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CarListForWorker() {
  const navigate = useNavigate();
  const [cars, setCars] = useState();

  useEffect(() => {
    fetchCarList();
  }, []);

  const fetchCarList = () => {
    fetch("https://localhost:7091/car/workerCars")
      .then((response) => {
        if (!response.ok) {
          throw new Error("");
        }
        return response.json();
      })
      .then((data) => {
        setCars(data);
        console.log(data);
      })
      .catch((error) => {
        console.log("error fetching the makes: ", error);
      });
  };
  const handleRowDoubleClick = (id) => {
    navigate(`/car/${id}`);
  };
  return (
    <Container className="mt-3">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Make</th>
            <th>Engine</th>
            <th>Gearbox</th>
            <th>Ac</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cars != null &&
            cars.map((car, index) => (
              <tr
                key={index}
                onDoubleClick={() => handleRowDoubleClick(car.id)}
              >
                <td>{car.id}</td>
                <td>{car.name}</td>
                <td>{car.make}</td>
                <td>{car.engine}</td>
                <td>{car.gearbox}</td>
                <td>{car.ac}</td>
                <td>{car.price}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default CarListForWorker;
