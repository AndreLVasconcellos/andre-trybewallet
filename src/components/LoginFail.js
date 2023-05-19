import React from 'react';
import { Link } from 'react-router-dom';
import './LoginFail.css';

class LoginFail extends React.Component {
  render() {
    return (
      <div className="login-fail">
        <h1>Login não efetuado!</h1>
        <h3>
          Volte para a página de login
        </h3>
        <Link to="/" className="btn btn-primary">Página de login</Link>
      </div>
    );
  }
}

export default LoginFail;
