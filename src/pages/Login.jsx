import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingPage: false,
    };
  }

  clickedButton = async () => {
    const { history, inputValue } = this.props;
    console.log(inputValue);
    this.setState({ loadingPage: true });
    await createUser({ name: inputValue });
    history.push('/search');
  };

  render() {
    const {
      isSaveButtonDisabled,
      handleChange,
      inputValue,
    } = this.props;

    const { loadingPage } = this.state;

    if (loadingPage) return <Loading />;

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
            onClick={ this.clickedButton }
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
  // clickedButton: PropTypes.func.isRequired,
  history: PropTypes.string.isRequired,
};

export default Login;
