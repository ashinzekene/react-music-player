import { TOGGLE_SIDEBAR } from "../actions/index";

const initialState = {
  sidebarOpen: false
}

export default (state = initialState, action) => {
  switch (action.payload) {
    case TOGGLE_SIDEBAR: {
      return { ...state, sidebarOpen: !state.sidebarOpen }
    }
    default: {
      // RESET TO INITIAL STATE
      return initialState
    }
  }
}