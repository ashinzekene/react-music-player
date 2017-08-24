import { createStore } from 'redux'
import reducers from '../reducers'

export default function configureStore(initialState= {songs =[]}) {
  return createStore(reducers, initialState)
} 