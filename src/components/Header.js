import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  componentDidMount() {
    const { history, email } = this.props;
    if (!email) history.push('/');
  }

  render() {
    const { email, expenses } = this.props;
    return (
      <header>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">
          {expenses.length === 0 && 0}
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
      </header>
    );
  }
}

Header.propTypes = {
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
});

export default connect(mapStateToProps)(Header);
