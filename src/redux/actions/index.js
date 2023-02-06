export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const ADD_REGISTER = 'ADD_REGISTER';
export const DELETE_REGISTER = 'DELETE_REGISTER';
export const EDIT_REGISTER = 'EDIT_REGISTER';
export const NEWEDITED_REGISTER = 'NEWEDITED_REGISTER';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';

// {
//     user: {
//       email: '', // string que armazena o email da pessoa usuária
//     },
//     wallet: {
//       currencies: [], // array de string
//       expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
//       editor: false, // valor booleano que indica de uma despesa está sendo editada
//       idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
//     }

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

export const fetchApi = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(searchSuccess(data));
    dispatch(addcurrencies(data));
  } catch (error) {
    console.log(error);
  }
};
