export const ADD_SONGS = 'ADD_SONGS'
export const REMOVE_SONGS = 'REMOVE_SONGS'
export const TOGGLE_PLAYING = 'TOGGLE_PLAYING'
export const FILTER_SONGS = 'FILTER_SONGS'
export const PLAY_SONG = 'PLAY_SONG'
export const PLAY_NEXT = 'PLAY_NEXT'
export const PLAY_PREVIOUS = 'PLAY_PREVIOUS'
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'
export const HOME_PAGE = 'HOME_PAGE'
export const NOW_PLAYING_PAGE = 'NOW_PLAYING_PAGE'
export const PLAYLIST_PAGE = 'PLAYLIST_PAGE'

export const addSongs = (songs) => ({
  type: ADD_SONGS,
  songs
})

export const removeSong = id => ({
  type: REMOVE_SONGS,
  id
})

export const playSong = id => ({
  type: PLAY_SONG,
  id
})

export const filterSong = (filter) => ({
  type: FILTER_SONGS,
  filter
})

export const togglePlaying = () => ({
  type: TOGGLE_PLAYING
})

export const playNext = () => ({
  type: PLAY_NEXT
})

export const playPrevious = () => ({
  type: PLAY_PREVIOUS
})

export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR
})

export const goHome = () => ({
  type: HOME_PAGE
})

export const goToNowPlaying = () => ({
  type: NOW_PLAYING_PAGE
})