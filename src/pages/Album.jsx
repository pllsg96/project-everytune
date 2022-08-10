import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      loading: true,
      tracksWithNo0: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const allAlbumInfo = await getMusics(id);
    const sliceTracks = allAlbumInfo.slice(1);
    this.setState({
      tracks: allAlbumInfo[0],
      loading: false,
      tracksWithNo0: sliceTracks,
    });
  }

  render() {
    const { loading, tracks, tracksWithNo0 } = this.state;

    return (
      <section>
        { loading && <Loading /> }
        { (!loading && tracksWithNo0.length) && (
          <div data-testid="page-album">
            <Header />
            <h4 data-testid="artist-name">
              Artista:
              {' '}
              {tracks.artistName}
            </h4>
            <h5 data-testid="album-name">
              Álbum:
              {' '}
              {tracks.collectionName}
            </h5>
          </div>
        )}
        <div>
          <ul>
            <MusicCard tracks={ tracksWithNo0 } />
          </ul>
        </div>
      </section>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
