import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';

// Mocks
jest.mock('../components/Navbar', () => () => <div data-testid="navbar" />);
jest.mock('../components/Footer', () => () => <div data-testid="footer" />);
jest.mock('../components/Alert', () => ({ message, type }) => (
  <div data-testid="alert">{message} {type}</div>
));
jest.mock('../pages/Loading', () => () => <div data-testid="loading" />);
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => ({
    search: '',
    state: {},
  }),
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));
jest.mock('../utils/authProvider', () => ({
  login: jest.fn(),
  verifyTwoFA: jest.fn(),
}));
jest.mock('../utils/language', () => ({
  getCurrentLocale: () => 'fr',
}));
jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
}));

describe('Login page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('affiche le formulaire de login', () => {
    render(<Login />);
    expect(screen.getByText('login.title')).toBeInTheDocument();
    expect(screen.getByLabelText(/login.email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/login.password/i)).toBeInTheDocument();
    expect(screen.getByText('login.btnLogin')).toBeInTheDocument();
    expect(screen.getByText('login.btnRegister')).toBeInTheDocument();
  });

  it('affiche une erreur si email est vide', async () => {
    render(<Login />);
    fireEvent.click(screen.getByText('login.btnLogin'));
    await waitFor(() => {
      expect(screen.getByText('login.errors.emailRequired')).toBeInTheDocument();
    });
  });

  it('affiche une erreur si le format email est invalide', async () => {
    render(<Login />);
    fireEvent.input(screen.getByLabelText(/login.email/i), { target: { value: 'notanemail' } });
    fireEvent.click(screen.getByText('login.btnLogin'));
    await waitFor(() => {
      expect(screen.getByText('login.errors.emailPattern')).toBeInTheDocument();
    });
  });

  it('affiche une erreur si le mot de passe est vide', async () => {
    render(<Login />);
    fireEvent.input(screen.getByLabelText(/login.email/i), { target: { value: 'test@mail.com' } });
    fireEvent.click(screen.getByText('login.btnLogin'));
    await waitFor(() => {
      expect(screen.getByText('login.errors.passwordRequired')).toBeInTheDocument();
    });
  });

  it('affiche le loader si isLoading est true', () => {
    // Pour forcer le loader, on simule le submit et on mocke la promesse
    const { container } = render(<Login />);
    fireEvent.input(screen.getByLabelText(/login.email/i), { target: { value: 'test@mail.com' } });
    fireEvent.input(screen.getByLabelText(/login.password/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByText('login.btnLogin'));
    // Le loader s'affiche pendant la promesse
    expect(container.querySelector('[data-testid="loading"]')).toBeInTheDocument();
  });

  it('affiche le champ 2FA si isTwoFA est true', async () => {
    // On simule la réponse de login avec twofa_required
    const authProvider = require('../utils/authProvider');
    authProvider.login.mockResolvedValue({ twofa_required: true, user_id: '123' });

    render(<Login />);
    fireEvent.input(screen.getByLabelText(/login.email/i), { target: { value: 'test@mail.com' } });
    fireEvent.input(screen.getByLabelText(/login.password/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByText('login.btnLogin'));

    await waitFor(() => {
      expect(screen.getByLabelText(/login.twofaCode/i)).toBeInTheDocument();
      expect(screen.getByText('login.btnVerify')).toBeInTheDocument();
    });
  });
});