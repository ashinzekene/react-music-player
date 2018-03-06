import { PLAY_SONG, TOGGLE_PLAYING, PLAY_NEXT, PLAY_PREVIOUS } from "../actions/index";

const initalState = {
  playing: false,
  songId: 0
}

export default (state = initalState, action) => {
  switch (action.type) {
    case PLAY_SONG: {
      return { playing: true, songId: action.id }
    }
    case TOGGLE_PLAYING: {
      return Object.assign({}, state, { playing: !state.playing })
    }
    default: {
      return state
    }
  }
}