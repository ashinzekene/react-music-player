import { ADD_SONGS, REMOVE_SONGS, FILTER_SONGS } from '../actions'

export function songs(state = [], action) {
  switch (action.type) {
    case ADD_SONGS : {
      return [...state, ...action.songs]
    }
    case REMOVE_SONGS : {
      return state.filter((song, index) => {
        return index !== action.id
      })
    }
    case FILTER_SONGS : {
      return state.filter(song => {
        return song.name.indexOf(filter) >= 0
      })
    }
    default : {
      return state
    }
  }
}