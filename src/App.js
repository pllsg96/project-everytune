import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Login from './pages/Login';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSaveButtonDisabled: true,
      inputValue: '',
      isSearchButtonDisabled: true,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    console.log(name, value);
    this.setState(() => ({ [name]: value }), this.handleButtonDisable);
  };

  handleButtonDisable = () => {
    const { inputValue } = this.state;
    const minLength = 3;
    const mLengthSearch = 2;
    this.setState({
      isSaveButtonDisabled: (inputValue.length < minLength),
      isSearchButtonDisabled: (inputValue.length < mLengthSearch),
    });
  }

  render() {
    const { isSaveButtonDisabled, inputValue, isSearchButtonDisabled } = this.state;
    return (
      <BrowserRouter>
        <p className="title">TrybeTunes</p>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (
              <Login
                { ...props }
                handleChange={ this.handleChange }
                isSaveButtonDisabled={ isSaveButtonDisabled }
                inputValue={ inputValue }
              />
            ) }
          />

          <Route
            exact
            path="/search"
            render={ (props) => (
              <Search
                { ...props }
                handleChange={ this.handleChange }
                inputValue={ inputValue }
                isSearchButtonDisabled={ isSearchButtonDisabled }
              />
            ) }
          />

          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route path="" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
