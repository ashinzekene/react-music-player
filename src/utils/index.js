import * as mm from 'music-metadata-browser';

export const processSong = (track) => new Promise(async resolve => {
  const metadata = await mm.parseBlob(track)
  resolve({
    ...metadata.common,
    track
  })
})

export const transformPictures = (pictures = []) => 
  pictures.map(pic => URL.createObjectURL(pic))
