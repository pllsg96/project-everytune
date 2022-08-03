import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import './Header.css';
import Loading from './Loading';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingPage: false,
      username: '',
    };
  }

  componentDidMount = async () => {
    this.setState({ loadingPage: true });
    const user = await getUser();
    console.log(user.name);
    this.setState({ username: user.name });
    this.setState({ loadingPage: false });
  };

  render() {
    const { loadingPage, username } = this.state;

    if (loadingPage) return <Loading />;
    return (
      <div data-testid="header-component">
        <p data-testid="header-user-name">
          Bem vindo
          {' '}
          { username }
          {' '}
        </p>
      </div>
    );
  }
}

export default Header;
