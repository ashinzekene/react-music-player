import { PLAY_SONG, TOGGLE_PLAYING } from '../actions/index';

const initalState = {
  playing: false,
  songId: -1,
};

export default (state = initalState, action) => {
  switch (action.type) {
    case PLAY_SONG: {
      return { playing: true, songId: action.id };
    }
    case TOGGLE_PLAYING: {
      return Object.assign({}, state, { playing: !state.playing });
    }
    default: {
      return state;
    }
  }
};
