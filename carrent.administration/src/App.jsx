import React, { Component } from "react";
import { useLocation, Route, Outlet } from "react-router-dom";

import AdminNavbar from "./components/Navbars/AdminNavbar";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import FixedPlugin from "./components/FixedPlugin/FixedPlugin";

//import routes from "routes.js";
import routes from "./routes";

import sidebarImage from "./assets/img/sidebar-3.jpg";
import { Col, Container, Row } from "react-bootstrap";

function App() {
  const [color, setColor] = React.useState("black");
  const [image, setImage] = React.useState(sidebarImage);
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
  const mainPanel = React.useRef(null);

  return (
    <>
      <div className="wrapper">
        <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;

/*<>
  <div className="wrapper">
    <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
    <div className="main-panel" ref={mainPanel}>
      <AdminNavbar />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  </div>
</> */
