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

import { Button, Nav, NavDropdown } from "react-bootstrap";
import styles from "./Sidebar.module.css";
import DropdownList from "./DropDownList";

function Sidebar({ hide, toggleSidebar, color, image, routes }) {
  const pages = [
    { name: "Strona Główna", path: "" },
    { name: "Menu", path: "" },
    { name: "Footer", path: "" },
    { name: "Footer", path: "" },
  ];
  const carPages = [
    { name: "Samochody", path: "/cars" },
    { name: "Dodaj", path: "/cars/add" },
    { name: "Silniki", path: "/cars/engines" },
    { name: "Kalendarz", path: "/cars/calendar" },
    { name: "Typy", path: "" },
    { name: "Klimatyzacje", path: "" },
    { name: "Limity kilometrów", path: "" },
  ];

  const usersPages = [
    { name: "Samochody", path: "/cars" },
    { name: "Dodaj", path: "/cars/add" },
    { name: "Action", path: "" },
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
          <a className="simple-text" href="#">
            Car Rent
          </a>
        </div>
        <Nav>
          <li
            className={
              false ? "active active-pro" : activeRoute("admin/upgrade")
            }
          >
            <NavLink to={"#"} className="nav-link">
              <i className={"nc-icon nc-alien-33"} />
              <p>Dashboard</p>
            </NavLink>
          </li>
          <li
            className={
              false ? "active active-pro" : activeRoute("admin/upgrade")
            }
          >
            <NavLink to={"#"} className="nav-link">
              <i className={"nc-icon nc-alien-33"} />
              <p>Użytkownicy</p>
            </NavLink>
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
            <NavLink to={"#"} className="nav-link">
              <i className={"nc-icon nc-alien-33"} />
              <p>Strona</p>
            </NavLink>
          </li>
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;

/*
<li
    className={
      true ? "active active-pro" : activeRoute("/admin/upgrade")
    }
  >
    <NavLink to={"admin/upgrade"} className="nav-link">
      {/* <i className={"prop.icon"} /> }

      <p>adsa</p>
    </NavLink>
  </li>
*/