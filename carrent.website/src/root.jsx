import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavBar from "./components/Navbar/NavBar";
import useRefreshToken from "./hooks/UseRefreshToken";
import Footer from "./components/Footer/Footer";

export default function Root() {
  useRefreshToken();
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}
