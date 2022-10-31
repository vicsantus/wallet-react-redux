import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <Header history={ history } />
        <div>TrybeWallet</div>
      </>
    );
  }
}

Wallet.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default Wallet;
