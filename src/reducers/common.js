import { TOGGLE_SIDEBAR, REPEAT } from '../actions/index';

const initialState = {
  sidebarOpen: false,
  repeat: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR: {
      return { ...state, sidebarOpen: !state.sidebarOpen };
    }
    case REPEAT: {
      return { ...state, repeat: action.id };
    }
    default: {
      return state;
    }
  }
};
