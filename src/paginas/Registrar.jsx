import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const Registrar = () => {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');

  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if([nombre, email, password, confirmarPassword].includes('')) {
      setAlerta({msg: 'Hay campos vacios', error: true});
      return;
    }
    if(password !== confirmarPassword) {
      setAlerta({msg: 'Las contraseñas no coinciden', error: true});
      return;
    }
    if(password.length < 6) {
      setAlerta({msg: 'La contraseña debe tener por lo menos 6 caracteres', error: true});
      return;
    }
    setAlerta({});

    // Crear el usuario en la API
    try {
      await clienteAxios.post('/veterinarios', {nombre, email, password}) // el get es el default. No requiere autenticacion, ya que la url esta en el area publica
      setAlerta({
        msg: 'Usuario creado con éxito. Revisa tu E-mail',
        error: false
      })
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta // Se extrae el msg de la variable alerta creada en el useState
  
  return (
    <>
      <div>
          <h1 className="text-indigo-600 font-black text-6xl">
          Crea una Cuenta
          <span className="text-black"> y Administra tus Pacientes</span>
        </h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {msg && <Alerta
          alerta={alerta}
        />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Nombre
            </label>
            <input type="text" placeholder="Tu Nombre" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={nombre} onChange={e=>setNombre(e.target.value)}/>
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input type="email" placeholder="Tu Email" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={email} onChange={e=>setEmail(e.target.value)}/>
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Password
            </label>
            <input type="password" placeholder="Tu Password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={password} onChange={e=>setPassword(e.target.value)}/>
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Confirmar Password
            </label>
            <input type="password" placeholder="Tu Password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={confirmarPassword} onChange={e=>setConfirmarPassword(e.target.value)}/>
          </div>
          <input type="submit" value="Crear Cuenta" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
                <Link className="block text-center my-5 text-gray-500 hover:text-black" to="/">¿Ya tienes un cuenta? Inicia Sesión</Link>
                <Link className="block text-center my-5 text-gray-500 hover:text-black" to="/olvide-password">Olvidé mi Password</Link>
        </nav>
      </div>
    </>
  )
}

export default Registrar