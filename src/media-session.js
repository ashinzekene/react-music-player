import { togglePlaying } from './actions/index';

let store;
const mediaSessionEnabled = ('mediaSession' in navigator);
const addNewSong = (id) => {
  console.log(id);
  navigator.mediaSession.metadata = new window.MediaMetadata({
    title: 'Never Gonna Give You Up',
    artist: 'Rick Astley',
    album: 'Whenever You Need Somebody',
    artwork: [{
      src: 'icons/mipmap-xhdpi/ic_launcher.png',
      sizes: '96x96',
      type: 'image/png',
    }, {
      src: 'icons/mipmap-xxhdpi/ic_launcher.png',
      sizes: '144x144',
      type: 'image/png',
    }, {
      src: 'icons/mipmap-xxxhdpi/ic_launcher.png',
      sizes: '192x192',
      type: 'image/png',
    }, {
      src: 'icons/playstore/icon.png',
      sizes: '512x512',
      type: 'image/png',
    }],
  });
};

const addActionListeners = () => {
  navigator.mediaSession.setActionHandler('previoustrack', () => {
    // User clicked "Previous Track" media notification icon.
    // index = (index - 1 + playlist.length) % playlist.length;
    // playAudio();
  });

  navigator.mediaSession.setActionHandler('nexttrack', () => {
    // User clicked "Next Track" media notification icon.
    // index = (index + 1) % playlist.length;
    // playAudio();
  });

  navigator.mediaSession.setActionHandler('play', () => {
    // User clicked "Play" media notification icon.
    if (store) store.dispatch(togglePlaying());
    // Do something more than just playing current audio...
  });

  navigator.mediaSession.setActionHandler('pause', () => {
    if (store) store.dispatch(togglePlaying());
    // User clicked "Pause" media notification icon.
    // Do something more than just pausing current audio...
  });
};
if (mediaSessionEnabled) addActionListeners();

export default {
  setStore(s) {
    store = s;
  },
  playSong(song) {
    if (mediaSessionEnabled) {
      addNewSong(song);
    }
  },
};
