/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { useLocation, NavLink } from "react-router-dom";

import { Nav } from "react-bootstrap";
import styles from "./Sidebar.module.css";
import DropdownList from "./DropDownList";

function Sidebar({ hide, color, image }) {
  const rentals = [
    { name: "Zamówienia", path: "/rentals" },
    { name: "Opinie", path: "/opinion" },
    { name: "Zlecenia", path: "/workOrder" },
    { name: "O firmie", path: "/company" },
    { name: "Newsletter", path: "/newsletter" },
    { name: "Raporty", path: "/report" },
    { name: "Wiadomości", path: "/messages" },
  ];
  const pages = [
    { name: "Strona Główna", path: "/cms/home" },
    { name: "Footer", path: "/cms/footer" },
    { name: "Kontakt", path: "/cms/contact" },
  ];
  const carPages = [
    { name: "Samochody", path: "/cars" },
    { name: "Dodaj", path: "/cars/add" },
    { name: "Wyposażenie", path: "car/equipment" },
    { name: "Marki", path: "/cars/makes" },
    { name: "Silniki", path: "/cars/engines" },
    { name: "Typy", path: "/cars/types" },
    { name: "Typy napędu", path: "/cars/cardrives" },
    { name: "Skrzynia biegów", path: "/cars/gearbox" },
    { name: "Klimatyzacje", path: "/cars/AirConditioning" },
    { name: "Limity kilometrów", path: "/cars/limits" },
  ];
  const usersPages = [
    { name: "Użytkownicy", path: "/users/users" },
    { name: "Pracownicy", path: "/users/workers" },
  ];
  const managment = [
    { name: "Statusy Wypozyczeń", path: "/rental/status" },
    { name: "Statusy Faktur", path: "/invoice/status" },
    { name: "Zlecenia Statusy", path: "/workOrder/statuses" },
    { name: "Zlecenia Priorytety", path: "/workOrder/priority" },
  ];

  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  return (
    <div
      className={`${styles.newSidebar} sidebar } ${
        hide ? styles.moveSidebar : ""
      }`}
      data-image={image}
      data-color={color}
    >
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")",
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a href="#" className="simple-text logo-mini mx-1">
            <div className="logo-img">
              {/* <img src={require("assets/img/reactlogo.png")} alt="..." /> */}
            </div>
          </a>
          <NavLink to={`/`} className={`${styles.navLink}`}>
            <p>Administrator</p>
          </NavLink>
        </div>
        <Nav>
          <li
            className={
              false ? "active active-pro" : activeRoute("admin/upgrade")
            }
          ></li>
          <li>
            <DropdownList
              title="Firma"
              icon="nc-icon nc-alien-33"
              pages={rentals}
            />
          </li>
          <li>
            <DropdownList
              title="Użytkownicy"
              icon="nc-icon nc-alien-33"
              pages={usersPages}
            />
          </li>
          <li>
            <DropdownList
              title="Samochód"
              icon="fa-solid fa-car"
              pages={carPages}
            />
          </li>
          <li>
            <DropdownList
              title="Strona"
              icon="fa-regular fa-file-lines"
              pages={pages}
            />
          </li>
          <li>
            <DropdownList
              title="Ustawienia"
              icon="fa-regular fa-file-lines"
              pages={managment}
            />
          </li>
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
