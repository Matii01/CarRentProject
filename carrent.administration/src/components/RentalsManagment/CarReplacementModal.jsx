import Modal from "react-bootstrap/Modal";
import styles from "./../../components/Table/Table.module.css";
import { Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import transformObjectToQueryString from "./../../utils/transformObjectToQuery";
import jwtInterceptor from "../../utils/jwtInterceptor";

function CarReplacementModal({ showConfirmModal, onHide, items, ...props }) {
  const [showCarList, setShowCarList] = useState(false);
  const [carList, setCarList] = useState();
  const [rentalId, setRentalId] = useState();

  const onChangeClick = (rentalId, carId, start, end) => {
    setRentalId(rentalId);
    setShowCarList(true);
    if (carList == null) {
      getAvailableCars(start, end);
    }
  };

  const getAvailableCars = (start, end) => {
    const queryString = transformObjectToQueryString({
      DateFrom: start,
      DateTo: end,
    });
    jwtInterceptor
      .get(`car/carsForDates?${queryString}`)
      .then((data) => {
        console.log(data);
        console.log(data.data);
        setCarList(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const replaceCarInRental = (id) => {
    onHide();
    setShowCarList(false);
    showConfirmModal(rentalId, id);
  };

  return (
    <>
      <Modal
        onHide={onHide}
        {...props}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
        style={{ top: "50", height: "90%" }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Wymiana samochodu
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <table className={`${styles.table}`}>
                <thead>
                  <tr>
                    <th> </th>
                    <th></th>
                    <th>Samochód</th>
                    <th>Marka</th>
                    <th>Rabat</th>
                    <th>Cena</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items &&
                    items.map((it, key) => (
                      <tr key={key}>
                        <td>{it.rental.carId}</td>
                        <td>
                          <img
                            src={it.rental.carImage}
                            style={{ maxWidth: 150 }}
                          />
                        </td>
                        <td>{it.rental.carName}</td>
                        <td>{it.rental.carMark}</td>
                        <td>{it.rabat}</td>
                        <td>{it.gross}</td>
                        <td>
                          <Button
                            onClick={() =>
                              onChangeClick(
                                it.rental.rentalId,
                                it.rental.carId,
                                it.rental.rentalStart,
                                it.rental.rentalEnd
                              )
                            }
                          >
                            Wymień
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              {showCarList && carList && (
                <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                  <table
                    className={`${styles.table}`}
                    style={{ position: "static" }}
                  >
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th></th>
                        <th>Samochód</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {carList &&
                        carList.map((it, key) => (
                          <tr key={key}>
                            <td>{it.id}</td>
                            <td>
                              <img
                                src={it.carImage}
                                style={{ maxWidth: 150 }}
                              />
                            </td>
                            <td>{it.name}</td>
                            <td>
                              <Button onClick={() => replaceCarInRental(it.id)}>
                                Użyj
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CarReplacementModal;
