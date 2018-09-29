import React from 'react';
import propTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
// import Header from '../components/Header';
import PlayingCtrl from '../components/PlayingCtrl';

const PlayingView = props => (
  <div>
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px',
    }}
    >
      <FontIcon className="material-icons" style={{ width: '300px', fontSize: '300px', color: 'rgba(0,0,0,0.3)' }}>album</FontIcon>
    </div>
    <PlayingCtrl
      currentTime={props.currentTime}
      timeDrag={props.timeDrag}
      song={props.playingSong}
      openSnackbar={props.openSnackbar}
      playNext={props.playNext}
      playPrevious={props.playPrevious}
      repeatType={props.repeatType}
    />
  </div>
);

PlayingView.propTypes = {
  playNext: propTypes.func.isRequired,
  timeDrag: propTypes.func.isRequired,
  playPrevious: propTypes.func.isRequired,
  currentTime: propTypes.number.isRequired,
  playingSong: propTypes.objectOf(propTypes.any).isRequired,
  repeatType: propTypes.number.isRequired,
  openSnackbar: propTypes.func.isRequired,
};

export default PlayingView;
