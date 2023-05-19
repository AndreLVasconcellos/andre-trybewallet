import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

export const HEADER_LOGIN = /login/i;
export const EMAIL_INPUT = 'email-input';
export const PASSWORD_INPUT = 'password-input';
export const VALUE_INPUT = 'value-input';
export const DESCRIPTION_INPUT = 'description-input';
export const CURRENCY_INPUT = 'currency-input';
export const METHOD_INPUT = 'method-input';
export const TAG_INPUT = 'tag-input';
export const EDIT_BUTTON = 'edit-btn';
export const DELETE_BUTTON = 'delete-btn';
export const EMAIL_FIELD = 'email-field';
export const TOTAL_FIELD = 'total-field';
export const WALLET_ENTRIES = '/carteira';
export const EMAIL_DEFAULT = 'teste@email.com';
export const PASSWORD_DEFAULT = '123456';

export const currenciesTeste = ['USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC', 'EUR', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE'];

export const INITIAL_STATE = {
  user: {
    email: EMAIL_DEFAULT,
  },
  wallet: {
    currencies: [],
    expenses: [],
    editor: false,
    idToEdit: 0,
    cotationCurrence: mockData,
    teste: [],
  },
};

const INITIAL_STATE_tWO = {
  id: 0,
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: {},
  button: true,
};

describe('teste Login component', () => {
  it('should render the Login component', () => {
    renderWithRouterAndRedux(<App />);
    const imgWallet = screen.getByAltText('carteira');
    expect(imgWallet).toBeInTheDocument();
    const email = screen.getByTestId('email-input');
    expect(email).toBeInTheDocument();
    const password = screen.getByTestId('password-input');
    expect(password).toBeInTheDocument();
    const button = screen.getByText('Entrar');
    expect(button).toBeInTheDocument();
  });

  it('it is possible to type in the email and password Inputs', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByText('Entrar');
    expect(button).toBeDisabled();
    userEvent.type(email, 'teste@email.com');
    expect(email).toHaveValue('teste@email.com');
    expect(button).toBeDisabled();
    userEvent.type(password, '123456');
    expect(password).toHaveValue('123456');
    expect(button).toBeEnabled();
  });

  //   it('testing the button and the inputs are populating correctly', () => {
  //     renderWithRouterAndRedux(<App />);
  //     const email = screen.getByTestId('email-input');
  //     const password = screen.getByTestId('password-input');
  //     const button = screen.getByText('Entrar');
  //     expect(button).toBeDisabled();
  //     userEvent.type(email, EMAIL_DEFAULT);
  //     userEvent.type(password, PASSWORD_DEFAULT);
  //     expect(button).toBeEnabled();
  //     expect(button2).toBeInTheDocument();
  //   });

  it('when clicking on the button, the user is redirected to "/carteira"', () => {
    const { history } = renderWithRouterAndRedux(<App />, { INITIAL_STATE });
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByText('Entrar');
    userEvent.type(email, EMAIL_DEFAULT);
    userEvent.type(password, PASSWORD_DEFAULT);
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe(WALLET_ENTRIES);
  });
});
describe('teste Wallet Page', () => {
  it('should render the Header component', () => {
    const initialEntries = [WALLET_ENTRIES];
    const initialState = INITIAL_STATE;

    renderWithRouterAndRedux(<App />, { initialState, initialEntries });

    const email = screen.getByTestId(EMAIL_FIELD);
    const totalExpenses = screen.getByTestId(TOTAL_FIELD);
    const imgWallet = screen.getByAltText('wallet');
    const imgUser = screen.getByAltText('user');
    const imgMoney = screen.getByAltText('money');
    const brl = screen.getByTestId(TOTAL_FIELD);

    expect(email).toBeInTheDocument();
    expect(totalExpenses).toBeInTheDocument();
    expect(imgWallet).toBeInTheDocument();
    expect(imgUser).toBeInTheDocument();
    expect(imgMoney).toBeInTheDocument();
    expect(brl).toBeInTheDocument();

    expect(email).toHaveTextContent(EMAIL_DEFAULT);
    expect(totalExpenses).toHaveTextContent('0.00');
    expect(email).toHaveTextContent(EMAIL_DEFAULT);

    // expect(email).toHaveTextContent(EMAIL_DEFAULT); não ententei pq não passou
  });

  it('Should render the WalletForm component', async () => {
    const initialEntries = [WALLET_ENTRIES];
    const initialState = INITIAL_STATE;

    renderWithRouterAndRedux(<App />, { initialState, initialEntries });

    const value = screen.getByTestId(VALUE_INPUT);
    const description = screen.getByTestId(DESCRIPTION_INPUT);
    const currency = screen.getByTestId(CURRENCY_INPUT);
    const method = screen.getByTestId(METHOD_INPUT);
    const tag = screen.getByTestId(TAG_INPUT);
    const button = screen.getByRole('button', { name: /Adicionar despesa/i });

    expect(value).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    await waitFor(() => {
      currenciesTeste.forEach((sigla, index) => {
        const option = screen.getAllByRole('option', { value: sigla });
        expect(option[index]).toHaveValue(sigla);
        expect(option[index]).toBeInTheDocument();
      });
    });

    expect(method).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('shoud call the API when "Adicionar despesas" was clicked, total must be updated ', async () => {
    const initialEntries = [WALLET_ENTRIES];
    const initialState = INITIAL_STATE;
    renderWithRouterAndRedux(<App />, { initialState, initialEntries });
    const value = screen.getByTestId(VALUE_INPUT);
    const description = screen.getByTestId(DESCRIPTION_INPUT);
    const currency = screen.getByTestId(CURRENCY_INPUT);
    const method = screen.getByTestId(METHOD_INPUT);
    const tag = screen.getByTestId(TAG_INPUT);
    const button = screen.getByRole('button', { name: /Adicionar despesa/i });
    const total = screen.getByTestId(TOTAL_FIELD);

    userEvent.type(value, '100');
    expect(button).toBeDisabled();
    userEvent.type(description, 'description');
    userEvent.type(currency, 'USD');
    userEvent.type(method, 'Dinheiro');
    userEvent.type(tag, 'Alimentação');
    userEvent.click(button);

    expect(total).not.toBe('0');
  });

  it('should render the Table component', async () => {
    const initialEntries = [WALLET_ENTRIES];
    const initialState = INITIAL_STATE;
    const tableHeaderList = [
      'Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir',
    ];

    renderWithRouterAndRedux(<App />, { initialState, initialEntries });

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    tableHeaderList.forEach(async (header) => {
      await waitFor(() => {
        const tableHeader = screen.getByRole('columnheader', { name: header });
        expect(tableHeader).toBeInTheDocument();
      });
    });
  });

  //   it('should fetch be called on table component', async () => {
  //     const initialEntries = [WALLET_ENTRIES];
  //     const initialState = INITIAL_STATE;

  //     renderWithRouterAndRedux(<App />, { initialState, initialEntries });

  //   });

  it('shoud be exclude de row when delete button was clicked', async () => {
    const initialEntries = [WALLET_ENTRIES];
    const initialState = INITIAL_STATE;

    renderWithRouterAndRedux(<App />, { initialEntries: ['/'], INITIAL_STATE });

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByText('Entrar');
    userEvent.type(email, EMAIL_DEFAULT);
    userEvent.type(password, PASSWORD_DEFAULT);
    userEvent.click(button);

    const value = screen.getByTestId(VALUE_INPUT);
    const description = screen.getByTestId(DESCRIPTION_INPUT);
    const currency = screen.getByTestId(CURRENCY_INPUT);
    const method = screen.getByTestId(METHOD_INPUT);
    const tag = screen.getByTestId(TAG_INPUT);
    const btnADD = screen.getByRole('button', { name: /Adicionar despesa/i });
    const total = screen.getByTestId(TOTAL_FIELD);

    userEvent.type(value, '100');
    userEvent.type(description, 'description');
    userEvent.type(currency, 'USD');
    userEvent.type(method, 'Dinheiro');
    userEvent.type(tag, 'Alimentação');
    userEvent.click(btnADD);

    // await waitFor(() => {
    // //   const tableBody = screen.findAllByRole('rowgroup');
    // //   console.log(tableBody);
    // //   expect(tableBody).toBeInTheDocument();

    //   //   const btnEdit = screen.findByTestId('edit-btn');
    //   //   expect(btnDel).toBeInTheDocument();
    //   //   expect(btnEdit).toBeInTheDocument();
    //   //   expect(btnEdit).toHaveClass('btn btn-primary');
    //   expect(total).not.toBe('0');
    // });
    const btnDel = await screen.findByTestId('delete-btn');
    userEvent.click(btnDel);
    // expect(tableBody).toHaveLength(0);
    // console.log(tableBody[2]);

    expect(total).toHaveTextContent('0');
  });
});
