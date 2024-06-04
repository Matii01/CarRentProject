import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import useRefreshToken from "./hooks/UseRefreshToken";
import Footer from "./components/Footer/Footer";
import { useSelector } from "react-redux";
import LoadingOverlay from "./components/Overlay/LoadingOverlay";

export default function Root() {
  const loading = useSelector((state) => state.loading);
  const tokenRetrived = useSelector((state) => state.loading.tokenWasRetrived);

  useRefreshToken();

  return (
    <>
      {tokenRetrived && (
        <>
          <LoadingOverlay hidden={!loading.isLoading} />
          <NavBar />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
}
