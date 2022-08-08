import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const allAlbumInfo = await getMusics(id);
    this.setState({ tracks: allAlbumInfo, loading: false });
    // console.log(allAlbumInfo);
  }

  render() {
    const { loading, tracks } = this.state;
    console.log(tracks);

    return (
      <div>
        { loading && <Loading /> }
        { (!loading && tracks.length) && (
          <div data-testid="page-album">
            <Header />
            <h4 data-testid="artist-name">
              Artista:
              {' '}
              {tracks[0].artistName}
            </h4>
            <h5 data-testid="album-name">
              Álbum:
              {' '}
              {tracks[0].collectionName}
            </h5>
          </div>
        )}
      </div>
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
