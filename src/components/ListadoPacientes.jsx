import usePacientes from '../hooks/usePacientes'
import Paciente from './Paciente';

export const ListadoPacientes = () => {

  const { pacientes } = usePacientes();

  return (
    <>
      {pacientes.length ? (
        <>
          <h2 className="font-black text-3xl text-center">Listado de Pacientes</h2>

          <p className='text-xl mt-5 mb-10 text-center'>
            Administra tus Pacientes y Citas
          </p>

          { pacientes.map(paciente => (
            <Paciente
              key={paciente._id}
              paciente={paciente} // El prop que se pasa a componente Paciente
            />
          )) }
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No Hay Pacientes</h2>

          <p className='text-xl mt-5 mb-10 text-center'>
            Comienza agregando pacientes y aparecerán en este lugar
          </p>
        </>
      )}
    </>
  )
}
