import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import NavBar from "../Navbar/NavBar";

export default function Layout() {
  return (
    <>
      <NavBar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
