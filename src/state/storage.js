import localforage from 'localforage';

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

/**
 * @returns {Promise<PlayState>} data
 */
export const getPlayStateFromStorage = () => localforage.getItem('playState') || {};

/**
 * @returns {Promise<Song[]>}
 */
export const getSongsFromStorage = () => localforage.getItem('songs') || [];

/**
 * Sets the play state
 * @param {Partial<PlayState>} playState new play state to set
 * @returns {Promise<PlayState>}
 */
export const setPlayStateInStorage = (playState = {}) => {
  const oldPlayState = localforage.getItem('playState');
  return localforage.setItem('playState', {
    ...oldPlayState,
    ...playState,
  });
};

/**
 * Adds songs
 * @param {Song[]} songs songs to add
 * @returns {Promise<Song[]>}
 */
export const setSongsInStorage = (songs = []) => {
  if (!songs.length) {
    return null;
  }
  return localforage.setItem('songs', songs);
};
