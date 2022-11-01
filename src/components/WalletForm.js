import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addExpenses, makeEditionExpense, makeFetch } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      id: 0,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(makeFetch());
  }

  refreshStatesToEdit = () => {
    const { idToEdit, expenses } = this.props;
    this.setState({
      value: expenses[idToEdit].value,
      currency: expenses[idToEdit].currency,
      method: expenses[idToEdit].method,
      tag: expenses[idToEdit].tag,
      description: expenses[idToEdit].description,
      id: idToEdit,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const fetched = await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((x) => x.json())
      .then((resp) => resp)
      .catch((err) => err);
    const { dispatch, editor, expenses } = this.props;
    if (editor) {
      dispatch(makeEditionExpense(this.state, fetched));
      const totalExpenses = expenses.length;
      this.setState({
        id: totalExpenses,
      });
      // dispatch(addExpenses(this.state, fetched));
    } else {
      this.setState((atual) => ({
        id: atual.id + 1,
      }));
      dispatch(addExpenses(this.state, fetched));
    }
    this.setState({
      value: '',
      description: '',
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { currencies, editor, idToEdit } = this.props;
    const { value, currency, description, method, tag, id } = this.state;
    if (editor && id !== idToEdit) {
      this.refreshStatesToEdit();
    }
    return (
      <form onSubmit={ this.handleSubmit } onChange={ this.handleChange }>
        <label htmlFor="value-input">
          {'Valor: '}
          <input
            name="value"
            value={ value }
            data-testid="value-input"
            id="value-input"
          />
        </label>
        <label htmlFor="currency-input">
          {'Moeda: '}
          <select
            defaultValue={ currency }
            id="currency-input"
            select="Moeda"
            name="currency"
            data-testid="currency-input"
          >
            {
              currencies.map((crr, idx) => (
                <option key={ idx } value={ crr }>{crr}</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="method-input">
          {'Método de pagamento: '}
          <select
            name="method"
            defaultValue={ method }
            data-testid="method-input"
            id="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          {'Categoria: '}
          <select
            name="tag"
            defaultValue={ tag }
            data-testid="tag-input"
            id="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <label htmlFor="description-input">
          {'Descrição: '}
          <input
            name="description"
            value={ description }
            data-testid="description-input"
            id="description-input"
          />
        </label>
        <button type="submit">{editor ? 'Editar despesa' : 'Adicionar despesa'}</button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  expenses: PropTypes.shape.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
