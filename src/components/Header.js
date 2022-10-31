import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  componentDidMount() {
    const { history, email } = this.props;
    if (!email) history.push('/');
  }

  render() {
    const { email, idToEdit } = this.props;
    return (
      <header>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">{idToEdit}</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  idToEdit: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps)(Header);
