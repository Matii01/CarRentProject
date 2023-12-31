import React, { Component, useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";

import { Button, Nav, NavDropdown } from "react-bootstrap";
import styles from "./Sidebar.module.css";
import DropdownList from "./DropDownList";
import jwtInterceptor from "../../utils/jwtInterceptor";

function WorkerSidebar({ hide, toggleSidebar, color, image, routes }) {
  const [allPages, setAllPages] = useState([]);

  useEffect(() => {
    getWorkerSidebar();
  }, []);

  const getWorkerSidebar = () => {
    jwtInterceptor
      .get(`WorkerSidebar/GetWorkerSidebar`)
      .then((data) => {
        console.log(data.data);
        setAllPages(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
              {item.isActive && (
                <DropdownList
                  title={item.title}
                  pages={item.children.filter((x) => x.isActive == true)}
                  icon={item.icon}
                />
              )}
            </li>
          ))}
        </Nav>
      </div>
    </div>
  );
}

export default WorkerSidebar;

/* 
const allPages = [
    {
      title: "Analizy",
      icon: "nc-icon nc-alien-33",
      isActive: false,
      children: [],
    },
    {
      title: "Zamówienia",
      icon: "nc-icon nc-alien-33",
      children: [{ name: "Wypozyczenia", path: "/rentals", isActive: false }],
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
        { name: "Marki", path: "/cars/makes", isActive: false },
        { name: "Silniki", path: "/cars/engines", isActive: false },
        { name: "Typy", path: "/cars/types" },
        { name: "Typy napędu", path: "/cars/cardrives", isActive: false },
        { name: "Skrzynia biegów", path: "/cars/gearbox", isActive: false },
        {
          name: "Klimatyzacje",
          path: "/cars/AirConditioning",
          isActive: false,
        },
        { name: "Limity kilometrów", path: "/cars/limits", isActive: false },
        { name: "Kalendarz", path: "/cars/calendar", isActive: false },
      ],
    },
    {
      title: "Strona",
      icon: "nc-icon nc-alien-33",
      isActive: false,
      children: [
        { name: "Strona Główna", path: "", isActive: false },
        { name: "Menu", path: "", isActive: false },
        { name: "Footer", path: "", isActive: false },
        { name: "Footer", path: "", isActive: false },
      ],
    },
    {
      title: "Ustawienia",
      icon: "nc-icon nc-alien-33",
      isActive: false,
      children: [
        { name: "Statusy Wypozyczeń", path: "/rental/status", isActive: false },
      ],
    },
    {
      title: "Temp",
      icon: "nc-icon nc-alien-33",
      isActive: false,
      children: [],
    },
  ];
*/
