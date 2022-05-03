import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import Formulario from '../components/Formulario'

const EditarCliente = () => {

  const params = useParams()
  const [cliente, setCliente] = useState({})

  const [cargando, setCargando] = useState(false)

  useEffect(() => {
        
    const obtenerClienteAPI = async () => {
        setCargando(true)
        try {
            const url = `${import.meta.env.VITE_API_URL}/${params.id}`
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            setCliente(resultado)
        } catch (error) {
            console.log(error)
        }
        setCargando(false)
    }
    obtenerClienteAPI()
}, [])
  return (
    
    <>
        <h1 className=' font-black text-4xl text-blue-900'>Editar cliente</h1>
        <p className='mt-3'>Utiliza este formulario para editar datos de un cliente</p>
        {cliente.nombre ? (
          <Formulario 
            cliente={cliente}
            cargando={cargando}
          />
        ): <p>Cliente ID no válido</p>
        }
      </>
  )
}

export default EditarCliente