import { useNavigate } from 'react-router-dom' //Hook para redireccionar

import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup' //valida los formularios de formik
import Alerta from './Alerta'
import Spinner from './Spinner'

const Formulario = ({cliente, cargando}) => {

    const navigate = useNavigate()

    // Creación del esquema de validaciones (contienen los mismos fields del formulario)
    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
                    .min(3, "El Nombre es muy corto")
                    .max(20, "El Nombre es muy largo")
                    .required("El nombre es obligatorio"),
        empresa: Yup.string()
                    .required("El nombre de la empresa es obligatorio"),
        email: Yup.string()
                  .email("No es un email válido")
                  .required("El email es obligatorio"),
        telefono: Yup.number()
                     .positive('Número no válido')
                     .integer('Número no válido')
                     .typeError('El número no es válido'),
    })

    const handleSubmit = async (values) => {
        try {
            let respuesta
            if(cliente.id){
                const url =`${import.meta.env.VITE_API_URL}/${cliente.id}`
                respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else {

                const url =`${import.meta.env.VITE_API_URL}`
                respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }

            const resultado = await respuesta.json()
            console.log(resultado)

            //navigate toma la url a donde queremos enviarlo
            navigate('/')

        } catch (error) {
            console.log(error)
        }
    }

    return ( 
        cargando ? <Spinner /> : (
            <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
                <h1 className="text-gray-600 font-bold text-xl text-center uppercase">{cliente.nombre ? 'Editar Cliente' : 'Agregar cliente'}</h1>
                <Formik
                    initialValues={{
                        nombre: cliente.nombre ?? "",
                        empresa: cliente.empresa ?? "",
                        email: cliente.email ?? "",
                        telefono: cliente.telefono ?? "",
                        notas: cliente.notas ?? ""
                    }}

                    enableReinitialize={true} //permite re-inicializar los valores

                    onSubmit={async (values, {resetForm}) => {
                        await handleSubmit(values)
                        resetForm()
                    }} //values son los valores que están en los Field y la funcion resetForm resetea el formulario

                    validationSchema= {nuevoClienteSchema} //pasamos el esquema de validaciones
                >
                    {({errors, touched}) =>{
                        //destructuring de errors para saber qué campos
                        // tienen errores y touched es para hacer validaciones en tiempo real
                        return( 
                            <Form>
                                <div className='mb-4'>
                                    <label htmlFor="nombre">Nombre:</label>
                                    <Field 
                                        id="nombre"
                                        type="text"
                                        className="mt-2 block w-full p-3 bg-gray-200"
                                        placeholder="Nombre del Cliente"
                                        name="nombre"
                                    />
                                    {errors.nombre && touched.nombre ? (
                                        <Alerta>{errors.nombre}</Alerta>
                                    ):
                                        null
                                    }
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="empresa">Empresa:</label>
                                    <Field 
                                        id="empresa"
                                        type="text"
                                        className="mt-2 block w-full p-3 bg-gray-200"
                                        placeholder="Nombre de la Empresa"
                                        name="empresa"
                                    />
                                    {errors.empresa && touched.empresa ? (
                                        <Alerta>{errors.empresa}</Alerta>
                                    ):
                                        null
                                    }
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="email">Email:</label>
                                    <Field 
                                        id="email"
                                        type="email"
                                        className="mt-2 block w-full p-3 bg-gray-200"
                                        placeholder="Email"
                                        name="email"
                                    />
                                    {errors.email && touched.email ? (
                                        <Alerta>{errors.email}</Alerta>
                                    ):
                                        null
                                    }
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="telefono">Telefono:</label>
                                    <Field 
                                        id="telefono"
                                        type="tel"
                                        className="mt-2 block w-full p-3 bg-gray-200"
                                        placeholder="Teléfono del Cliente"
                                        name="telefono"
                                    />
                                    {errors.telefono && touched.telefono ? (
                                        <Alerta>{errors.telefono}</Alerta>
                                    ):
                                        null
                                    }
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="notas">Notas:</label>
                                    <Field 
                                        id="notas"
                                        as="textarea"
                                        type="text"
                                        className="mt-2 block w-full p-3 bg-gray-200 h-40"
                                        placeholder="Notas del Cliente"
                                        name="notas"
                                    />
                                </div>


                                <input
                                    type="submit"
                                    value={cliente.nombre ? 'Editar Cliente' : 'Agregar cliente'}
                                    className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg hover:bg-blue-900 cursor-pointer'
                                />
                            </Form>
                    )}}
                </Formik>
            </div>

    ));
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false

} //parametros por default. Si no esta presente, entra a estos defaultProps, si está presente toma el valor de los props

 
export default Formulario;