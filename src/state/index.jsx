import React, {
  createContext, useState, useEffect, useContext,
} from 'react';
import PropTypes from 'prop-types';
import {
  getSongsFromStorage, getPlayStateFromStorage, setPlayStateInStorage, setSongsInStorage,
} from './storage';

/**
 *
 * PlayState
 * @typedef {Object} PlayState
 * @property {Boolean} playing - Whether the song is playing or not
 * @property {1|2|3} repeat - 0 - No repeat, 1 - Repeat current track, 2 repeat all
 * @property {Number} currrent - The index of the currently playing songs
 * @property {Number} progress - Play progress
 *
 * Song
 * @typedef {Object} Song
 * @property {Boolean} title - Title of the song
 * @property {String} artist - Main artist
 * @property {String[]} artists - All artists
 * @property {String} album - Song album
 * @property {String[]} genre - Genres of the song
 * @property {Number} year - Year of release
 * @property {any[]} picture - Album arts
 * @property {any} track - Song track
 */


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
      setSongs(initalSongs);
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

  useEffect(() => {
    setSongsInStorage(songs);
  }, [songs.length]);

  useEffect(() => {
    setPlayStateInStorage(songs);
  }, [playState]);

  const addSongs = (newSongs = []) => {
    setSongs([...songs, ...newSongs]);
  };

  const removeSong = (i) => {
    setSongs(songs.filter((s, index) => index !== i));
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
      removeSong,
    },
  };
}

/**
 * @returns {{
 *  next: (song: Song) => Song[]
 *  state: PlayState
 *  previous: (song: Song) => Song[]
 *  togglePlaying: (song: Song) => Song[]
 * }}
 */
export const usePlayState = () => useContext(StateContext).playState;
/**
 * @returns {{
 *  removeSong: (song: Song) => Song[]
 *  songs: Song[]
 *  addSongs: (song: Song[]) => Song[]
 * }}
 */
export const useSongState = () => useContext(StateContext).songState;
/**
 * @returns {{
 *  route: (route: Number) => Song[]
 *  state: { page: Number }
 * }}
 */
export const useAppState = () => useContext(StateContext).appState;

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
