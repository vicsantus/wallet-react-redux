import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const newLocal = 'email-input';

const newLocal1 = 'password-input';

const INITIAL_STATE_MOCK = {
  user: {
    email: 'xxxx@xxx.com',
  },
};

const descTest = 'teste teste';

const MOCK_WALLET = {
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ],
    expenses: [
      {
        value: '50',
        currency: 'BTC',
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: descTest,
        id: 0,
        exchangeRates: {
          USD: {
            code: 'USD',
            codein: 'BRL',
            name: 'Dólar Americano/Real Brasileiro',
            high: '5.2028',
            low: '5.0893',
            varBid: '-0.0812',
            pctChange: '-1.57',
            bid: '5.0975',
            ask: '5.0982',
            timestamp: '1667326644',
            create_date: '2022-11-01 15:17:24',
          },
          USDT: {
            code: 'USD',
            codein: 'BRLT',
            name: 'Dólar Americano/Real Brasileiro Turismo',
            high: '5.22',
            low: '5.125',
            varBid: '-0.08',
            pctChange: '-1.54',
            bid: '4.97',
            ask: '5.28',
            timestamp: '1667325780',
            create_date: '2022-11-01 15:03:00',
          },
          CAD: {
            code: 'CAD',
            codein: 'BRL',
            name: 'Dólar Canadense/Real Brasileiro',
            high: '3.8416',
            low: '3.7334',
            varBid: '-0.0593',
            pctChange: '-1.56',
            bid: '3.7399',
            ask: '3.7432',
            timestamp: '1667326641',
          },
          GBP: {
            code: 'GBP',
            codein: 'BRL',
            name: 'Libra Esterlina/Real Brasileiro',
            high: '6.0093',
            low: '5.8386',
            varBid: '-0.0892',
            pctChange: '-1.5',
            bid: '5.8487',
            ask: '5.8527',
            timestamp: '1667326644',
            create_date: '2022-11-01 15:17:24',
          },
          ARS: {
            code: 'ARS',
            codein: 'BRL',
            name: 'Peso Argentino/Real Brasileiro',
            high: '0.0332',
            low: '0.0324',
            varBid: '-0.0006',
            pctChange: '-1.82',
            bid: '0.0324',
            ask: '0.0324',
            timestamp: '1667326641',
          },
          BTC: {
            code: 'BTC',
            codein: 'BRL',
            name: 'Bitcoin/Real Brasileiro',
            high: '107.855',
            low: '105.032',
            varBid: '-938',
            pctChange: '-0.89',
            bid: '105.032',
            ask: '105.062',
            timestamp: '1667326626',
            create_date: '2022-11-01 15:17:06',
          },
          LTC: {
            code: 'LTC',
            codein: 'BRL',
            name: 'Litecoin/Real Brasileiro',
            high: '291.39',
            low: '291.29',
            varBid: '-3.59',
            pctChange: '-1.22',
            bid: '291.39',
            ask: '303',
            timestamp: '1667310942',
            create_date: '2022-11-01 10:55:42',
          },
          EUR: {
            code: 'EUR',
            codein: 'BRL',
            name: 'Euro/Real Brasileiro',
            high: '5.1715',
            low: '5.0276',
            varBid: '-0.0804',
            pctChange: '-1.57',
            bid: '5.0361',
            ask: '5.0401',
            timestamp: '1667326641',
            create_date: '2022-11-01 15:17:21',
          },
          JPY: {
            code: 'JPY',
            codein: 'BRL',
            name: 'Iene Japonês/Real Brasileiro',
            high: '0.03531',
            low: '0.03435',
            varBid: '-0.0005',
            pctChange: '-1.44',
            bid: '0.03436',
            ask: '0.03438',
            timestamp: '1667326646',
            create_date: '2022-11-01 15:17:26',
          },
          CHF: {
            code: 'CHF',
            codein: 'BRL',
            name: 'Franco Suíço/Real Brasileiro',
            high: '5.2386',
            low: '5.0946',
            varBid: '-0.07',
            pctChange: '-1.35',
            bid: '5.0988',
            ask: '5.1038',
            timestamp: '1667326641',
            create_date: '2022-11-01 15:17:21',
          },
          AUD: {
            code: 'AUD',
            codein: 'BRL',
            name: 'Dólar Australiano/Real Brasileiro',
            high: '3.3539',
            low: '3.2568',
            varBid: '-0.0523',
            pctChange: '-1.58',
            bid: '3.26',
            ask: '3.2617',
            timestamp: '1667326640',
            create_date: '2022-11-01 15:17:20',
          },
          CNY: {
            code: 'CNY',
            codein: 'BRL',
            name: 'Yuan Chinês/Real Brasileiro',
            high: '0.7166',
            low: '0.6999',
            varBid: '-0.0074',
            pctChange: '-1.04',
            bid: '0.7002',
            ask: '0.7004',
            timestamp: '1667326624',
            create_date: '2022-11-01 15:17:04',
          },
          ILS: {
            code: 'ILS',
            codein: 'BRL',
            name: 'Novo Shekel Israelense/Real Brasileiro',
            high: '1.4817',
            low: '1.4403',
            varBid: '-0.0255',
            pctChange: '-1.74',
            bid: '1.4412',
            ask: '1.4415',
            timestamp: '1667326625',
            create_date: '2022-11-01 15:17:05',
          },
          ETH: {
            code: 'ETH',
            codein: 'BRL',
            name: 'Ethereum/Real Brasileiro',
            high: '8.41976',
            low: '7.99794',
            varBid: '-36.25',
            pctChange: '-0.44',
            bid: '8.11423',
            ask: '8.12577',
            timestamp: '1667326635',
            create_date: '2022-11-01 15:17:15',
          },
          XRP: {
            code: 'XRP',
            codein: 'BRL',
            name: 'XRP/Real Brasileiro',
            high: '2.44',
            low: '2.36',
            varBid: '0.02',
            pctChange: '0.68',
            bid: '2.38',
            ask: '2.38',
            timestamp: '1667326637',
            create_date: '2022-11-01 15:17:17',
          },
          DOGE: {
            code: 'DOGE',
            codein: 'BRL',
            name: 'Dogecoin/Real Brasileiro',
            high: '0.811737',
            low: '0.637894',
            varBid: '0.05098603',
            pctChange: '7.76',
            bid: '0.707741',
            ask: '0.707741',
            timestamp: '1667326607',
            create_date: '2022-11-01 15:16:47',
          },
        },
      },
    ],
    editor: false,
    idToEdit: 0,
  },
};

const beforeE = () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(mockData),
  }));
};

const newLocal2 = 'value-input';
const newLocal3 = 'description-input';
describe('Testes de cobertura do App', () => {
  beforeEach(beforeE);

  afterEach(() => {
    global.fetch.mockClear();
    jest.clearAllMocks();
  });

  it('Verifica se a rota / estão indo para a pagina correta', () => {
    renderWithRouterAndRedux(<App />);
    const inptEmaill = screen.getByTestId(newLocal);
    const inptPassWord = screen.getByTestId(newLocal1);
    expect(inptEmaill).toBeInTheDocument();
    expect(inptPassWord).toBeInTheDocument();
  });

  it('Verifica se a rota /carteira estão indo para a pagina correta', () => {
    const { history: { location: { pathname } } } = renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
      initialState: INITIAL_STATE_MOCK,
    });
    const inptEmail = screen.queryByTestId(newLocal);
    expect(inptEmail).toBeFalsy();
    const button = screen.getAllByRole('button')[0];
    const tag = screen.getByTestId('tag-input');
    expect(button).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(pathname).toMatch('/carteira');
  });

  it('Tela de login esta digitando e redirecionando corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inptEmail = screen.getByTestId(newLocal);
    const inptPassWord = screen.getByTestId(newLocal1);
    const button = screen.getAllByRole('button')[0];
    userEvent.type(inptEmail, 'xxx@xxxx.com');
    userEvent.type(inptPassWord, 'xxx@xxx.cxom');
    expect(inptEmail).toBeInTheDocument();
    expect(inptPassWord).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    const { location: { pathname } } = history;
    expect(pathname).toMatch('/carteira');
  });

  it('Os fetchs são chamados corretamente no Wallet', () => {
    const { history } = renderWithRouterAndRedux(
      <Wallet />,
      { initialState: INITIAL_STATE_MOCK },
    );
    expect(fetch).toHaveBeenCalledTimes(1);
    const inptValue = screen.getByTestId(newLocal2);
    const inptDesc = screen.getByTestId(newLocal3);
    const button = screen.getAllByRole('button')[0];
    userEvent.type(inptValue, '20');
    userEvent.type(inptDesc, 'qwert');
    userEvent.click(button);
    expect(fetch).toHaveBeenCalledTimes(2);
    act(() => {
      history.push('/');
    });
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});

describe('Testes de cobertura do WalletForm, Table e Header', () => {
  beforeEach(beforeE);

  afterEach(() => {
    global.fetch.mockClear();
    jest.clearAllMocks();
  });

  it('Testa se o table e seu elementos se encontram na pagina', () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
      initialState: INITIAL_STATE_MOCK,
    });
    const tabela = screen.getByRole('table');
    expect(tabela).toBeInTheDocument();
    const tr = screen.getByRole('row');
    expect(tr).toBeInTheDocument();
    expect(tr.children.length).toBe(9);
  });

  it('Testa se o WalletForm e seu elementos se encontram na pagina', () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
      initialState: INITIAL_STATE_MOCK,
    });
    const iptValue = screen.getByTestId(newLocal2);
    const iptMoeda = screen.getByTestId('currency-input');
    const iptMethod = screen.getByTestId('method-input');
    const iptTag = screen.getByTestId('tag-input');
    const iptDescr = screen.getByTestId(newLocal3);
    expect(iptValue).toBeInTheDocument();
    expect(iptMoeda).toBeInTheDocument();
    expect(iptMethod).toBeInTheDocument();
    expect(iptTag).toBeInTheDocument();
    expect(iptDescr).toBeInTheDocument();
  });

  it('Testa se o WalletForm adiciona elementos no table', () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
      initialState: {
        ...INITIAL_STATE_MOCK,
        ...MOCK_WALLET,
      },
    });
    const cellDescr = screen.getByRole('cell', { name: descTest });
    expect(cellDescr).toBeInTheDocument();
    const cellTag = screen.getByRole('cell', { name: 'Alimentação' });
    expect(cellTag).toBeInTheDocument();
    const cellMetodo = screen.getByRole('cell', { name: 'Dinheiro' });
    expect(cellMetodo).toBeInTheDocument();
    const cellValue = screen.getByRole('cell', { name: '50.00' });
    expect(cellValue).toBeInTheDocument();
    const cellCoin = screen.getByRole('cell', { name: 'Bitcoin/Real Brasileiro' });
    expect(cellCoin).toBeInTheDocument();
    const cellCambio = screen.getByRole('cell', { name: '105.06' });
    expect(cellCambio).toBeInTheDocument();
    const cellConversion = screen.getByRole('cell', { name: '5253.10' });
    expect(cellConversion).toBeInTheDocument();
  });

  it('Testa se o Table e WalletForm editam elementos', async () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
      initialState: {
        ...INITIAL_STATE_MOCK,
        ...MOCK_WALLET,
      },
    });
    const btnEdit = screen.getByTestId('edit-btn');
    expect(btnEdit).toBeInTheDocument();
    userEvent.click(btnEdit);
    const iptValue = screen.getByTestId(newLocal2);
    // console.log('🚀 ~ file: App.test.js ~ line 409 ~ it ~ iptValue', iptValue);
    const iptDescr = screen.getByTestId(newLocal3);
    userEvent.type(iptValue, '60');
    userEvent.type(iptDescr, 'disney');
    userEvent.click(screen.getByTestId('button-submit-walletform'));
    const cellValue = await screen.findByRole('cell', { name: '60.00' });
    const cellDescr = await screen.findByRole('cell', { name: 'disney' });
    expect(cellValue).toBeInTheDocument();
    expect(cellDescr).toBeInTheDocument();
  });

  it('Testa se o Table e WalletForm excluem elementos', () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
      initialState: {
        ...INITIAL_STATE_MOCK,
        ...MOCK_WALLET,
      },
    });
    const btnEdit = screen.getByTestId('delete-btn');
    expect(btnEdit).toBeInTheDocument();
    userEvent.click(btnEdit);
    const cellDescr = screen.queryByRole('cell', { name: descTest });
    const cellValue = screen.queryByRole('cell', { name: '50.00' });
    expect(cellValue).toBeFalsy();
    expect(cellDescr).toBeFalsy();
  });

  it('Testa se ao cliclar em editar no Table os values de Walletform mudam o valor', async () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
      initialState: {
        ...INITIAL_STATE_MOCK,
        ...MOCK_WALLET,
      },
    });
    const btnEdit = await screen.findByTestId('edit-btn');
    userEvent.click(btnEdit);
    // screen.logTestingPlaygroundURL();
    const buttonSubmit = await screen.findByTestId('button-submit-walletform');
    // console.log(buttonSubmit.innerHTML);
    expect(buttonSubmit.innerHTML).toMatch('Editar despesa');
  });
});
