import { ADD_SONGS, REMOVE_SONGS, PLAY_SONG, FILTER_SONGS, PLAYING_SONG } from '../actions'

export function songs(state= [], action) {
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

export function nowPlaying(state= [true, 0], action) {
  switch (action.type) {
    case PLAY_SONG: {
      return [false, action.id]
    }
    case PLAYING_SONG: {
      return [true, action.id]
    }
    default: {
      return state
    }
  }
}


export function filteredSongs(state=[], action) {
  switch (action.type) {
    case FILTER_SONGS : {
      return [...state, action.filter]
    }
    default: {
      return state
    }
  }
}