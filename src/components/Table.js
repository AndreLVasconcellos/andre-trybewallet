import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteRegister, editRegister } from '../redux/actions';
import './Table.css';

class Table extends Component {
  render() {
    const { expenses, dispatch } = this.props;
    return (
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses
            .map(({ id, description, tag, method, value, currency, exchangeRates }) => (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{Number(value).toFixed(2)}</td>
                <td>{exchangeRates[currency].name}</td>
                <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                <td>
                  { parseFloat(exchangeRates[currency].ask * value).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="edit-btn"
                    id="edit-btn"
                    onClick={ () => dispatch(editRegister(id)) }
                    className="btn btn-primary"
                  >
                    <i className="bi bi-pencil-square" />
                  </button>
                  <button
                    data-testid="delete-btn"
                    id="delete-btn"
                    onClick={ () => dispatch(deleteRegister(id)) }
                    className="btn btn-danger mx-2"
                  >
                    <i className="bi bi-trash-fill" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(Table);
