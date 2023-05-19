import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import wallet from '../img/wallet.png';
import user from '../img/user.png';
import money from '../img/money.png';
import './Header.css';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const teste = expenses.map((e) => e.currency);
    console.log(teste);
    console.log(expenses);
    const totalExpenses = expenses.reduce((acc, curr) => {
      const { currency, exchangeRates } = curr;
      const cotation = exchangeRates[currency].ask;
      const moeda = parseInt(curr.value, Number) * cotation;
      return acc + moeda;
    }, 0).toFixed(2);
    console.log(totalExpenses);
    return (
      <header className="navbar navbar-light bg-light">
        <div className="navbar-brand d-flex flex-row" href="#">
          <img src={ wallet } className="d-inline-block align-top mx-3" alt="wallet" />
        </div>
        <div
          className=" mr-sm-2"
          data-testid="email-field"
        >
          <img src={ user } className="d-inline-block align-top mx-2" alt="user" />
          {email}
        </div>
        <div className="align-items-sm-baseline  d-flex mx-3">
          <img src={ money } className="d-inline-block align-top mx-2" alt="money" />
          Despesa Total:&nbsp; R$&nbsp;
          <p data-testid="total-field">{totalExpenses}</p>
          <p className=" mx-3" data-testid="header-currency-field">BRL</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(Header);
