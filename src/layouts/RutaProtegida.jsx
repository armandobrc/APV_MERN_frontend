import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import Footer from "../components/Footer";
import Header from "../components/Header";


const RutaProtegida = () => {
    const {auth, cargando} = useAuth(); // Es una funcion, que tenemos que mandar llamar para que extraiga toda la informacion que eprtence a ese context

    if(cargando) return ''
  return (
    <>
        <Header/>
            {auth?._id ?(
              <main className="container mx-auto mt-10">
                <Outlet/>
              </main>
            ) : <Navigate to="/"/>}
        <Footer/>
    </>
  )
}

export default RutaProtegida