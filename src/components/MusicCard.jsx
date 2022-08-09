import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  allFavorites = () => {
    console.log('ok');
  };

  render() {
    const { tracks } = this.props;
    console.log(tracks);
    return (
      <li>
        {tracks.map((track) => (
          <div key={ track.trackId }>
            <p>{ track.trackName }</p>
            <audio data-testid="audio-component" src={ track.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
            <input
              type="checkbox"
              name="favoriteSong"
              onChange={ this.allFavorites }
            />
          </div>
        ))}
      </li>
    );
  }
}

MusicCard.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.shape({
    trackName: PropTypes.string,
    trackId: PropTypes.number,
  })).isRequired,
};

export default MusicCard;
