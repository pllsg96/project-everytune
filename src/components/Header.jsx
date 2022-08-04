import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    this.setState({ username: user.name });
    this.setState({ loadingPage: false });
  };

  render() {
    const { loadingPage, username } = this.state;

    if (loadingPage) return <Loading />;
    return (
      <section>
        <div data-testid="header-component">
          <p data-testid="header-user-name">
            Bem vindo
            {' '}
            { username }
            {' '}
          </p>
        </div>
        <div>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          {' '}
          <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
          {' '}
          <Link to="/profile" data-testid="link-to-profile">Favoritas</Link>
        </div>
      </section>
    );
  }
}

export default Header;
