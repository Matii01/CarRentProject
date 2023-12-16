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
import CarTypes from "./pages/cars/CarTypes";
import CarDrives from "./pages/cars/CarDrives";
import CarMakes from "./pages/cars/CarMake";
import GearboxType from "./pages/cars/GearboxType";
import UsersPage from "./pages/users/Users";
import WorkersPage from "./pages/users/Workers";
import UserDetail from "./pages/users/UserDetails";
import RentalStatus from "./pages/managment/RentalStatus";
import RentalsList from "./pages/managment/RentalsList";
import KilometreLimit from "./pages/cars/KilometreLimit";
import AirConditioning from "./pages/cars/AirConditioning";

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
        path: "cars/makes",
        element: <CarMakes />,
      },
      {
        path: "cars/engines",
        element: <Engines />,
      },
      {
        path: "cars/types",
        element: <CarTypes />,
      },
      {
        path: "cars/cardrives",
        element: <CarDrives />,
      },
      {
        path: "cars/calendar",
        element: <Calendar />,
      },
      {
        path: "cars/gearbox",
        element: <GearboxType />,
      },
      {
        path: "cars/limits",
        element: <KilometreLimit />,
      },
      {
        path: "cars/AirConditioning",
        element: <AirConditioning />,
      },
      {
        path: "car/:carId/calendar",
        element: <CarEventCalendar />,
      },
      { path: "car/details/:carId", element: <CarDetails /> },
      { path: "car/details/:carId/pricelist", element: <CarPriceList /> },
      { path: "users/users", element: <UsersPage /> },
      { path: "users/users/:userName", element: <UserDetail /> },
      { path: "users/workers", element: <WorkersPage /> },
      { path: "rental/status", element: <RentalStatus /> },
      { path: "rentals", element: <RentalsList /> },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
