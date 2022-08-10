import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      allFavTracks: [],
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const favoritedTracks = await getFavoriteSongs();
    this.setState({ loading: false, allFavTracks: favoritedTracks });
  }

  addToFav = async (track) => {
    this.setState({ loading: true });
    await addSong(track);
    const favoritedTracks = await getFavoriteSongs();
    this.setState({ loading: false, allFavTracks: favoritedTracks });
  }

  handleAllFavorites = (event, track) => {
    // console.log(track);
    event.preventDefault();
    if (event.target.checked) {
      this.addToFav(track);
    }
  };

  render() {
    const { loading, allFavTracks } = this.state;
    const { tracks } = this.props;
    // console.log(allFavTracks);
    // console.log(tracks);
    return (
      <section>
        { loading ? <Loading />
          : (
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
                  <label
                    htmlFor={ `favSong${track.trackId}` }
                    data-testid={ `checkbox-music-${track.trackId}` }
                  >
                    Favorita
                    <input
                      type="checkbox"
                      id={ `favSong${track.trackId}` }
                      name="favoriteSong"
                      checked={ allFavTracks.some(({ trackId }) => (
                        ((trackId === track.trackId))
                      )) }
                      onChange={ (event) => (this.handleAllFavorites(event, track)) }
                    />
                  </label>
                </div>
              ))}
            </li>
          )}
      </section>
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
