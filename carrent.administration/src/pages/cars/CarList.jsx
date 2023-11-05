import { Container, Table } from "react-bootstrap";
import useFetch from "../../hooks/fetchData";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useNavigate } from "react-router";

function CarList() {
  const navigate = useNavigate();

  const { data, loading, error } = useFetch(
    "https://localhost:7091/car/workerCars"
  );

  const handleRowDoubleClick = (carId) => {
    console.log(`double click ${carId}`);
    navigate(`/car/details/${carId}`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>Error</p>;
  }

  return (
    <>
      <Container>
        <Table>
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
            {data != null &&
              data.map((car, index) => (
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
    </>
  );
}

export default CarList;
