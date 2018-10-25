import React from 'react';
import propTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import PlayingCtrl from '../components/PlayingCtrl';

const PlayingView = ({
  playNext,
  timeDrag,
  repeatType,
  currentTime,
  playingSong,
  openSnackbar,
  playPrevious,
  installEvent,
}) => (
  <div>
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px',
    }}
    >
      <FontIcon className="material-icons" style={{ width: '300px', fontSize: '300px', color: 'rgba(0,0,0,0.3)' }}>album</FontIcon>
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

PlayingView.propTypes = {
  timeDrag: propTypes.func.isRequired,
  playNext: propTypes.func.isRequired,
  repeatType: propTypes.number.isRequired,
  openSnackbar: propTypes.func.isRequired,
  playPrevious: propTypes.func.isRequired,
  installEvent: propTypes.oneOf([propTypes.func.isRequired, propTypes.any]).isRequired,
  currentTime: propTypes.number.isRequired,
  playingSong: propTypes.objectOf(propTypes.any).isRequired,
};

export default PlayingView;
