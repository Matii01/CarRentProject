import { Accordion, Card, Row, Col, Button } from "react-bootstrap";
import EditSidebarCheckbox from "./EditSidebarCheckbox";
import { useEffect, useState } from "react";
import jwtInterceptor from "../../utils/jwtInterceptor";

function EditWorkerSidebar({ workerId }) {
  const [allPages, setAllPages] = useState([]);

  useEffect(() => {
    getWorkerSidebar();
  }, [workerId]);

  const getWorkerSidebar = () => {
    jwtInterceptor
      .get(`WorkerSidebar/GetWorkerSidebarForEdit/${workerId}`)
      .then((data) => {
        console.log(data.data);
        setAllPages(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCheckboxChange = (event, mainCategory) => {
    const name = event.target.name;
    const value = event.target.checked;
    console.log(mainCategory + " " + name + " " + value);

    const stateCopy = getCopy();

    if (name === "Katrgoria") {
      stateCopy.forEach((item) => {
        if (item.title === mainCategory) {
          item.isActive = value;
        }
      });
      setAllPages(stateCopy);
    } else {
      stateCopy.forEach((item) => {
        if (item.title === mainCategory) {
          console.log("found children");
          item.children.forEach((child) => {
            if (child.name === name) {
              child.isActive = value;
              console.log("seted");
            }
          });
        }
      });
      setAllPages(stateCopy);
    }
  };

  const getCopy = () => {
    return JSON.parse(JSON.stringify(allPages));
  };

  const onSaveClick = () => {
    console.log(allPages);

    const url = `WorkerSidebar/EditWorkerSidebar/${workerId}`;

    jwtInterceptor
      .post(url, JSON.stringify(allPages), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const generateWorkerMenu = () => {
    //GenerateWorkerSidebar/{workerId}
    jwtInterceptor
      .post(
        `WorkerSidebar/GenerateWorkerSidebar/${workerId}`,
        JSON.stringify(genereateNew),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        console.log(data);
        getWorkerSidebar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card>
      <Card.Header>Edytuj menu boczne</Card.Header>
      {!allPages.length > 0 && (
        <Card.Body>
          <Row>
            <Col>
              <Button variant="dark" size="sm" onClick={generateWorkerMenu}>
                Wygeenruj menu
              </Button>
            </Col>
          </Row>
        </Card.Body>
      )}
      {allPages.length > 0 && (
        <Card.Body>
          <Row>
            <Col>
              <Button onClick={onSaveClick}>Zapisz</Button>
            </Col>
          </Row>
          <Row></Row>
          <Row>
            <Accordion>
              <Accordion.Header>Firma</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col sm={3}>Katrgoria: </Col>
                  <Col>
                    <input
                      type="checkbox"
                      title="clickmey"
                      name="Katrgoria"
                      checked={
                        allPages.find((i) => i.title === "Firma").isActive
                      }
                      onChange={(event) => handleCheckboxChange(event, "Firma")}
                    />
                  </Col>
                </Row>
                <EditSidebarCheckbox
                  name="Zamówienia"
                  mainCategory="Firma"
                  item={allPages
                    .find((i) => i.title === "Firma")
                    .children.find((i) => i.name == "Zamówienia")}
                  onChange={handleCheckboxChange}
                />
                <EditSidebarCheckbox
                  name="Opinie"
                  mainCategory="Firma"
                  item={allPages
                    .find((i) => i.title === "Firma")
                    .children.find((i) => i.name == "Opinie")}
                  onChange={handleCheckboxChange}
                />
                <EditSidebarCheckbox
                  name="Zlecenia"
                  mainCategory="Firma"
                  item={allPages
                    .find((i) => i.title === "Firma")
                    .children.find((i) => i.name == "Zlecenia")}
                  onChange={handleCheckboxChange}
                />
                <EditSidebarCheckbox
                  name="O firmie"
                  mainCategory="Firma"
                  item={allPages
                    .find((i) => i.title === "Firma")
                    .children.find((i) => i.name == "O firmie")}
                  onChange={handleCheckboxChange}
                />
                <EditSidebarCheckbox
                  name="Newsletter"
                  mainCategory="Firma"
                  item={allPages
                    .find((i) => i.title === "Firma")
                    .children.find((i) => i.name == "Newsletter")}
                  onChange={handleCheckboxChange}
                />
              </Accordion.Body>
            </Accordion>
          </Row>
          <Row>
            <Accordion>
              <Accordion.Header>Użytkownicy</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col sm={3}>Katrgoria: </Col>
                  <Col>
                    <input
                      type="checkbox"
                      title="clickmey"
                      name="Katrgoria"
                      checked={
                        allPages.find((i) => i.title === "Użytkownicy").isActive
                      }
                      onChange={(event) =>
                        handleCheckboxChange(event, "Użytkownicy")
                      }
                    />
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col sm={3} className="text-end">
                    Użytkownicy:
                  </Col>
                  <Col>
                    <input
                      className="ms-2"
                      type="checkbox"
                      title="clickmey"
                      name="Użytkownicy"
                      checked={
                        allPages
                          .find((i) => i.title === "Użytkownicy")
                          .children.find((i) => i.name === "Użytkownicy")
                          .isActive
                      }
                      onChange={(event) =>
                        handleCheckboxChange(event, "Użytkownicy")
                      }
                    />
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col sm={3} className="text-end">
                    Pracownicy:
                  </Col>
                  <Col>
                    <input
                      className="ms-2"
                      type="checkbox"
                      title="clickmey"
                      name="Pracownicy"
                      checked={
                        allPages
                          .find((i) => i.title === "Użytkownicy")
                          .children.find((i) => i.name === "Pracownicy")
                          .isActive
                      }
                      onChange={(event) =>
                        handleCheckboxChange(event, "Użytkownicy")
                      }
                    />
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion>
          </Row>
          <Row>
            <Accordion>
              <Accordion.Header>Samochód</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col sm={3}>Katrgoria: </Col>
                  <Col>
                    <input
                      type="checkbox"
                      title="clickmey"
                      name="Katrgoria"
                      checked={
                        allPages.find((i) => i.title === "Samochody").isActive
                      }
                      onChange={(event) =>
                        handleCheckboxChange(event, "Samochody")
                      }
                    />
                  </Col>
                </Row>
                <EditSidebarCheckbox
                  name="Samochody"
                  mainCategory="Samochody"
                  item={allPages
                    .find((i) => i.title === "Samochody")
                    .children.find((i) => i.name == "Samochody")}
                  onChange={handleCheckboxChange}
                />
                <EditSidebarCheckbox
                  name="Dodaj"
                  mainCategory="Samochody"
                  item={allPages
                    .find((i) => i.title === "Samochody")
                    .children.find((i) => i.name == "Dodaj")}
                  onChange={handleCheckboxChange}
                />
                <EditSidebarCheckbox
                  name="Wyposażenie"
                  mainCategory="Samochody"
                  item={allPages
                    .find((i) => i.title === "Samochody")
                    .children.find((i) => i.name == "Wyposażenie")}
                  onChange={handleCheckboxChange}
                />
                <EditSidebarCheckbox
                  name="Marki"
                  mainCategory="Samochody"
                  item={allPages
                    .find((i) => i.title === "Samochody")
                    .children.find((i) => i.name == "Marki")}
                  onChange={handleCheckboxChange}
                />
                <EditSidebarCheckbox
                  name="Silniki"
                  mainCategory="Samochody"
                  item={allPages
                    .find((i) => i.title === "Samochody")
                    .children.find((i) => i.name == "Silniki")}
                  onChange={handleCheckboxChange}
                />
                <EditSidebarCheckbox
                  name="Typy"
                  mainCategory="Samochody"
                  item={allPages
                    .find((i) => i.title === "Samochody")
                    .children.find((i) => i.name == "Typy")}
                  onChange={handleCheckboxChange}
                />
                <EditSidebarCheckbox
                  name="Typy napędu"
                  mainCategory="Samochody"
                  item={allPages
                    .find((i) => i.title === "Samochody")
                    .children.find((i) => i.name == "Typy napędu")}
                  onChange={handleCheckboxChange}
                />
                <EditSidebarCheckbox
                  name="Skrzynia biegów"
                  mainCategory="Samochody"
                  item={allPages
                    .find((i) => i.title === "Samochody")
                    .children.find((i) => i.name == "Skrzynia biegów")}
                  onChange={handleCheckboxChange}
                />
                <EditSidebarCheckbox
                  name="Klimatyzacje"
                  mainCategory="Samochody"
                  item={allPages
                    .find((i) => i.title === "Samochody")
                    .children.find((i) => i.name == "Klimatyzacje")}
                  onChange={handleCheckboxChange}
                />
                <EditSidebarCheckbox
                  name="Limity kilometrów"
                  mainCategory="Samochody"
                  item={allPages
                    .find((i) => i.title === "Samochody")
                    .children.find((i) => i.name == "Limity kilometrów")}
                  onChange={handleCheckboxChange}
                />
              </Accordion.Body>
            </Accordion>
          </Row>
          <Row>
            <Accordion>
              <Accordion.Header>Strona</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col sm={3}>Katrgoria: </Col>
                  <Col>
                    <input
                      type="checkbox"
                      title="clickmey"
                      name="Katrgoria"
                      checked={
                        allPages.find((i) => i.title === "Strona").isActive
                      }
                      onChange={(event) =>
                        handleCheckboxChange(event, "Strona")
                      }
                    />
                  </Col>
                </Row>
                <EditSidebarCheckbox
                  name="Strona Główna"
                  mainCategory="Strona"
                  item={allPages
                    .find((i) => i.title === "Strona")
                    .children.find((i) => i.name == "Strona Główna")}
                  onChange={handleCheckboxChange}
                />

                <EditSidebarCheckbox
                  name="Footer"
                  mainCategory="Strona"
                  item={allPages
                    .find((i) => i.title === "Strona")
                    .children.find((i) => i.name == "Footer")}
                  onChange={handleCheckboxChange}
                />
                <EditSidebarCheckbox
                  name="Kontakt"
                  mainCategory="Strona"
                  item={allPages
                    .find((i) => i.title === "Strona")
                    .children.find((i) => i.name == "Kontakt")}
                  onChange={handleCheckboxChange}
                />
              </Accordion.Body>
            </Accordion>
          </Row>
          <Row>
            <Accordion>
              <Accordion.Header>Ustawienia</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col sm={3}>Katrgoria: </Col>
                  <Col>
                    <input
                      type="checkbox"
                      title="clickmey"
                      name="Katrgoria"
                      checked={
                        allPages.find((i) => i.title === "Ustawienia").isActive
                      }
                      onChange={(event) =>
                        handleCheckboxChange(event, "Ustawienia")
                      }
                    />
                  </Col>
                </Row>
                <EditSidebarCheckbox
                  name="Statusy Wypozyczeń"
                  mainCategory="Ustawienia"
                  item={allPages
                    .find((i) => i.title === "Ustawienia")
                    .children.find((i) => i.name == "Statusy Wypozyczeń")}
                  onChange={handleCheckboxChange}
                />
                <EditSidebarCheckbox
                  name="Statusy Faktur"
                  mainCategory="Ustawienia"
                  item={allPages
                    .find((i) => i.title === "Ustawienia")
                    .children.find((i) => i.name == "Statusy Faktur")}
                  onChange={handleCheckboxChange}
                />
                <EditSidebarCheckbox
                  name="Zlecenia Statusy"
                  mainCategory="Ustawienia"
                  item={allPages
                    .find((i) => i.title === "Ustawienia")
                    .children.find((i) => i.name == "Zlecenia Statusy")}
                  onChange={handleCheckboxChange}
                />
                <EditSidebarCheckbox
                  name="Zlecenia Priorytety"
                  mainCategory="Ustawienia"
                  item={allPages
                    .find((i) => i.title === "Ustawienia")
                    .children.find((i) => i.name == "Zlecenia Priorytety")}
                  onChange={handleCheckboxChange}
                />
              </Accordion.Body>
            </Accordion>
          </Row>
        </Card.Body>
      )}
    </Card>
  );
}

export default EditWorkerSidebar;

const genereateNew = [
  {
    title: "Firma",
    icon: "nc-icon nc-alien-33",
    isActive: false,
    children: [
      { name: "Zamówienia", path: "/rentals", isActive: false },
      { name: "Opinie", path: "/opinion", isActive: false },
      { name: "Zlecenia", path: "/workOrder", isActive: false },
      { name: "O firmie", path: "/company", isActive: false },
      { name: "Newsletter", path: "/newsletter", isActive: false },
    ],
  },
  {
    title: "Użytkownicy",
    icon: "nc-icon nc-alien-33",
    isActive: false,
    children: [
      { name: "Użytkownicy", path: "/users/users", isActive: false },
      { name: "Pracownicy", path: "/users/workers", isActive: false },
    ],
  },
  {
    title: "Samochody",
    icon: "nc-icon nc-alien-33",
    isActive: false,
    children: [
      { name: "Samochody", path: "/cars", isActive: false },
      { name: "Dodaj", path: "/cars/add", isActive: false },
      { name: "Wyposażenie", path: "car/equipment", isActive: false },
      { name: "Marki", path: "/cars/makes", isActive: false },
      { name: "Silniki", path: "/cars/engines", isActive: false },
      { name: "Typy", path: "/cars/types", isActive: false },
      { name: "Typy napędu", path: "/cars/cardrives", isActive: false },
      { name: "Skrzynia biegów", path: "/cars/gearbox", isActive: false },
      {
        name: "Klimatyzacje",
        path: "/cars/AirConditioning",
        isActive: false,
      },
      { name: "Limity kilometrów", path: "/cars/limits", isActive: false },
    ],
  },
  {
    title: "Strona",
    icon: "nc-icon nc-alien-33",
    isActive: false,
    children: [
      { name: "Strona Główna", path: "/cms/home", isActive: false },
      { name: "Footer", path: "/cms/footer", isActive: false },
      { name: "Kontakt", path: "/cms/contact", isActive: false },
    ],
  },
  {
    title: "Ustawienia",
    icon: "nc-icon nc-alien-33",
    isActive: false,
    children: [
      { name: "Statusy Wypozyczeń", path: "/rental/status", isActive: false },
      { name: "Statusy Faktur", path: "/invoice/status", isActive: false },
      {
        name: "Zlecenia Statusy",
        path: "/workOrder/statuses",
        isActive: false,
      },
      {
        name: "Zlecenia Priorytety",
        path: "/workOrder/priority",
        isActive: false,
      },
    ],
  },
];

/* 
{
    title: "Analizy",
    icon: "nc-icon nc-alien-33",
    isActive: false,
    children: [
      { name: "Samochodów", path: "/analyses/car", isActive: false },
      { name: "Klientów", path: "/analyses/users", isActive: false },
    ],
  },
*/
