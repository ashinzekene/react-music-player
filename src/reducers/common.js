import { TOGGLE_SIDEBAR, SHUFFLE } from "../actions/index";

const initialState = {
  sidebarOpen: false,
  shuffle: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR: {
      return { ...state, sidebarOpen: !state.sidebarOpen }
    }
    case SHUFFLE: {
      return { ...state, shuffle: action.id }
    }
    default: {
      return state
    }
  }
}