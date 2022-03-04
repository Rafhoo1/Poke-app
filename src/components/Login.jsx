import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { accederAccion } from '../redux/usuarioDucks' 
import {withRouter} from 'react-router-dom'


const Login = (props) => {
    const dispatch = useDispatch()
    const loading = useSelector(store => store.usuario.loading)
    const activo = useSelector(store => store.usuario.activo)
    
    React.useEffect(() => {
        console.log(activo)
        if(activo){
            props.history.push('/')
        }
    }, [activo, props.history])

    return (
        <div className="mt-5 text-center">
            <h3>Ingreso de usuarios</h3>
            <hr/>
            <button className="btn btn-dark"
            onClick={() => dispatch(accederAccion())}
            disabled={loading}
            >
                Acceder con Google
            </button>
        </div>
    )
}

export default withRouter(Login)