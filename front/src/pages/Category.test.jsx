import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Category from './Category';

// Mocks
jest.mock('../components/Navbar', () => () => <div data-testid="navbar" />);
jest.mock('../components/Footer', () => () => <div data-testid="footer" />);
jest.mock('../components/SingleProduct', () => ({ product }) => (
  <div data-testid="single-product">{product.name}</div>
));
jest.mock('./ErrorPage', () => () => <div data-testid="error-page" />);
jest.mock('./Loading', () => () => <div data-testid="loading" />);
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }),
}));
jest.mock('../utils/language', () => ({
  getCurrentLocale: () => 'fr',
}));
jest.mock('../utils/apiRequest');

const mockCategory = {
  url_image: 'image.jpg',
  name: 'Catégorie Test',
  description: 'Description de la catégorie',
  products: [
    { id: 1, name: 'Produit 1' },
    { id: 2, name: 'Produit 2' },
  ],
};

describe('Category page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('affiche le loader si category est null', async () => {
    const apiRequest = require('../utils/apiRequest');
    apiRequest.default.mockResolvedValue({ data: null, error: null });
    render(<Category />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('affiche la page d\'erreur si erreur 404', async () => {
    const apiRequest = require('../utils/apiRequest');
    apiRequest.default.mockResolvedValue({ data: null, error: 404 });
    render(<Category />);
    await waitFor(() => {
      expect(screen.getByTestId('error-page')).toBeInTheDocument();
    });
  });

  it('affiche la catégorie et ses produits', async () => {
    const apiRequest = require('../utils/apiRequest');
    apiRequest.default.mockResolvedValue({ data: mockCategory, error: null });
    render(<Category />);
    await waitFor(() => {
      expect(screen.getByTestId('navbar')).toBeInTheDocument();
      expect(screen.getByText('Catégorie Test')).toBeInTheDocument();
      expect(screen.getByText('Description de la catégorie')).toBeInTheDocument();
      expect(screen.getAllByTestId('single-product')).toHaveLength(2);
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });
  });
});