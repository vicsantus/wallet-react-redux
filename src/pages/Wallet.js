import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
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
        <Header history={ history } />
        <WalletForm history={ history } />
      </>
    );
  }
}

Wallet.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default Wallet;
