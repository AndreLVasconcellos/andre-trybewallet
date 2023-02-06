import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
      <header>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">{totalExpenses}</p>
        <p data-testid="header-currency-field">BRL</p>
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
