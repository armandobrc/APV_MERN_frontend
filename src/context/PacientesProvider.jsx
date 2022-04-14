import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/axios";

const PacientesContext = createContext();

export const PacientesProvider = ({children}) => {

    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});

    useEffect(() => { // Para que la primera ve que cargue la app mostrar los pacientes registrados previamente
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('token');
                if(!token) return;
                const config = {
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios('/pacientes', config);

                setPacientes(data);
            } catch (error) {
                console.log(error)
            }
        }

        obtenerPacientes()
    }, []);

    const guardarPaciente = async (paciente) => {

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        
        if(paciente.id) {
            try {
                const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);

                const pacientesActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)
                setPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error.response.data.msg)
            }
        } else {
            try {
                const {data} = await clienteAxios.post('/pacientes', paciente, config);
    
                const {createdAt, updatedAt, __v, ...pacienteAlmacenado} = data // Esto crea un nuevo objeto (pacienteAlmacenado) sin los datos que quedan por fuera
    
                setPacientes([pacienteAlmacenado, ...pacientes]) // Esto crea un arreglo con pacienteAlmacenado mas los pacientes anteriores
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
    }

    const setEdicion = (paciente) => {
        setPaciente(paciente)
    }

    const eliminarPaciente = async id => {
        const confirmar = confirm('¿Seguro que deseas eliminar este paciente?')

        if(confirmar) {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                
                const {data} = await clienteAxios.delete(`/pacientes/${id}`, config);

                const pacientesActualizado = pacientes.filter(pacientesState => pacientesState._id !== id)

                setPacientes(pacientesActualizado);
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (

        <PacientesContext.Provider
            value={{
                pacientes,
                paciente,
                guardarPaciente,
                setEdicion,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}

export default PacientesContext;