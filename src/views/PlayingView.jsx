import React from 'react';
import propTypes from 'prop-types';
import Album from '@material-ui/icons/Album';

import PlayingCtrl from '../components/PlayingCtrl';

const PlayingView = ({
  playNext, timeDrag, repeatType, currentTime,
  playingSong, openSnackbar, playPrevious, installEvent,
}) => (
  <div>
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px',
    }}
    >
      <Album style={{ width: '300px', fontSize: '300px', color: 'rgba(0,0,0,0.3)' }} />
    </div>
    <PlayingCtrl
      song={playingSong}
      playNext={playNext}
      timeDrag={timeDrag}
      repeatType={repeatType}
      installEvent={installEvent}
      currentTime={currentTime}
      openSnackbar={openSnackbar}
      playPrevious={playPrevious}
    />
  </div>
);

PlayingView.defaultProps = {
  installEvent: () => {},
};

PlayingView.propTypes = {
  timeDrag: propTypes.func.isRequired,
  playNext: propTypes.func.isRequired,
  repeatType: propTypes.number.isRequired,
  openSnackbar: propTypes.func.isRequired,
  playPrevious: propTypes.func.isRequired,
  installEvent: propTypes.func,
  currentTime: propTypes.number.isRequired,
  playingSong: propTypes.objectOf(propTypes.any).isRequired,
};

export default PlayingView;
