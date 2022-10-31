// Coloque aqui suas actions
export const GET_EMAIL = 'GET_EMAIL';
export const GET_FETCH = 'GET_FETCH';
export const FETCH_RESOLVED = 'FETCH_RESOLVED';
export const FETCH_ERROR = 'FETCH_ERROR';

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

export const fetchError = (err) => ({
  type: FETCH_ERROR,
  err,
});

export const makeFetch = () => async (dispatch) => {
  dispatch(getFetch());
  try {
    const r = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await r.json();
    return dispatch(fetchReceive(response));
  } catch (error) {
    return dispatch(fetchError(error));
  }
};
