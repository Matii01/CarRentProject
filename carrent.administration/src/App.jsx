import React, { useState } from "react";
import { useLocation, Outlet } from "react-router-dom";

import AdminNavbar from "./components/Navbars/AdminNavbar";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.css";

//import routes from "routes.js";
import routes from "./routes";
import sidebarImage from "./assets/img/sidebar-3.jpg";
import { Button } from "react-bootstrap";

function App() {
  const [hasImage, setHasImage] = React.useState(true);
  const [hideSidebar, setHideSidebar] = useState(false);

  const color = "black";
  const image = sidebarImage;
  const mainPanel = React.useRef(null);

  const toggleSidebar = () => {
    setHideSidebar(!hideSidebar);
  };

  return (
    <>
      <div className="wrapper">
        <Sidebar
          hide={hideSidebar}
          toggleSidebar={toggleSidebar}
          color={color}
          image={hasImage ? image : ""}
          routes={routes}
        />
        <div
          className={`main-panel ${hideSidebar ? "hide-sidebar" : ""}`}
          ref={mainPanel}
        >
          <Button
            onClick={toggleSidebar}
            style={{
              position: "absolute",
              backgroundColor: "lightgray",
              opacity: "1",
              top: "15px",
              left: "0px",
              zIndex: 1,
            }}
          >
            Click
          </Button>
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
