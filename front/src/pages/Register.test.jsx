import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from './Register';

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
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));
jest.mock('../utils/apiRequest', () => jest.fn());
jest.mock('../utils/language', () => ({
  getCurrentLocale: () => 'fr',
}));

describe('Register page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('affiche le formulaire de register', () => {
    render(<Register />);
    expect(screen.getByText('register.title')).toBeInTheDocument();
    expect(screen.getByLabelText(/register.lastname/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/register.firstname/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/register.email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/register.password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/register.confirmPassword/i)).toBeInTheDocument();
    expect(screen.getByText('register.btnRegister')).toBeInTheDocument();
    expect(screen.getByText('register.btnLogin')).toBeInTheDocument();
  });

  it('affiche une erreur si un champ requis est vide', async () => {
    render(<Register />);
    fireEvent.click(screen.getByText('register.btnRegister'));
    await waitFor(() => {
      expect(screen.getByText('register.errors.lastnameRequired')).toBeInTheDocument();
      expect(screen.getByText('register.errors.firstnameRequired')).toBeInTheDocument();
      expect(screen.getByText('register.errors.emailRequired')).toBeInTheDocument();
      expect(screen.getByText('register.errors.passwordRequired')).toBeInTheDocument();
      expect(screen.getByText('register.errors.confirmPasswordRequired')).toBeInTheDocument();
    });
  });

  it('affiche une erreur si le format email est invalide', async () => {
    render(<Register />);
    fireEvent.input(screen.getByLabelText(/register.email/i), { target: { value: 'notanemail' } });
    fireEvent.click(screen.getByText('register.btnRegister'));
    await waitFor(() => {
      expect(screen.getByText('register.errors.emailPattern')).toBeInTheDocument();
    });
  });

  it('affiche une erreur si les mots de passe ne correspondent pas', async () => {
    render(<Register />);
    fireEvent.input(screen.getByLabelText(/register.password/i), { target: { value: 'Password1!' } });
    fireEvent.input(screen.getByLabelText(/register.confirmPassword/i), { target: { value: 'Different1!' } });
    fireEvent.click(screen.getByText('register.btnRegister'));
    await waitFor(() => {
      expect(screen.getByText('register.errors.passwordMustMatch')).toBeInTheDocument();
    });
  });

  it('affiche le loader si loading est true', async () => {
    const apiRequest = require('../utils/apiRequest');
    apiRequest.mockResolvedValue({ data: {}, error: null });

    render(<Register />);
    fireEvent.input(screen.getByLabelText(/register.lastname/i), { target: { value: 'Doe' } });
    fireEvent.input(screen.getByLabelText(/register.firstname/i), { target: { value: 'John' } });
    fireEvent.input(screen.getByLabelText(/register.email/i), { target: { value: 'john@doe.com' } });
    fireEvent.input(screen.getByLabelText(/register.password/i), { target: { value: 'Password1!' } });
    fireEvent.input(screen.getByLabelText(/register.confirmPassword/i), { target: { value: 'Password1!' } });
    fireEvent.click(screen.getByText('register.btnRegister'));
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
});