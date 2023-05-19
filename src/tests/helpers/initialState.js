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

export const currencies = ['USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC', 'EUR', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE'];

export const INITIAL_STATE = {
  user: {
    email: EMAIL_DEFAULT,
  },
  wallet: {
    currencies: [],
    expenses: {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    },
    editor: false,
    idToEdit: 0,
  },
};
