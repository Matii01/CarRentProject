import React, { useEffect, useState } from "react";
import { useLocation, Outlet, useNavigate } from "react-router-dom";

import AdminNavbar from "./components/Navbars/AdminNavbar";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.css";

//import routes from "routes.js";
import routes from "./routes";
import sidebarImage from "./assets/img/sidebar-3.jpg";
import { Button } from "react-bootstrap";
import WorkerSidebar from "./components/Sidebar/WorkerSidebar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserName, setUserRoles } from "./shared/userSlice";
import jwtInterceptor from "./utils/jwtInterceptor";
import AccessDenied from "./pages/login/AccessDenied";
import useRefreshToken from "./hooks/UseRefreshToken";

function App() {
  const [hasImage, setHasImage] = React.useState(true);
  const [hideSidebar, setHideSidebar] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const color = "black";
  const image = sidebarImage;
  const mainPanel = React.useRef(null);

  useRefreshToken();

  const toggleSidebar = () => {
    setHideSidebar(!hideSidebar);
  };

  const user = useSelector((state) => state.user);

  const isAdmin = user.role.includes("Administrator");
  const isWorker = user.role.includes("Worker");

  const goToLogin = () => {
    navigate("/login");
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

// function setData(data) {
//   localStorage.setItem("accessToken", data.token.accessToken);
//   localStorage.setItem("refreshToken", data.token.refreshToken);
//   dispatch(setUserName({ userName: data.userName }));
//   dispatch(setUserRoles({ role: data.role }));
// }

// if (user.userName === "") {
//   console.log("not login");
//   const refreshToken = localStorage.getItem("refreshToken");
//   const accessToken = localStorage.getItem("accessToken");

//   jwtInterceptor
//     .post(`token/retrieve`, JSON.stringify({ accessToken, refreshToken }), {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//     .then((data) => {
//       console.log(data);
//       setData(data.data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

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
