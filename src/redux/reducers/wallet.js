import {
  ADD_EXPENSES,
  DELETE_EXPENSE, EDIT_EXPENSE, FETCH_RESOLVED, GET_FETCH, MAKE_EDITION_EXPS,
} from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  const oldExpenses = state.expenses;
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
  case ADD_EXPENSES:
    return ({
      ...state,
      expenses: [
        ...state.expenses,
        { ...action.data, exchangeRates: action.fetched },
      ],
    });
  case EDIT_EXPENSE:
    return ({
      ...state,
      idToEdit: action.id,
      editor: true,
    });
  case DELETE_EXPENSE:
    return ({
      ...state,
      expenses: [...state.expenses.filter((ele) => ele.id !== action.id)],
    });
  case MAKE_EDITION_EXPS:
    oldExpenses.splice(action.data.id, 1, { ...action.data, exchangeRates: action.fetched,
    });
    return ({
      ...state,
      expenses: oldExpenses,
      editor: false,
      idToEdit: 0,
    });
  default:
    return state;
  }
};

export default wallet;
