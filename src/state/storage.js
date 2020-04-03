import localforage from 'localforage';


export const getPlayStateFromStorage = () => localforage.getItem('songs') || [];

export const getSongsFromStorage = () => localforage.getItem('songs') || [];
