import { useState } from 'react';
import AdminNav from '../components/AdminNav'
import Alerta from '../components/Alerta';
import useAuth from '../hooks/useAuth';

const CambiarPassword = () => {

    const {guardarPassword} = useAuth();

    const [alerta, setAlerta] = useState({});
    const [password, setPassword] = useState({
        pwd_actual: '',
        pwd_nuevo: ''
    }); // Se definen propiedades iniciales para que hayan valores y some funcione


    const handleSubmit = async e => {
        e.preventDefault();

        if(Object.values(password).some(campo => campo === '')) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            })
            return;
        }
        if(password.pwd_nuevo.length < 6) {
            setAlerta({
                msg: 'La contraseña debe tener por lo menos 6 caracteres', 
                error: true
            });
            return;
        }

        const respuesta = await guardarPassword(password);
        setAlerta(respuesta);
    }

    const {msg} = alerta;
  return (
    <>
        <AdminNav/>

        <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu password aquí</p>

        <div className='flex justify-center'>
            <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>
                {msg && <Alerta alerta={alerta}/>}
                <form onSubmit={handleSubmit}>
                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600"htmlFor="">Password Actual</label>
                        <input type="password" className='border bg-gray-50 w-full p-2 mt-3 rounded-lg' name='pwd_actual' placeholder='Password Actual' onChange={e=>setPassword({
                            ...password,
                            [e.target.name] : e.target.value
                        })}/>
                    </div>
                    <div className="my-3 mt-8">
                        <label className="uppercase font-bold text-gray-600"htmlFor="">Nuevo Password</label>
                        <input type="password" className='border bg-gray-50 w-full p-2 mt-3 rounded-lg' name='pwd_nuevo' placeholder='Nuevo Password' onChange={e=>setPassword({
                            ...password,
                            [e.target.name] : e.target.value
                        })}/>
                    </div>

                    <input type="submit" value="Actualizar Password" className='bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:cursor-pointer hover:bg-indigo-800 '/>
                </form>
            </div>
        </div>
    </>
  )
}

export default CambiarPassword