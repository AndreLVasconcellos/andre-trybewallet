import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi, addRegister, newEditedRegister } from '../redux/actions';
import './WalletForm.css';

const INITIAL_STATE = {
  id: 0,
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: {},
  button: true,
};

class WalletForm extends Component {
  state = INITIAL_STATE;

  handleChange = ({ target }) => {
    const { cotationCurrence } = this.props;
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validInput);
    this.setState({ exchangeRates: cotationCurrence });
  };

  validInput = () => {
    const { value, description } = this.state;
    if (Number(value) > 0 && description) this.setState({ button: false });
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
      button: true,
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
    this.setState({
      value: '',
      description: '',
      button: true,
    });
  };

  render() {
    const { currencies, editor, expenses, idToEdit } = this.props;
    const { value, description, currency, method, tag, button } = this.state;
    const editExpense = expenses.filter((expense) => expense.id === idToEdit);
    console.log(editExpense);
    console.log(idToEdit);
    console.log(editor);
    return (
      <nav className="navbar navbar-light bg-light px-4 align-items-center">
        <label
          htmlFor="value-input"
          className="col mx-2 d-flex align-items-center justify-content-center"
        >
          Valor:
          <input
            type="number"
            id="value-imput"
            className="form-control"
            name="value"
            onChange={ this.handleChange }
            data-testid="value-input"
            value={ value }
          />
        </label>
        <label
          htmlFor="description-input"
          className="col mx-2 d-flex align-items-center justify-content-center"
        >
          Descrição:
          <input
            type="text"
            id="description-input"
            className="form-control"
            name="description"
            onChange={ this.handleChange }
            data-testid="description-input"
            value={ description }
          />
        </label>
        <label
          htmlFor="currencies"
          className="mx-2 d-flex align-items-center justify-content-center"
        >
          Moeda:
          <select
            id="currencies"
            onChange={ this.handleChange }
            name="currency"
            data-testid="currency-input"
            value={ currency }
            className="custom-select mr-sm-2"
          >
            {currencies
              .map((e) => (<option key={ e }>{e}</option>))}
          </select>
        </label>
        <label
          htmlFor="method-input"
          className="col mx-2 d-flex align-items-center justify-content-center"
        >
          Metódo de pagamento:
          <select
            id="method-input"
            data-testid="method-input"
            onChange={ this.handleChange }
            name="method"
            value={ method }
            className="custom-select mr-2"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label
          htmlFor="tag-input"
          className="col mx-2 d-flex align-items-center justify-content-center"
        >
          Tag:
          <select
            id="tag-input"
            data-testid="tag-input"
            onChange={ this.handleChange }
            name="tag"
            value={ tag }
            className="custom-select mr-sm-2"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>

        {editor ? (
          <div className="mx-2 d-flex align-items-center justify-content-center">
            <button
              type="button"
              disabled={ button }
              id="wallet-button"
              onClick={ this.editExpenseFunc }
              className="btn btn-primary mx-2"
            >
              Editar despesa
            </button>
          </div>
        ) : (
          <div className="mx-2 d-flex align-items-center justify-content-center">
            <button
              type="button"
              disabled={ button }
              id="wallet-button"
              onClick={ this.handleClickRegister }
              className="btn btn-danger mx-2"
            >
              Adicionar despesa
            </button>
          </div>
        )}
      </nav>
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
