import clienteAxios from "../config/axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {

  const [cuentaConfirmada, setCuentaConfirmada] = useState(false); //Por default la cuenta no estara confirmada, hasta que se compruebe
  const [cargando, setCargando] = useState(true) // En lo que se hace el llamado async await de mas abajo, puede tardar un poco en tener una respuesta
  const [alerta, setAlerta] = useState({}) // Va a ser un objeto vacio que se llenara con el resultado de los llamados de abajo

  const params = useParams();
  const {id} = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`;
        const {data} = await clienteAxios(url);// data es la respuesta que da axios
        setCuentaConfirmada(true)// Significa que se confirmo correctamente
        setAlerta({msg: data.msg}) // Se obtiene del data que tiene el msg del controller
      } catch (error) {
        setAlerta({msg: error.response.data.msg, error: true})
      }
      setCargando(false); // Cambia a false porque ya se completo el async await
    }
    confirmarCuenta(); // Se manda a llamar para que se ejecute
  }, []);

    return (
      <>
        <div>
          <h1 className="text-indigo-600 font-black text-6xl">
            Confirma tu Cuenta
            <span className="text-black"> y Comienza a Administrar tus Pacientes</span>
          </h1>
        </div>
        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
          {!cargando && <Alerta alerta = {alerta} />}

          {cuentaConfirmada && (
              <Link className="block text-center my-5 text-gray-500 hover:text-black" to="/">Iniciar Sesión</Link>
          )}
        </div>
      </>
    )
  }
  
  export default ConfirmarCuenta;