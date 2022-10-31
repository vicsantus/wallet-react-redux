import { FETCH_ERROR, FETCH_RESOLVED, GET_FETCH } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_FETCH:
    return ({
      ...state,
    });
  case FETCH_RESOLVED:
    return ({
      ...state,
      currencies: Object.keys(action.data).map((x) => x).filter((x) => x !== 'USDT'),
    });
  case FETCH_ERROR:
    return ({
      ...state,
      currencies: [...action.err],
    });
  default:
    return state;
  }
};

export default wallet;
