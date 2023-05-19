import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveEmail, fetchApi } from '../redux/actions';
import wallet from '../img/wallet.png';
import './Login.css';

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
      <div className="login">
        <form className="form_control">
          <div className="form-row rounded-3">
            <h1 className="font d-flex justify-content-center">
              <img src={ wallet } alt="carteira" />
            </h1>
            <div className="form-group d-flex justify-content-center">
              <input
                type="email"
                onChange={ this.handleChange }
                name="email"
                className="form-control"
                placeholder="E-mail"
                required
                data-testid="email-input"
              />
            </div>
            <div className="form-group d-flex justify-content-center">
              <input
                type="password"
                placeholder="Senha"
                name="password"
                className="form-control"
                onChange={ this.handleChange }
                required
                data-testid="password-input"
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              disabled={ btnDisabled }
              onClick={ this.handleLogin }
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
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
