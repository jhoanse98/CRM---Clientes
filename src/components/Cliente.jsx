const Cliente = ({cliente}) => {
    const {nombre, empresa, email, telefono, notas} = cliente
    return ( 
        <tr className=" border-4 hover:bg-gray-100">
            <td className="p-3">{nombre}</td>
            <td className="p-3">
                <p><span className="text-gray-800 uppercase font-bold">Email: </span>{email}</p>
                <p><span className="text-gray-800 uppercase font-bold">Tel: </span>{telefono}</p>
            </td>
            <td className="p-3">{empresa}</td>
            <td className="p-3">
                <button
                    type="button"
                    className="bg-yellow-500 hover:bg-yellow-600 block w-full text-white p-2 uppercase font-bold text-xs"
                >Ver</button>

                <button
                    type="button"
                    className="mt-3 bg-blue-600 hover:bg-blue-700 block w-full text-white p-2 uppercase font-bold text-xs"
                >Editar</button>

                <button
                    type="button"
                    className="bg-red-600 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs mt-3"
                >Eliminar</button>
            </td>
            
        </tr>
     );
}
 
export default Cliente;