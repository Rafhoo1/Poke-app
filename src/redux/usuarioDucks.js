import { type } from '@testing-library/user-event/dist/type'
import {auth, firebase, db, storage} from '../firebase'

//Data inicial
const dataInicial = {
    loading: false,
    activo: false
}
//Types
const LOADING = 'LOADING'
const USER_EXITO = 'USER_EXITO'
const USER_ERROR = 'USER_ERROR'
const CERRAR_SESION = 'CERRAR_SESION'

//Reducer
export default function usuarioReducer (state = dataInicial, action){

    switch(action.type){
        case LOADING:
            return {...state, loading: true}
        case USER_ERROR:
            return {...dataInicial}
        case USER_EXITO:
            return {...state, loading: false, activo: true, user: action.payload.user}
        case CERRAR_SESION:
            return {...dataInicial}
        default: 
            return {...state}
    }

}

//Accion
export const accederAccion = () => async(dispatch) => {

    dispatch({
        type: LOADING
    })

    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const res = await auth.signInWithPopup(provider)
        const objetoUsuario = {
            uid: res.user.uid,
            email: res.user.email,
            photoURL: res.user.photoURL,
            displayName: res.user.displayName
        }
        
        const usuarioDB = await db.collection('usuarios').doc(res.user.email).get()
        if(usuarioDB.exists){
            console.log(usuarioDB.data())
            dispatch({
                type: USER_EXITO,
                payload: usuarioDB.data()
            })
            localStorage.setItem('usuario', JSON.stringify(usuarioDB.data()))
        }else{
            console.log('no existe')
            await db.collection('usuarios').doc(res.user.email).set(objetoUsuario)
            dispatch({
                type: USER_EXITO,
                payload: objetoUsuario
            })
            localStorage.setItem('usuario', JSON.stringify(objetoUsuario))
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: USER_ERROR
        })
    }
}
export const leerUsuarioAccion = () => async (dispatch) => {
    if(localStorage.getItem('usuario')){
        dispatch({
            type: USER_EXITO,
            payload: {
                user: JSON.parse(localStorage.getItem('usuario'))
            }
        })
    }
}
export const cerrarSesionAccion = () => (dispatch) => {
    auth.signOut()
    dispatch({
        type: CERRAR_SESION
    })
    localStorage.removeItem('usuario')
}
export const actualizarDisplayNameAccion = (nuevoNombre) => async (dispatch, getState) => {
    dispatch({
        type: LOADING
    })
    const {user} = getState().usuario
    console.log(user)
    try {
        await db.collection('usuarios').doc(user.email).update({
            displayName: nuevoNombre
        })
        const usuarioEditado = {
            ...user,
            displayName: nuevoNombre
        }
        dispatch({
            type: USER_EXITO,
            payload: usuarioEditado
        })
        localStorage.setItem('usuario', JSON.stringify(usuarioEditado))
    } catch (error) {
        console.log(error)
    }
}
export const editarFotoAccion = (imagenEditada) => async(dispatch, getState) => {
    dispatch({
        type: LOADING
    })
    const {user} = getState().usuario

    try {
        const imagenRef = await storage.ref().child(user.email).child('foto perfil')
        await imagenRef.put(imagenEditada)
        const imagenURL = await imagenRef.getDownloadURL()

        await db.collection('usuarios').doc(user.email).update({
            photoURL : imagenURL
        })

        const usuario = {
            ...user,
            photoURL : imagenURL
        }

        dispatch({
            type: USER_EXITO,
            payload: usuario
        })
        localStorage.setItem('usuario', JSON.stringify(usuario))
    } catch (error) {
        console.log(error)
    }
} 