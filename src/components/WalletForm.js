import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addExpenses, makeFetch } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(makeFetch());
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const fetched = await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((x) => x.json())
      .then((resp) => resp)
      .catch((err) => err);
    const { dispatch } = this.props;
    dispatch(addExpenses(this.state, fetched));
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
    const { currencies } = this.props;
    const { value, currency, description, method, tag } = this.state;
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
        <button type="submit">Adicionar despesa</button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
