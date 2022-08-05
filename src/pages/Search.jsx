import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Search extends Component {
  render() {
    const {
      handleChange,
      inputValue,
      isSearchButtonDisabled,
    } = this.props;
    return (
      <section>
        <div data-testid="page-search">
          <Header />
        </div>
        <div>
          <input
            type="text"
            name="inputValue"
            onChange={ handleChange }
            value={ inputValue }
            data-testid="search-artist-input"
          />

          <button
            type="button"
            disabled={ isSearchButtonDisabled }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </div>
      </section>
    );
  }
}

Search.propTypes = {
  handleChange: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  isSearchButtonDisabled: PropTypes.bool.isRequired,
};

export default Search;
