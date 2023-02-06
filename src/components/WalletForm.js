import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi, addRegister, newEditedRegister } from '../redux/actions';

const INITIAL_STATE = {
  id: 0,
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: {},
};

class WalletForm extends Component {
  state = INITIAL_STATE;

  handleChange = ({ target }) => {
    const { cotationCurrence } = this.props;
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.setState({ exchangeRates: cotationCurrence });
  };

  handleClickRegister = async () => {
    const { dispatch } = this.props;
    await dispatch(fetchApi());
    const { cotationCurrence } = this.props;
    const testeOne = await cotationCurrence;
    this.setState({ exchangeRates: testeOne });
    const {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    } = this.state;
    dispatch(addRegister({
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    }));
    this.setState({
      id: id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  editExpenseFunc = () => {
    const { expenses, idToEdit, dispatch } = this.props;
    const { value, description, currency, method, tag } = this.state;

    const expense = {
      id: idToEdit,
      value,
      description,
      currency,
      method,
      tag,
    };

    const objEdit = expenses.map((exp) => {
      if (exp.id === idToEdit) {
        exp = { ...exp, ...expense };
      }
      return exp;
    });

    dispatch(newEditedRegister(objEdit));
  };

  render() {
    const { currencies, editor, expenses, idToEdit } = this.props;
    const { value, description, currency, method, tag, button } = this.state;
    const editExpense = expenses.filter((expense) => expense.id === idToEdit);
    console.log(editExpense);
    console.log(idToEdit);
    console.log(editor);
    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          <input
            type="number"
            id="value-imput"
            name="value"
            onChange={ this.handleChange }
            data-testid="value-input"
            value={ value }
          />
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            id="description-input"
            name="description"
            onChange={ this.handleChange }
            data-testid="description-input"
            value={ description }
          />
        </label>
        <label htmlFor="currencies">
          Moeda:
          <select
            id="currencies"
            onChange={ this.handleChange }
            name="currency"
            data-testid="currency-input"
            value={ currency }
          >
            {currencies
              .map((elemen) => (<option key={ elemen }>{elemen}</option>))}
          </select>
        </label>
        <label htmlFor="method-input">
          Metódo de pagamento:
          <select
            id="method-input"
            data-testid="method-input"
            onChange={ this.handleChange }
            name="method"
            value={ method }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag-input">
          Tag:
          <select
            id="tag-input"
            data-testid="tag-input"
            onChange={ this.handleChange }
            name="tag"
            value={ tag }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>

        {editor ? (
          <button
            type="button"
            disabled={ button }
            id="wallet-button"
            onClick={ this.editExpenseFunc }
          >
            Editar Despesa
          </button>
        ) : (
          <button
            type="button"
            disabled={ button }
            id="wallet-button"
            onClick={ this.handleClickRegister }
          >
            Adicionar despesa
          </button>
        )}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  idToEdit: state.wallet.idToEdit,
  editor: state.wallet.editor,
  expenses: state.wallet.expenses,
  cotationCurrence: state.wallet.cotationCurrence,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  expenses: PropTypes.arrayOf().isRequired,
  idToEdit: PropTypes.number.isRequired,
  cotationCurrence: PropTypes.arrayOf().isRequired,
  currencies: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
