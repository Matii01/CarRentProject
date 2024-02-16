import React, { useEffect, useState } from "react";
import { useLocation, Outlet, useNavigate } from "react-router-dom";

import AdminNavbar from "./components/Navbars/AdminNavbar";
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.css";

import sidebarImage from "./assets/img/sidebar-3.jpg";
import { Button } from "react-bootstrap";
import WorkerSidebar from "./components/Sidebar/WorkerSidebar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AccessDenied from "./pages/login/AccessDenied";
import useRefreshToken from "./hooks/UseRefreshToken";

function App() {
  const [hasImage, setHasImage] = React.useState(true);
  const [hideSidebar, setHideSidebar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const color = "black";
  const image = sidebarImage;
  const mainPanel = React.useRef(null);
  const user = useSelector((state) => state.user);
  const isAdmin = user.role.includes("Administrator");
  const isWorker = user.role.includes("Worker");

  useRefreshToken();

  useEffect(() => {
    if (location.pathname === "/" && !isAdmin && !isWorker) {
      navigate("/login");
    }
  }, []);

  const tryToRefreshToken = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    const accessToken = localStorage.getItem("accessToken");

    axios
      .post(
        `${config.API_URL}token/retrieve`,
        JSON.stringify({ accessToken, refreshToken }),
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        setLocalStorage(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleSidebar = () => {
    setHideSidebar(!hideSidebar);
  };

  return (
    <>
      {isAdmin && (
        <div className="wrapper">
          <Sidebar
            hide={hideSidebar}
            toggleSidebar={toggleSidebar}
            color={color}
            image={hasImage ? image : ""}
          />
          <div
            className={`main-panel ${hideSidebar ? "hide-sidebar" : ""}`}
            ref={mainPanel}
          >
            <Button
              onClick={toggleSidebar}
              style={{
                position: "absolute",
                backgroundColor: "transparent",
                borderColor: "transparent",
                color: "black",
                opacity: "1",
                top: "15px",
                left: "0px",
                zIndex: 1,
              }}
            >
              <i className="fa-solid fa-bars"></i>
            </Button>
            <AdminNavbar />
            <div className="content">
              <Outlet />
            </div>
          </div>
        </div>
      )}
      {!isAdmin && isWorker && (
        <div className="wrapper">
          <WorkerSidebar
            hide={hideSidebar}
            toggleSidebar={toggleSidebar}
            color={color}
            image={hasImage ? image : ""}
          />
          <div
            className={`main-panel ${hideSidebar ? "hide-sidebar" : ""}`}
            ref={mainPanel}
          >
            <Button
              onClick={toggleSidebar}
              style={{
                position: "absolute",
                backgroundColor: "transparent",
                borderColor: "transparent",
                color: "black",
                opacity: "1",
                top: "15px",
                left: "0px",
                zIndex: 1,
              }}
            >
              <i className="fa-solid fa-bars"></i>
            </Button>
            <AdminNavbar />
            <div className="content">
              <Outlet />
            </div>
          </div>
        </div>
      )}
      {!isAdmin && !isWorker && (
        <div className="wrapper">
          <AccessDenied />
        </div>
      )}
    </>
  );
}

export default App;
