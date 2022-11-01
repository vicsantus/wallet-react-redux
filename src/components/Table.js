import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpense, editExpense } from '../redux/actions';
import EditPath from './Imgs/Edit-Icon.svg';
import GarbPath from './Imgs/Garb-Icon.svg';

class Table extends Component {
  handleDelete = ({ target }) => {
    const { value } = target;
    const { dispatch } = this.props;
    dispatch(deleteExpense(JSON.parse(value)));
  };

  handleEdit = ({ target }) => {
    const { value: id } = target;
    const { dispatch } = this.props;
    dispatch(editExpense(JSON.parse(id)));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th scope="col">Descrição</th>
            <th scope="col">Tag</th>
            <th scope="col">Método de pagamento</th>
            <th scope="col">Valor</th>
            <th scope="col">Moeda</th>
            <th scope="col">Câmbio utilizado</th>
            <th scope="col">Valor convertido</th>
            <th scope="col">Moeda de conversão</th>
            <th scope="col">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses && expenses.map((ele) => {
            const { currency } = ele;
            const { [currency]: atualCurr } = ele.exchangeRates;
            return (
              <tr key={ ele.id }>
                <td>{ele.description}</td>
                <td>{ele.tag}</td>
                <td>{ele.method}</td>
                <td>{(JSON.parse(ele.value)).toFixed(2)}</td>
                <td>{atualCurr.name}</td>
                <td>{(JSON.parse(atualCurr.ask)).toFixed(2)}</td>
                <td>{(JSON.parse(atualCurr.ask) * JSON.parse(ele.value)).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    value={ ele.id }
                    onClick={ this.handleEdit }
                    data-testid="edit-btn"
                    type="button"
                  >
                    <img
                      style={ { pointerEvents: 'none' } }
                      src={ EditPath }
                      alt="Garb Icon"
                    />
                  </button>
                  <button
                    value={ ele.id }
                    onClick={ this.handleDelete }
                    data-testid="delete-btn"
                    type="button"
                  >
                    <img
                      style={ { pointerEvents: 'none' } }
                      src={ GarbPath }
                      alt="Garb Icon"
                    />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
