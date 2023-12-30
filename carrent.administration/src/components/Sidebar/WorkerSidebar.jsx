import React, { Component, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";

import { Button, Nav, NavDropdown } from "react-bootstrap";
import styles from "./Sidebar.module.css";
import DropdownList from "./DropDownList";

function WorkerSidebar({ hide, toggleSidebar, color, image, routes }) {
  useEffect(() => {
    getWorkerSidebar();
  }, []);

  const getWorkerSidebar = () => {};

  const allPages = [
    { title: "Analizy", icon: "nc-icon nc-alien-33", children: [] },
    {
      title: "Zamówienia",
      icon: "nc-icon nc-alien-33",
      children: [{ name: "Wypozyczenia", path: "/rentals" }],
    },
    {
      title: "Użytkownicy",
      icon: "nc-icon nc-alien-33",
      children: [
        { name: "Użytkownicy", path: "/users/users" },
        { name: "Pracownicy", path: "/users/workers" },
      ],
    },
    {
      title: "Samochody",
      icon: "nc-icon nc-alien-33",
      children: [
        { name: "Samochody", path: "/cars" },
        { name: "Dodaj", path: "/cars/add" },
        { name: "Marki", path: "/cars/makes" },
        { name: "Silniki", path: "/cars/engines" },
        { name: "Typy", path: "/cars/types" },
        { name: "Typy napędu", path: "/cars/cardrives" },
        { name: "Skrzynia biegów", path: "/cars/gearbox" },
        { name: "Klimatyzacje", path: "/cars/AirConditioning" },
        { name: "Limity kilometrów", path: "/cars/limits" },
        { name: "Kalendarz", path: "/cars/calendar" },
      ],
    },
    {
      title: "Strona",
      icon: "nc-icon nc-alien-33",
      children: [
        { name: "Strona Główna", path: "" },
        { name: "Menu", path: "" },
        { name: "Footer", path: "" },
        { name: "Footer", path: "" },
      ],
    },
    {
      title: "Ustawienia",
      icon: "nc-icon nc-alien-33",
      children: [{ name: "Statusy Wypozyczeń", path: "/rental/status" }],
    },
    { title: "Temp", icon: "nc-icon nc-alien-33", children: [] },
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
          <a
            className="simple-text"
            href="#"
            style={{ textDecoration: "none" }}
          >
            Car Rent worker
          </a>
        </div>
        <Nav>
          {allPages.map((item) => (
            <li key={item.title}>
              <DropdownList
                title={item.title}
                pages={item.children}
                icon={item.icon}
              />
            </li>
          ))}
        </Nav>
      </div>
    </div>
  );
}

export default WorkerSidebar;
