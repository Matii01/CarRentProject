import { useEffect, useState } from "react";
import { Card, Form, Row, Col, Button, Table } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";

function Permissions({ workerId }) {
  const [workerPermissions, setWorkerPermissions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    jwtInterceptor
      .get(`Users/GetWorkerPermissions/${workerId}`)
      .then((data) => {
        console.log(data);
        setWorkerPermissions(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [workerId]);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(workerPermissions);
  };

  const addPermission = (name) => {
    setIsLoading(true);
    jwtInterceptor
      .post(
        "Users/AddPermission",
        JSON.stringify({
          workerId: workerId,
          permission: name,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        console.log(data);
        setWorkerPermissions(data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const removePermission = (name) => {
    setIsLoading(true);
    jwtInterceptor
      .post(
        "Users/RemovePermission",
        JSON.stringify({
          workerId: workerId,
          permission: name,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        console.log(data);
        setWorkerPermissions(data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCheckboxChange = (event) => {
    console.log(event.target.checked + " " + event.target.name);

    if (event.target.checked) {
      addPermission(event.target.name);
    } else {
      removePermission(event.target.name);
    }
  };

  return (
    <Card>
      <Card.Header>Edytuj uprawnienia</Card.Header>
      <Card.Body>
        <Form onSubmit={onSubmit}>
          <Row className="mb-3"></Row>

          {!isLoading && (
            <Table bordered>
              <tbody className="text-center fs-6">
                <tr>
                  <td>Wyświetlanie użytkowników</td>
                  <td>
                    <input
                      className="m-2 btn-group-lg"
                      type="checkbox"
                      style={{ width: "15px", height: "15px" }}
                      name="UserViewer"
                      checked={workerPermissions.includes("UserViewer")}
                      onChange={handleCheckboxChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Edycja użytkowników</td>
                  <td>
                    <input
                      className="m-2"
                      type="checkbox"
                      style={{ width: "15px", height: "15px" }}
                      name="UserEditor"
                      onChange={handleCheckboxChange}
                      checked={workerPermissions.includes("UserEditor")}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Zarządzanie stroną</td>
                  <td>
                    <input
                      className="m-2"
                      type="checkbox"
                      style={{ width: "15px", height: "15px" }}
                      name="PageEditor"
                      onChange={handleCheckboxChange}
                      checked={workerPermissions.includes("PageEditor")}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Edycja cenników</td>
                  <td>
                    <input
                      className="m-2"
                      type="checkbox"
                      style={{ width: "15px", height: "15px" }}
                      name="PriceListEditor"
                      onChange={handleCheckboxChange}
                      checked={workerPermissions.includes("PriceListEditor")}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Dodawanie samochodów</td>
                  <td>
                    <input
                      className="m-2"
                      type="checkbox"
                      style={{ width: "15px", height: "15px" }}
                      name="CarAdd"
                      onChange={handleCheckboxChange}
                      checked={workerPermissions.includes("CarAdd")}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Edycja samochodów</td>
                  <td>
                    <input
                      className="m-2"
                      type="checkbox"
                      style={{ width: "15px", height: "15px" }}
                      name="CarEditor"
                      onChange={handleCheckboxChange}
                      checked={workerPermissions.includes("CarEditor")}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Edycja szczegółów</td>
                  <td>
                    <input
                      className="m-2"
                      type="checkbox"
                      style={{ width: "15px", height: "15px" }}
                      name="CarDetailsEditor"
                      onChange={handleCheckboxChange}
                      checked={workerPermissions.includes("CarDetailsEditor")}
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Permissions;

/* 
const handleCheckboxChange = (event) => {
    console.log(event.target.checked + " " + event.target.name);
    const newValue = event.target.name;

    if (event.target.checked) {
      setWorkerPermissions([...workerPermissions, newValue]);
    } else {
      const newList = [...workerPermissions.filter((x) => x == newValue)];
      setWorkerPermissions(newList);
    }
  };
*/
