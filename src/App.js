import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Login from './pages/Login';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
// import { createUser } from './services/userAPI';

class App extends Component {
  constructor(props) {
    super(props);
    // Aqui é onde está sendo setado o estado inicial
    this.state = {
      isSaveButtonDisabled: true,
      inputValue: '',
      // loadingPage: false,
    };
  }

// Função que captura as mudanças das entradas
handleChange = ({ target: { name, value } }) => {
  this.setState(() => ({ [name]: value }), this.handleButtonDisable);
};

// Função para habilitar ou desabilitar o botão entrar, de acordo com a quantidade de caracteres
// existentes na entrada
handleButtonDisable = () => {
  const { inputValue } = this.state;
  const minLength = 3;
  this.setState({ isSaveButtonDisabled: (inputValue.length < minLength) });
}

render() {
  const { isSaveButtonDisabled, inputValue } = this.state;
  return (
    <BrowserRouter>
      <p>TrybeTunes</p>
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
              // clickedButton={ this.clickedButton }
              // loadingPage={ loadingPage }
            />
          ) }
        />
        <Route exact path="/search" component={ Search } />
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
//

export default App;
