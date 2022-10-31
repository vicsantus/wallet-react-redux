import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeFetch } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(makeFetch());
  }

  render() {
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="value-input">
          {'Valor: '}
          <input data-testid="value-input" id="value-input" />
        </label>
        <label htmlFor="currency-input">
          {'Moeda: '}
          <select id="currency-input" select="Moeda" data-testid="currency-input">
            {
              currencies.map((crr, idx) => (
                <option key={ idx } value={ crr }>{crr}</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="method-input">
          {'Método de pagamento: '}
          <select data-testid="method-input" id="method-input">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          {'Categoria: '}
          <select data-testid="tag-input" id="tag-input">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <label htmlFor="description-input">
          {'Descrição: '}
          <input data-testid="description-input" id="description-input" />
        </label>
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
