import "bootstrap/dist/css/bootstrap.min.css";
import UserNavbar from "./components/Navbar/UserNavbar";
import LongText from "./components/Temp/LongText";
import CarsPage from "./pages/CarsPage";

function App() {
  return (
    <div className="App">
      <UserNavbar />
      <CarsPage />
      <LongText />
    </div>
  );
}

export default App;
