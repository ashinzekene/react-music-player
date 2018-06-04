# MUSIC PLAYER

 A simple react music player that plays local files using the Files API 

 [CHECK OUT THE WEB APP](https://ashinzekene.github.io/react-music-player)

  ![React-music-player](image.png)

## CONTRIBUTING

Feel free to contribute to the repo. Make sure you configure eslint, or run lint before submitting pull requests
### TECH STACK
- React
- Redux

## TODO LIST

1. Play Next Automatically ✅
1. Controls - Next, Previous, Progress Bar ✅
1. Saving Songs(localStroage) ✅
1. UI ✅
1. A Page for currently playing song ✅
1. Host on GitHub ✅
1. Repeat ✅
1. Seek progressbar on nowPlayingPage ✅
1. Let playing song show as playing
1. Add Icons to sidebar
1. Show Time
1. Fix linting
1. Shuffle
1. Search
1. Playlists

## BUGS

1. Pauses on state change ✅
  > Was due to the fact the audio element was in a child component which unmounts
  > was resolved by moving the audio element to a component that does not unmount