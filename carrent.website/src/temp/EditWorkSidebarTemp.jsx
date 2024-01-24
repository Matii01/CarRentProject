<>
  <Row>
    <Accordion>
      <Accordion.Header>Zamówienia</Accordion.Header>
      <Accordion.Body>
        <Row>
          <Col sm={3}>Katrgoria: </Col>
          <Col>
            <input
              type="checkbox"
              title="clickmey"
              name="Firma"
              checked={allPages.find((i) => i.title === "Firma").isActive}
              onChange={(event) => handleCheckboxChange(event, "Firma")}
            />
          </Col>
        </Row>
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
              checked={allPages.find((i) => i.title === "Użytkownicy").isActive}
              onChange={(event) => handleCheckboxChange(event, "Użytkownicy")}
            />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col sm={3} className="text-end">
            Użytkownicy:{" "}
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
                  .children.find((i) => i.name === "Użytkownicy").isActive
              }
              onChange={(event) => handleCheckboxChange(event, "Użytkownicy")}
            />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col sm={3} className="text-end">
            Pracownicy:{" "}
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
                  .children.find((i) => i.name === "Pracownicy").isActive
              }
              onChange={(event) => handleCheckboxChange(event, "Użytkownicy")}
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
              checked={allPages.find((i) => i.title === "Samochody").isActive}
              onChange={(event) => handleCheckboxChange(event, "Samochody")}
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
              checked={allPages.find((i) => i.title === "Strona").isActive}
              onChange={(event) => handleCheckboxChange(event, "Strona")}
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
          name="Menu"
          mainCategory="Strona"
          item={allPages
            .find((i) => i.title === "Strona")
            .children.find((i) => i.name == "Menu")}
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
              checked={allPages.find((i) => i.title === "Ustawienia").isActive}
              onChange={(event) => handleCheckboxChange(event, "Ustawienia")}
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
      </Accordion.Body>
    </Accordion>
  </Row>
</>;
