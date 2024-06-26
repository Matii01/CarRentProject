import { NavLink, useNavigate } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import SetLocalStorage from "../../hooks/SetLocalStorage";
import styles from "./NavBar.module.css";
import { useEffect } from "react";
import NotificationElement from "./NotificationElement";

function NavBar() {
  const user = useSelector((state) => state.user);
  const [a, b, logout] = SetLocalStorage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <Navbar
      expand="lg"
      sticky="top"
      className={`bg-body-tertiary p-3 ${styles.customNavbar}`}
    >
      <Container fluid>
        <Navbar.Brand href="#">Car Rental</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto me-auto my-2 my-lg-0 fs-5"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link to="/" as={NavLink}>
              Home
            </Nav.Link>
            <Nav.Link to="/car/cars" as={NavLink}>
              Cars
            </Nav.Link>
            <Nav.Link to="/contact" as={NavLink}>
              Contact
            </Nav.Link>
          </Nav>
          <Nav>
            {!user.isLogin && (
              <Nav.Link to={"/login"} as={NavLink}>
                Login
              </Nav.Link>
            )}
            {!user.isLogin && (
              <Nav.Link to={"/register"} as={NavLink}>
                Register
              </Nav.Link>
            )}
            {user.isLogin && (
              <Nav.Link to="/user/notification" as={NavLink}>
                <NotificationElement />
              </Nav.Link>
            )}
            <Nav.Link to="/user/profile" as={NavLink}>
              {user.isLogin ? "Profile" : ""}
            </Nav.Link>
            {user.isLogin && (
              <Nav.Link onClick={handleLogout}>Log out</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
