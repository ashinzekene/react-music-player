import { combineReducers } from 'redux'
import { songs, nowPlaying, filteredSongs } from './songs'

const reducers = combineReducers({
  songs,
  nowPlaying,
  filteredSongs
})

export default reducers