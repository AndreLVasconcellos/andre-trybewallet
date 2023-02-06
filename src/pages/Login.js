import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveEmail, fetchApi } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    btnDisabled: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchApi());
  }

  handleErro = () => {
    const { email, password } = this.state;
    const Nun = 5;
    const teste = password.length > Nun && /\S+@\S+\.\S+/i.test(email);
    this.setState({
      btnDisabled: !teste,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.handleErro);
  };

  handleLogin = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;

    dispatch(saveEmail(email));
    history.push('/carteira');
  };

  render() {
    const { btnDisabled } = this.state;
    return (
      <form>
        <h1>Login</h1>
        <input
          type="email"
          onChange={ this.handleChange }
          name="email"
          placeholder="E-mail"
          required
          data-testid="email-input"
        />
        <input
          type="password"
          placeholder="Senha"
          name="password"
          onChange={ this.handleChange }
          required
          data-testid="password-input"
        />
        <button
          type="button"
          disabled={ btnDisabled }
          onClick={ this.handleLogin }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
