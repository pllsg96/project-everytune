import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingPage: false,
      inputValue: '',
      isSearchButtonDisabled: true,
      albuns: [],
      artistName: '',
      didAcquisition: false,
    };
  }

  clickedButton = async () => {
    const { inputValue } = this.state;
    this.setState({ loadingPage: true });
    const x = await searchAlbumsAPI(inputValue);
    this.setState({
      loadingPage: false,
      inputValue: '',
      artistName: inputValue,
      albuns: x,
      didAcquisition: true,
      isSearchButtonDisabled: true,
    });
  };

  handleButtonDisable = () => {
    const { inputValue } = this.state;
    const mLengthSearch = 2;
    this.setState({
      isSearchButtonDisabled: (inputValue.length < mLengthSearch),
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState(() => ({ [name]: value }), this.handleButtonDisable);
  };

  render() {
    const { inputValue,
      isSearchButtonDisabled,
      loadingPage,
      albuns,
      artistName,
      didAcquisition } = this.state;

    return (
      <section>
        <div data-testid="page-search">
          <Header />
        </div>
        <div>
          <input
            type="text"
            name="inputValue"
            onChange={ this.handleChange }
            value={ inputValue }
            data-testid="search-artist-input"
          />
          {' '}

          <button
            type="button"
            disabled={ isSearchButtonDisabled }
            data-testid="search-artist-button"
            onClick={ this.clickedButton }
          >
            Pesquisar
          </button>
        </div>
        {loadingPage && <Loading />}
        {(didAcquisition && !albuns.length) && <h4> Nenhum álbum foi encontrado</h4>}
        {(didAcquisition && albuns.length)
          && (
            <div>
              <p>
                Resultado de álbuns de:
                {' '}
                { artistName }
              </p>
              <ul>
                {albuns.map(({
                  collectionId,
                  collectionName,
                  artworkUrl100,
                  collectionPrice,
                }) => (
                  <li className="box__album" key={ collectionId }>
                    <h3>{ collectionName }</h3>
                    <img src={ artworkUrl100 } alt="" />
                    <h4>{ collectionPrice }</h4>
                    <Link
                      data-testid={ `link-to-album-${collectionId}` }
                      to={ `/album/${collectionId}` }
                    >
                      Info
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
      </section>
    );
  }
}

export default Search;
