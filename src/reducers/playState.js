import { PLAY_SONG, TOGGLE_PLAYING, PLAY_NEXT, PLAY_PREVIOUS } from "../actions/index";

const initalState = {
  playing: false,
}

export default (state = initalState, action) => {
  switch (action.type) {
    case PLAY_SONG: {
      return { playing: true, song: action.id }
    }
    case TOGGLE_PLAYING: {
      return Object.assign({}, state, { playing: !state.playing })
    }
    case PLAY_NEXT: {
      return Object.assign({}, state, { song: state.song + 1 })
    }
    case PLAY_PREVIOUS: {
      return Object.assign({}, state, { song: state.song === 0 ? 0 : state.song - 1 })
    }
    default: {
      return state
    }
  }
}