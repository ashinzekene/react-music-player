import { ADD_SONGS, REMOVE_SONGS, PLAY_SONG, FILTER_SONGS, PLAYING_SONG } from '../actions'

export default (state= [], action) => {
  switch (action.type) {
    case ADD_SONGS: {
      return [...state, ...action.songs]
    }
    case REMOVE_SONGS: {
      return state.filter((song, index) => {
        return index !== action.id
      })
    }
    default : {
      return state
    }
  }
}
