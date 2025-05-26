import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Product from './Product';

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
  useNavigate: () => jest.fn(),
}));
jest.mock('../utils/language', () => ({
  getCurrentLocale: () => 'fr',
}));
jest.mock('../utils/apiRequest');
jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
}));
jest.mock('../redux/cartSlice', () => ({
  addToCart: (product) => ({ type: 'ADD_TO_CART', payload: product }),
}));
jest.mock('react-bootstrap', () => {
  const Modal = ({ show, onHide, children }) =>
    show ? (
      <div data-testid="modal">
        <button data-testid="close-modal" onClick={onHide}>close</button>
        {children}
      </div>
    ) : null;
  const Button = (props) => <button {...props} />;
  const Carousel = ({ children }) => <div data-testid="carousel">{children}</div>;
  Carousel.Item = ({ children }) => <div>{children}</div>;
  return { Modal, Button, Carousel };
});
jest.mock('../utils/utils', () => ({
  formatPrice: (price) => `${price}€`,
}));

const mockProduct = {
  id: 1,
  name: 'Produit Test',
  price: 100,
  promotionActive: false,
  promotionPrice: null,
  disponibility: true,
  description: 'Description du produit',
  caracteristic: '<b>Caractéristiques</b>',
  url_image: 'image.jpg',
  slides: [],
  similarProduct: [
    { id: 2, name: 'Produit Similaire 1' },
    { id: 3, name: 'Produit Similaire 2' },
  ],
};

describe('Product page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('affiche le loader si product est null', async () => {
    const apiRequest = require('../utils/apiRequest');
    apiRequest.default.mockResolvedValue({ data: null, error: null });
    render(<Product />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('affiche la page d\'erreur si erreur 404', async () => {
    const apiRequest = require('../utils/apiRequest');
    apiRequest.default.mockResolvedValue({ data: null, error: 404 });
    render(<Product />);
    await waitFor(() => {
      expect(screen.getByTestId('error-page')).toBeInTheDocument();
    });
  });

  it('affiche le produit et les produits similaires', async () => {
    const apiRequest = require('../utils/apiRequest');
    apiRequest.default.mockResolvedValue({ data: mockProduct, error: null });
    render(<Product />);
    await waitFor(() => {
      expect(screen.getByText('Produit Test')).toBeInTheDocument();
      expect(screen.getByText('Description du produit')).toBeInTheDocument();
      expect(screen.getAllByTestId('single-product')).toHaveLength(2);
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });
  });

  it('affiche le carousel si slides sont présents', async () => {
    const apiRequest = require('../utils/apiRequest');
    apiRequest.default.mockResolvedValue({
      data: { ...mockProduct, slides: [{ url_image: 'img1.jpg', alt: 'alt1' }] },
      error: null,
    });
    render(<Product />);
    await waitFor(() => {
      expect(screen.getByTestId('carousel')).toBeInTheDocument();
    });
  });

  it('affiche le modal si on clique sur acheter sans produitCart', async () => {
    const apiRequest = require('../utils/apiRequest');
    apiRequest.default.mockResolvedValue({
      data: { ...mockProduct, disponibility: false },
      error: null,
    });
    render(<Product />);
    await waitFor(() => {
      fireEvent.click(screen.getByText('product.buyNow'));
      expect(screen.getByTestId('modal')).toBeInTheDocument();
    });
  });
});