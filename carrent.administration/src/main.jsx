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
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

//import Admin from "./layouts/Admin";
import App from "./App";
import CarList from "./pages/cars/CarList";
import AddCar from "./pages/cars/AddCar";
import Engines from "./pages/cars/Engines";
import CarCalendar from "./pages/cars/CarCalendar";
import Calendar from "./pages/cars/Calendar";
import CarDetails from "./pages/cars/CarDetails";
import CarPriceList from "./pages/cars/CarPriceList";
import CarEventCalendar from "./pages/cars/CarEventCalendar";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "cars",
        element: <CarList />,
      },
      {
        path: "cars/add",
        element: <AddCar />,
      },
      {
        path: "cars/engines",
        element: <Engines />,
      },
      {
        path: "cars/calendar",
        element: <Calendar />,
      },
      {
        path: "car/:carId/calendar",
        element: <CarEventCalendar />,
      },
      { path: "car/details/:carId", element: <CarDetails /> },
      { path: "car/details/:carId/pricelist", element: <CarPriceList /> },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
