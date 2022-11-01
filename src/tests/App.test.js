import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const newLocal = 'email-input';

describe('Testes de cobertura do App', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));
  });

  afterEach(() => {
    global.fetch.mockClear();
    jest.clearAllMocks();
  });

  it('Verifica se a rota / estão indo para a pagina correta', () => {
    renderWithRouterAndRedux(<App />);
    const inptEmaill = screen.getByTestId(newLocal);
    const inptPassWord = screen.getByTestId('password-input');
    expect(inptEmaill).toBeInTheDocument();
    expect(inptPassWord).toBeInTheDocument();
  });

  it('Verifica se a rota /carteira estão indo para a pagina correta', () => {
    const INITIAL_STATE_MOCK = {
      user: {
        email: 'xxxx@xxx.com',
      },
    };
    const { history: { location: { pathname } } } = renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
      initialState: INITIAL_STATE_MOCK,
    });
    console.log(pathname);
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
    const inptPassWord = screen.getByTestId('password-input');
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
    const INITIAL_STATE_MOCK = {
      user: {
        email: 'xxx@xxx.coxm',
      },
    };
    const { history } = renderWithRouterAndRedux(
      <Wallet />,
      { initialState: INITIAL_STATE_MOCK },
    );
    expect(fetch).toHaveBeenCalledTimes(1);
    const inptValue = screen.getByTestId('value-input');
    const inptDesc = screen.getByTestId('description-input');
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
