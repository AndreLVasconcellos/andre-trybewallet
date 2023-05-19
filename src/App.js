import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/trybewallet" component={ Login } />
        <Route path="/trybewallet/carteira" component={ Wallet } />
        <Route component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
