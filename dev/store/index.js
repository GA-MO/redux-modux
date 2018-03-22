import { createStore } from 'redux'
import reducers from '../modules'

export default () => {
  return createStore(reducers)
}