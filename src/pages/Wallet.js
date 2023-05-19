import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import LoginFail from '../components/LoginFail';
import { fetchApi } from '../redux/actions';
import './Wallet.css';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchApi());
  }

  render() {
    const { email } = this.props;
    if (email === '') {
      return <LoginFail />;
    }
    return (
      <>
        <Header />
        <WalletForm />
        <Table />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
