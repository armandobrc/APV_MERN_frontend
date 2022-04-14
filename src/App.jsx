import { BrowserRouter, Routes, Route} from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { PacientesProvider } from "./context/PacientesProvider";

import AuthLayout from "./layouts/AuthLayout";
import RutaProtegida from "./layouts/RutaProtegida";

import AdministrarPacientes from "./paginas/AdministrarPacientes";
import CambiarPassword from "./paginas/CambiarPassword";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import EditarPerfil from "./paginas/EditarPerfil";
import Login from "./paginas/Login";
import NuevoPassword from "./paginas/NuevoPassword";
import OlvideoPassword from "./paginas/OlvidePassword";
import Registrar from "./paginas/Registrar";

function App() {

  return (
    
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path="/" element={<AuthLayout/>}>
              <Route index element={<Login/>}/>
              <Route path="registrar" element={<Registrar/>}/>
              <Route path="olvide-password" element={<OlvideoPassword/>}/>
              <Route path="olvide-password/:token" element={<NuevoPassword/>}/>
              <Route path="confirmar/:id" element={<ConfirmarCuenta/>}/>
            </Route>

            <Route path="/admin" element={<RutaProtegida/>}>
              <Route index element={<AdministrarPacientes/>}/>
              <Route path ="perfil" element={<EditarPerfil/>}/> 
              <Route path ="cambiar-password" element={<CambiarPassword/>}/>
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

/*Cuando el usuario visite el "path" va a cargar el "element" */ 

export default App
