import { combineReducers } from 'redux'
import songs from './songs'
import playState from './playState'
import common from './common'

const reducers = combineReducers({
  songs,
  common,
  playState
})

export default reducers