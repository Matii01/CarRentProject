import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import useRefreshToken from "./hooks/UseRefreshToken";
import Footer from "./components/Footer/Footer";
import { useSelector } from "react-redux";
import LoadingOverlay from "./components/Overlay/LoadingOverlay";
import useGetNotification from "./hooks/UseGetNotification";

export default function Root() {
  const loading = useSelector((state) => state.loading);
  useRefreshToken();

  return (
    <>
      <LoadingOverlay hidden={!loading.isLoading} />
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}
