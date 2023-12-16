import { Routes, Route, BrowserRouter } from "react-router-dom";
import Astronauta from "../Components/Astronautas.tsx";
import AgregarAstronauta from "../Components/AgregarAstronauta.tsx";
import AstronautaDetails from "../Components/AstronautaDetails.tsx";
import AgregarMisiones from "../Components/AgregarMisiones.tsx";

export default function Router() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Astronauta/> } />
        <Route path="/add" element={<AgregarAstronauta/> } />
        <Route path="/addMision/:id" element={<AgregarMisiones/> } />
        
        <Route path="/detalles/:id" element={<AstronautaDetails/> } />
      </Routes>
    </BrowserRouter>
  );
}


