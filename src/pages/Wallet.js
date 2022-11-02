import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <section className="section_header_wallet">
          <Header history={ history } />
          <WalletForm history={ history } />
        </section>
        <Table />
      </>
    );
  }
}

Wallet.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default Wallet;
