import React, { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";

import { Nav } from "react-bootstrap";
import styles from "./Sidebar.module.css";
import DropdownList from "./DropDownList";
import jwtInterceptor from "../../utils/jwtInterceptor";

function WorkerSidebar({ hide, color, image }) {
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
          <NavLink to={`/`} className={`${styles.navLink}`}>
            <p>Pracownik</p>
          </NavLink>
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
