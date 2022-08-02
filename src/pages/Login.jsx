import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { createUser } from '../services/userAPI';

class Login extends Component {
  render() {
    const {
      isSaveButtonDisabled,
      handleChange,
      inputValue,
      clickedButton,
    } = this.props;

    return (
      <div data-testid="page-login">
        <form action="">

          <label htmlFor="login-name-input">
            Seu nome:
            <input
              type="text"
              name="inputValue"
              data-testid="login-name-input"
              onChange={ handleChange }
              value={ inputValue }
            />
          </label>
          <br />

          <button
            type="button"
            name="login-submit-button"
            data-testid="login-submit-button"
            disabled={ isSaveButtonDisabled }
            onClick={ clickedButton }
          >
            Entrar
          </button>

        </form>
      </div>
    );
  }
}

Login.propTypes = {
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  clickedButton: PropTypes.func.isRequired,
};

export default Login;
