import { combineReducers } from 'redux';
import songs from './songs';
import playState from './playState';
import common from './common';
import page from './page';

const reducers = combineReducers({
  songs,
  common,
  playState,
  page,
});

export default reducers;
