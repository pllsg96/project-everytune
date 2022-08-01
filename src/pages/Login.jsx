import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  render() {
    const { isSaveButtonDisabled, handleChangeInput } = this.props;

    return (
      <div data-testid="page-login">
        {/* Login */}
        <form action="">

          <label htmlFor="login-name-input">
            Seu nome:
            <input
              type="text"
              name="login-name-input"
              data-testid="login-name-input"
              onChange={ this.handleChangeInput }
            />
          </label>
          <br />

          <button
            type="submit"
            name="login-submit-button"
            data-testid="login-submit-button"
            disabled={ isSaveButtonDisabled }
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
  handleChangeInput: PropTypes.func.isRequired,
};

export default Login;
