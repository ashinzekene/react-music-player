import id3js from 'id3js';

/*
{
  "tags": {
    "title": " The Hill || busysinging.com",
    "album": null,
    "artist": "Travis Greene ",
    "year": null,
    "v1": {
      "title": null,
      "artist": null,
      "album": null,
      "year": null,
      "comment": null,
      "track": null,
      "version": 1
    },
    "v2": {
      "version": [
        3,
        0
      ],
      "title": " The Hill || busysinging.com",
      "artist": "Travis Greene ",
      "album": "",
      "genre": "Gospel Music",
      "comments": "Downloaded from busysinging.com || Visit BusySinging.com",
      "image": {
        "type": "icon",
        "mime": "image/jpeg",
        "description": "cover",
        "data": {}
      }
    }
  },
  "song": {}
}
*/

const formatData = (tags, song) => {
  const {title = song.title, album = '', artist = '', image = ''} = tags.v2;
  const result = {
    title,
    album,
    artist,
    song,
    image
  }
  for (const x in result) {
    if (!result[x]) {
      result[x] = tags[x] || '' 
    }
  }
  return result;
};

export default song => new Promise((resolve, reject) => 
    id3js(song, (err, tags) => err ? reject(err): resolve(formatData(tags, song)))
  )
  