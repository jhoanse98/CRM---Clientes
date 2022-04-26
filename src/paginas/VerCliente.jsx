import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import Spinner from '../components/Spinner'


const VerCliente = () => {

    const params = useParams()
    const [cliente, setCliente] = useState({})

    const [cargando, setCargando] = useState(false)
    
    useEffect(() => {
        
        const obtenerClienteAPI = async () => {
            setCargando(true)
            try {
                const url = `http://localhost:4000/clientes/${params.id}`
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
        cargando 
        ? 
            <Spinner />
        :  
            Object.keys(cliente).length === 0 ? <p>No hay resultados</p> : (
                <div>
                    <h1 className=' font-black text-4xl text-blue-900'>Ver Cliente: {cliente.nombre}</h1>
                    <p className='mt-3'>Información del cliente</p>
                    <p className='text-4xl text-gray-600 mt-10'>
                        <span className='  uppercase font-bold'>Cliente:</span> {cliente.nombre}
                    </p>
                    <p className='text-2xl text-gray-600 mt-4'>
                        <span className='  text-gray-800 uppercase font-bold'>Email:</span> {cliente.email}
                    </p>
                    {cliente.telefono && (
                        <p className='text-2xl text-gray-600 mt-4'>
                            <span className='  text-gray-800 uppercase font-bold'>Teléfono:</span> {cliente.telefono}
                        </p>
                    )}
                    <p className='text-2xl text-gray-600 mt-4'>
                        <span className=' text-gray-800 uppercase font-bold'>Empresa:</span> {cliente.empresa}
                    </p>
                    {cliente.notas && (
                        <p className='text-2xl text-gray-600 mt-4'>
                            <span className=' text-gray-800 uppercase font-bold'>Notas:</span> {cliente.notas}
                        </p>
                    )}
                </div>
        )
    );
}
 
export default VerCliente;