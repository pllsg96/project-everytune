import React, { Component } from 'react';

class MusicCard extends Component {
  render() {
    const { tracks } = this.props;
    return (
      <>
        <h1>{tracks.artistName}</h1>
        <div>MusicCard</div>
      </>
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
