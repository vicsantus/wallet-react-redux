import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogoTrybeWallet from '../imgs/logo_Trybe_Wallet.png';
import logoMoeda from '../imgs/Vector.svg';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      update: '',
    };
  }

  componentDidMount() {
    const { history, email } = this.props;
    if (!email) history.push('/');
  }

  handleUpdate = () => {
    const { editor } = this.props;
    this.setState({
      update: editor,
    });
  };

  render() {
    const { update } = this.state;
    const { email, expenses, editor } = this.props;
    if (update !== editor) {
      this.handleUpdate();
    }
    return (
      <header className="header_wallet">
        <img
          className="logo_trybewallet"
          src={ LogoTrybeWallet }
          alt="logo_Trybe_Wallet"
        />
        <div className="class_total_despesas">
          <img src={ logoMoeda } alt="logoMoeda" />
          <p>Total de despesas:</p>
          <p data-testid="total-field">
            {expenses.length === 0 && '0.00'}
            {expenses.length > 0 && expenses.reduce((atual, pos) => {
              const { currency } = pos;
              const { [currency]: utilPos } = pos.exchangeRates;
              const { value: valuePos } = pos;
              const newValue = JSON.parse(valuePos) * utilPos.ask;
              const sum = newValue + (typeof atual === 'object'
                ? 0 : JSON.parse(atual));
              return sum;
            }, []).toFixed(2)}
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
        <p data-testid="email-field">{email}</p>
      </header>
    );
  }
}

Header.propTypes = {
  editor: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  expenses: PropTypes.shape({
    length: PropTypes.number,
    reduce: PropTypes.func,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
});

export default connect(mapStateToProps)(Header);
