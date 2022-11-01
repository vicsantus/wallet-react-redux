// Coloque aqui suas actions
export const GET_EMAIL = 'GET_EMAIL';
export const GET_FETCH = 'GET_FETCH';
export const FETCH_RESOLVED = 'FETCH_RESOLVED';
export const FETCH_ERROR = 'FETCH_ERROR';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const MAKE_EDITION_EXPS = 'MAKE_EDITION_EXPS';

export const actUser = (email) => ({
  type: GET_EMAIL,
  email,
});

export const getFetch = () => ({
  type: GET_FETCH,
});

export const fetchReceive = (data) => ({
  type: FETCH_RESOLVED,
  data,
});

export const makeFetch = () => async (dispatch) => {
  dispatch(getFetch());
  try {
    const r = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await r.json();
    return dispatch(fetchReceive(response));
  } catch (error) {
    return console.log(error);
  }
};

export const addExpenses = (data, fetched) => ({
  type: ADD_EXPENSES,
  data,
  fetched,
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  id,
});

export const editExpense = (id) => ({
  type: EDIT_EXPENSE,
  id,
});

export const makeEditionExpense = (data, fetched) => ({
  type: MAKE_EDITION_EXPS,
  data,
  fetched,
});
