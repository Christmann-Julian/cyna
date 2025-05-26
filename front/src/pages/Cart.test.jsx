import React from 'react';
import { render, screen } from '@testing-library/react';
import Cart from './Cart';

// Mocks
jest.mock('../components/Navbar', () => () => <div data-testid="navbar" />);
jest.mock('../components/Footer', () => () => <div data-testid="footer" />);
jest.mock('../components/cart/CartList', () => () => <div data-testid="cart-list" />);
jest.mock('../components/cart/TotalCart', () => () => <div data-testid="total-cart" />);

describe('Cart page', () => {
  it('affiche tous les composants du panier', () => {
    render(<Cart />);
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('cart-list')).toBeInTheDocument();
    expect(screen.getByTestId('total-cart')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});