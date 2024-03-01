import Home from "./components/Home";
import AddCar from "./components/AddCar";
import { Route, Routes } from "react-router-dom";
import EditCar from "./components/EditCar";
import CarDetails from "./components/CarDetails";
import { DataProvider } from "./context/DataContext";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addCar" element={<AddCar />} />
            <Route path="/edit" element={<EditCar />} />
            <Route path="/car/:id" element={<CarDetails />} />
          </Routes>
        </div>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
