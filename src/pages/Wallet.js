import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  // async componentDidMount() {
  //   const fetched = await fetch('https://economia.awesomeapi.com.br/json/all');
  //   const resulted = await fetched.json();
  //   const listcurrencies = Object.keys(resulted).map((x) => x).filter((x) => x !== 'USDT');
  //   console.log(listcurrencies);
  // }

  render() {
    const { history } = this.props;
    return (
      <>
        <section>
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
