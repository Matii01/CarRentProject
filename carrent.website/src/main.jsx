import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./root";
import CarsPage from "./pages/CarsPage";
import CarListForClient from "./pages/car/CarListForClient";
import CarDetailsForClient from "./pages/car/CarDetailsForClient";
import { Provider } from "react-redux";
import store from "./app/store";
import RegisterPage from "./pages/user/RegisterPage";
import LoginPage from "./pages/user/LoginPage";
import RentalConfirmation from "./pages/rental/RentalConfirmation";
import "./globalStyles.css";
import ContactPage from "./pages/contact/ContactPage";
import HomePage from "./pages/home/HomePage";
import RentalPage from "./pages/rental/RentalPage";
import { contactLoader } from "./utils/contacltLoader";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "cars", element: <CarsPage /> },
      { path: "car/cars", element: <CarListForClient /> },
      { path: "car/details/:carId", element: <CarDetailsForClient /> },
      { path: "car/reservation/:carId", element: <RentalPage /> },
      {
        path: "car/reservation/confirm",
        element: <RentalConfirmation />,
      },
      { path: "contact", element: <ContactPage />, loader: contactLoader },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        path: "user/:view?",
        async lazy() {
          let UserPage = lazy(() => import("./pages/user/UserPage"));
          return {
            element: (
              <ProtectedRoute>
                <UserPage />
              </ProtectedRoute>
            ),
          };
        },
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
