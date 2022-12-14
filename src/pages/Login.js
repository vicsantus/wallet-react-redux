import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import LogoTrybeWallet from '../imgs/logo_Trybe_Wallet.png';
import { actUser } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      pswd: '',
    };
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(actUser(email));
    history.push('/carteira');
  };

  render() {
    const { pswd, email } = this.state;
    const magic = 6;
    const R = /^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$/;
    return (
      <form className="form-login" onSubmit={ this.handleSubmit }>
        <img
          className="logo_trybewallet"
          src={ LogoTrybeWallet }
          alt="logo_Trybe_Wallet"
        />
        <input
          type="email"
          name="email"
          placeholder="Seu email"
          onChange={ this.handleChange }
          data-testid="email-input"
        />
        <input
          type="password"
          name="pswd"
          placeholder="Digite uma senha válida"
          onChange={ this.handleChange }
          data-testid="password-input"
        />
        <button
          disabled={ pswd.length < magic || !R.test(email) }
          type="submit"
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
