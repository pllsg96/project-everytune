import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingPage: false,
      inputValue: '',
      isSearchButtonDisabled: true,
      albuns: [],
    };
  }

  clickedButton = async () => {
    const { inputValue } = this.state;
    this.setState({ loadingPage: true });
    const x = await searchAlbumsAPI(inputValue);
    this.setState({ loadingPage: false });
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
    const { inputValue, isSearchButtonDisabled, loadingPage, albuns } = this.state;
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
        <div>
          {loadingPage ? <Loading />
            : <p>
              {' '}
              { albuns }
              {' '}
            </p>}
        </div>
      </section>
    );
  }
}

export default Search;
