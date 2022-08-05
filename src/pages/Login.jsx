import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingPage: false,
      inputValue: '',
      isSaveButtonDisabled: true,
    };
  }

  handleButtonDisable = () => {
    const { inputValue } = this.state;
    const minLength = 3;
    // const mLengthSearch = 2;
    this.setState({
      isSaveButtonDisabled: (inputValue.length < minLength),
      // isSearchButtonDisabled: (inputValue.length < mLengthSearch),
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState(() => ({ [name]: value }), this.handleButtonDisable);
  };

  clickedButton = async () => {
    const { history } = this.props;
    const { inputValue } = this.state;
    this.setState({ loadingPage: true });
    await createUser({ name: inputValue });
    history.push('/search');
  };

  render() {
    const { loadingPage, inputValue, isSaveButtonDisabled } = this.state;

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
              onChange={ this.handleChange }
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
