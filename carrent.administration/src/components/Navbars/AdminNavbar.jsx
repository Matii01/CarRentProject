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
import { NavLink, useLocation } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setUserName, setUserRoles } from "../../shared/userSlice";

function Header() {
  const location = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    console.log("logout");
    localStorage.setItem("accessToken", "");
    localStorage.setItem("refreshToken", "");
    dispatch(setUserName({ userName: "" }));
    dispatch(setUserRoles({ role: [] }));
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" navbar>
            <Nav.Item>
              <Nav.Link
                className="m-0"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="no-icon ms-5">Account</span>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                className="m-0"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="no-icon">Log out</span>
              </Nav.Link>
            </Nav.Item>
            {/* 
            <NavLink to={"#"} className="nav-link">
              <i className={"nc-icon nc-alien-33"} />
              <p>Analizy</p>
            </NavLink>*/}
            <Nav.Item>
              <NavLink
                to="#"
                className="nav-link m-0"
                as={Nav.Link}
                onClick={onLogout}
              >
                <span className="no-icon">Logout</span>
              </NavLink>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
