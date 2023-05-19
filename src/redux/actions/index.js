export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const ADD_REGISTER = 'ADD_REGISTER';
export const DELETE_REGISTER = 'DELETE_REGISTER';
export const EDIT_REGISTER = 'EDIT_REGISTER';
export const NEWEDITED_REGISTER = 'NEWEDITED_REGISTER';
export const ACTION_TESTE = 'ACTION_TESTE';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const ADD_EDITED_EXPENSES = 'ADD_EDITED_EXPENSES';

const URL_API = 'https://economia.awesomeapi.com.br/json/all';

export const searchSuccess = (data) => ({
  type: SEARCH_SUCCESS,
  data,
});

export const searchFailure = (error) => (
  { type: SEARCH_ERROR, error }
);

export const saveEmail = (value) => ({
  type: SAVE_EMAIL,
  value,
});

export const addRegister = (expensive) => ({ type: ADD_REGISTER, expensive });

export const addcurrencies = (currencies) => ({ type: ADD_CURRENCIES, currencies });

export const deleteRegister = (value) => ({ type: DELETE_REGISTER, value });

export const editRegister = (id) => ({ type: EDIT_REGISTER, id });

export const newEditedRegister = (teste) => ({ type: NEWEDITED_REGISTER, teste });

export const actionTeste = (teste123) => ({ type: ACTION_TESTE, teste123 });

// export const addCurrencies = (currencies) => ({
//   type: ADD_CURRENCIES,
//   currencies,
// });

// export const addExpenses = (expenses) => ({
//   type: ADD_EXPENSES,
//   expenses,
// });

// export const addEditedExpenses = (editExpenses) => ({
//   type: ADD_EDITED_EXPENSES,
//   editExpenses,
// });

export const fetchApi = () => async (dispatch) => {
  try {
    const response = await fetch(URL_API);
    const data = await response.json();
    dispatch(searchSuccess(data));
    dispatch(addcurrencies(data));
  } catch (error) {
    console.log(error);
  }
};

// export const fetchApiCurrencies = () => async (dispatch) => {
//   const response = await fetch(URL_API);
//   const data = await response.json();
//   dispatch(addCurrencies(data));
// };

// export const fetchApiExpenses = (expense) => async (dispatch) => {
//   const response = await fetch(URL_API);
//   const data = await response.json();
//   dispatch(addExpenses({ ...expense, exchangeRates: data }));
// };

// export const fetchApiEditdExpenses = (expense) => async (dispatch) => {
//   const response = await fetch(URL_API);
//   const data = await response.json();
//   dispatch(addEditedExpenses({ ...expense, exchangeRates: data }));
// };
