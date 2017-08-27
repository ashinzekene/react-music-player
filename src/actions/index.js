export const ADD_SONGS = 'ADD_SONGS'
export const REMOVE_SONGS = 'REMOVE_SONGS'
export const PLAY_SONG = 'PLAY_SONG'
export const FILTER_SONGS = 'FILTER_SONGS'
export const PLAYING_SONG = 'PLAYING_SONG'

export const addSongs = (songs) => ({
  type: ADD_SONGS,
  songs
})

export const removeSong = (id) => ({
  type: REMOVE_SONGS,
  id
})

export const playSong = (id) => ({
  type: PLAY_SONG,
  id
})

export const filterSong = (filter) => ({
  type: FILTER_SONGS,
  filter
})

export const playingSong = (id) => ({
  type: FILTER_SONGS,
  id
})
