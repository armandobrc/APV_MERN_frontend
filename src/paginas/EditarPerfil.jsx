import { useEffect, useState } from 'react';
import AdminNav from '../components/AdminNav'
import Alerta from '../components/Alerta';
import useAuth from '../hooks/useAuth'

const EditarPerfil = () => {

    const {auth, actualizarPerfil} = useAuth();
    const [perfil, setPerfil] = useState({}); // Creamos este perfil para que se llene con la info de auth. De esta forma podemos cambiar su informacion y no la de auth hasta que se hayan hecho los cambios. El perfil entero se esta almacenando en un objeto. Anteriormente hemos creado una pieza de state por cada input. En este caso lo hacemos como objeto
    const [alerta, setAlerta] = useState({})
    useEffect(()=>{
        setPerfil(auth);
    },[auth]);

    const handleSubmit = async e => {
        e.preventDefault;

        const{nombre, email} = perfil;

        if([nombre, email].includes('')) {
            setAlerta({
                msg:'Email y Nombre son obligatorios',
                error: true
            }) 
            return;
        }
        const resultado = await actualizarPerfil(perfil);
        setAlerta(resultado);
    }

    const {msg} = alerta;

  return (
    <>
        <AdminNav/>

        <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu información aquí</p>

        <div className='flex justify-center'>
            <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>
                {msg && <Alerta alerta={alerta}/>}
                <form onSubmit={handleSubmit}>
                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600"htmlFor="">Nombre</label>
                        <input type="text" className='border bg-gray-50 w-full p-2 mt-5 rounded-lg' name='nombre' value={perfil.nombre || ''} onChange={e=>setPerfil({...perfil, [e.target.name] : e.target.value})}/>
                    </div>
                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600"htmlFor="">Sitio Web</label>
                        <input type="text" className='border bg-gray-50 w-full p-2 mt-5 rounded-lg' name='web' value={perfil.web || ''} onChange={e=>setPerfil({...perfil, [e.target.name] : e.target.value})}/>
                    </div>
                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600"htmlFor="">Teléfono</label>
                        <input type="text" className='border bg-gray-50 w-full p-2 mt-5 rounded-lg' name='telefono' value={perfil.telefono || ''} onChange={e=>setPerfil({...perfil, [e.target.name] : e.target.value})}/>
                    </div>
                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600"htmlFor="">Email</label>
                        <input type="text" className='border bg-gray-50 w-full p-2 mt-5 rounded-lg' name='email' value={perfil.email || ''} onChange={e=>setPerfil({...perfil, [e.target.name] : e.target.value})}/>
                    </div>
                    <input type="submit" value="Guardar Cambios" className='bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:cursor-pointer hover:bg-indigo-800 '/>
                </form>
            </div>
        </div>
    </>
  )
}

export default EditarPerfil