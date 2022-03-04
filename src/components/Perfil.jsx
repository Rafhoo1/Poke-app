import React from 'react'

import {useSelector, useDispatch} from 'react-redux'
import {actualizarDisplayNameAccion, editarFotoAccion} from '../redux/usuarioDucks'

const Perfil = () => {
    const dispatch = useDispatch()

    const usuario = useSelector(store => store.usuario.user)
    const loading = useSelector(store => store.usuario.loading)
    // console.log(usuario)

    const [displayName, setDisplayName] = React.useState(usuario.displayName)
    const [editarNombre, setEditarNombre] = React.useState(false)
    const [error, setError] = React.useState(false)

    const botonEditarNombre = () => {
        if(!displayName.trim()){
            console.log('nombre vacío')
            return
        }
        dispatch(actualizarDisplayNameAccion(displayName))
        setEditarNombre(false)
    }

    const seleccionarArchivo = imagen => {
        console.log(imagen.target.files[0])
        const imagenCliente = imagen.target.files[0]

        if(imagenCliente === undefined){
            console.log('No se selecciono imagen')
            return
        }
        
        if(imagenCliente.type === "imagen/png" || imagenCliente.type === "imagen/jpg"){
            dispatch(editarFotoAccion(imagenCliente))
            setError(false)
        }else{
            setError(true)

        }

    }
    return (
        <div className="mt-5 text-center">
            <div className="card">
                <div className="card-body">
                    <img src={usuario.photoURL} width="100" className="img-fluid rounded" />
                    <h5 className="card-title">Nombre: {usuario.displayName}</h5>
                    <p className="card-text">Email: {usuario.email}</p>
                    <button 
                        className='btn btn-dark' 
                        onClick={() => setEditarNombre(true)}
                    >
                        Editar Nombre
                    </button>
                    <div className="custom-file">
                        {
                            error &&
                            <div className="alert alert-warning">
                                Foto en .png o .jpg
                            </div>
                        }
                        <input 
                            type="file" 
                            className="custom-file-input" 
                            id="validatedCustomFile" 
                            onChange={e => seleccionarArchivo(e)}
                            required 
                            disabled={loading}
                            style={{display:'none'}}
                        />
                        <label 
                            className={loading ? "btn btn-dark disabled" : "btn btn-dark mt-2"}
                            htmlFor="validatedCustomFile"
                            >
                                Editar foto perfil
                        </label>
                    </div>
                </div>
                {
                    loading && 
                    <div className="card-body">
                        <div className="d-flex justify-content-center my-2">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                }
                {
                    editarNombre && 
                    <div className="card-body">
                        <div className="row justify-content-center">
                            <div className="col-md-5">
                                <div className="input-group mb-3">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        aria-label="Recipient's username" 
                                        value={displayName}  
                                        onChange={ e => setDisplayName(e.target.value)}
                                    />
                                    <div className="input-group-append">
                                        <button 
                                            className="btn btn-outline-secondary" 
                                            type="button" 
                                            onClick={() => botonEditarNombre()}
                                        >
                                            Actualizar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Perfil