import React, {
  createContext, useState, useEffect, useContext,
} from 'react';
import PropTypes from 'prop-types';
import { getSongsFromStorage, getPlayStateFromStorage } from './storage';

const StateContext = createContext();

export const useGlobalState = () => useContext(StateContext);

export function useProvideState() {
  const [songs, setSongs] = useState([]);
  const [appState, setAppState] = useState({
    page: 0,
  });

  const [playState, setPlayState] = useState({
    playing: false,
    repeat: 0,
    currrent: 0,
    progress: 0,
  });

  const getInitialSongs = async () => {
    const initalSongs = await getSongsFromStorage();
    if (initalSongs) {
      setSongs(songs);
    }
  };

  const getInitialPlayState = async () => {
    const initalPlayState = await getPlayStateFromStorage();
    if (initalPlayState) {
      setPlayState(playState);
    }
  };

  useEffect(() => {
    getInitialSongs();
    getInitialPlayState();
  }, []);

  const addSongs = () => {

  };

  const removeSongs = () => {

  };

  const route = (page) => setAppState({ ...appState, page });

  const stopPlaying = () => setPlayState({ ...playState, playing: false, progress: 0 });

  const togglePlaying = () => setPlayState({ ...playState, playing: !playState.playing });

  const repeat = () => setPlayState({ ...playState, progress: 0 });

  const next = () => {
    if (playState.repeat === 1) {
      repeat();
    } else if (songs.length === playState.currrent - 1 && playState.repeat === 0) {
      stopPlaying();
    } else {
      const current = (playState.currrent + 1) % songs.length;
      setPlayState({ ...playState, playing: true, current });
    }
  };

  const previous = () => {
    if (playState.repeat === 1) {
      repeat();
    } else if (playState.currrent === 0 && playState.repeat === 0) {
      stopPlaying();
    } else {
      const current = (playState.currrent + songs.length - 1) % songs.length;
      setPlayState({ ...playState, playing: true, current });
    }
  };

  return {
    playState: {
      state: playState,
      next,
      previous,
      togglePlaying,
    },
    appState: {
      state: appState,
      route,
    },
    songState: {
      songs,
      addSongs,
      removeSongs,
    },
  };
}

export const usePlayState = () => useContext(StateContext);

export function ProvideState({ children }) {
  const state = useProvideState();

  return (
    <StateContext.Provider value={state}>
      {children}
    </StateContext.Provider>
  );
}

ProvideState.propTypes = {
  children: PropTypes.node.isRequired,
};
