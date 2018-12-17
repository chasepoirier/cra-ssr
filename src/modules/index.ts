import { combineReducers } from 'redux'
import * as reducers from './ducks'

export default combineReducers({
  ...reducers
})
