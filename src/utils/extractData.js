import id3 from 'id3js';

// artist || band || publisher

const transformTags = (tag) => {
  const song = {
    title: '',
    album: '',
    image: '',
    artist: '',
    genre: '',
  };
};

export default song => new Promise((resolve, reject) => {
  id3(song, (err, tag) => (err ? reject(err) : resolve(transformTags(tag))));
});
