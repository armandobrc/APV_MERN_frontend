import { useState, useEffect, createContext } from "react"; // createContext permite crear un context
import clienteAxios from '../config/axios';

const AuthContext = createContext(); // Como se llamara el context de este Provider

const AuthProvider = ({children}) => {

    const [cargando, setCargando] = useState(true);
    const [auth, setAuth] = useState({});

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');

            if(!token) {
                setCargando(false);
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const {data} = await clienteAxios('/veterinarios/perfil', config);
                setAuth(data);
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({}) // En caso de que haya un error retornamos un objeto vacio
            }
            setCargando(false); // Una vez que revisa toda la autenticacion pasa a false
        }
        autenticarUsuario();
    }, []);

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        setAuth({});
    }

    const actualizarPerfil = async datos => {
        const token = localStorage.getItem('token');

        if(!token) {
            setCargando(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/perfil/${datos._id}`;
            const {data} = await clienteAxios.put(url, datos, config)
            return {
                msg: "Almacenado Correctamente",
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    const guardarPassword = async (password) => {
        const token = localStorage.getItem('token');

        if(!token) {
            setCargando(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const url = '/veterinarios/actualizar-password';

            const{data} = await clienteAxios.put(url, password, config);

            return {
                msg: data.msg
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }
    
    return (
        <AuthContext.Provider
            value={{auth, setAuth, cargando, cerrarSesion, actualizarPerfil, guardarPassword}}// Colocamos llaves una vez mas ya que podemos pasarle un objeto con todos los valores que queremos que esten disponibles
        >
            {children}
        </AuthContext.Provider> // Retorna el context que tendra el provider, donde nacen los datos
    )
} // Es como un componente que englobara todos los otros componentes

export {
    AuthProvider
}

export default AuthContext;