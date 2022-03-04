import React from 'react'

// hooks react redux
import {useDispatch, useSelector} from 'react-redux'

// importamos la acción
import {obtenerPokemonesAction, siguientePokemonesAction, anteriorPokemonAccion, unPokeDetalleAccion} from '../redux/pokeDucks'
import Detalle from './Detalle'

const Pokemones = () => {

    // declaramos displach para llamar a la acción o acciones
    const dispatch = useDispatch()

    // crearmos el state utilizando nuestra tienda
    // store.pokemones lo sacamos de la tienda
    const pokemones = useSelector(store => store.pokemones.results)
    const next = useSelector(store => store.pokemones.next)
    const previous = useSelector(store => store.pokemones.previous)

    return (
      <div className="row mt-5">
        <div className="col-md-6">
          <h3>Lista de Pokemons</h3>
          <ul className="list-group mt-4 text-uppercase">
              {
                  pokemones.map(item => (
                      <li className="list-group-item" key={item.name} >
                          {item.name}
                          <button 
                              className="btn btn-dark btn-sm float-right"
                              onClick={() => dispatch(unPokeDetalleAccion(item.url))}
                          >
                              Detalle
                          </button>
                      </li>
                  ))
              }
          </ul>
  
          <div className="d-flex justify-content-between mt-4">
              {
                  pokemones.length === 0 && 
                  <button 
                      onClick={() => dispatch(obtenerPokemonesAction())}
                      className="btn btn-dark"
                  >
                      Get Pokemones
                  </button>
              }
              {
                  next && 
                  <button onClick={() => dispatch(siguientePokemonesAction())} className="btn btn-dark mr-2">Siguiente</button>
              }
              {
                  previous && 
                  <button onClick={() => dispatch(anteriorPokemonAccion())} className="btn btn-dark">Anterior</button>
              } 
          </div>
          
         
        </div>
        <div className="col-md-6">
          <h3>Detalle del Pokemon</h3>
          <Detalle />      
        </div>
      </div>
    )
}

export default Pokemones