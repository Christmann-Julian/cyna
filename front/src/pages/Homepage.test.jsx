import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Homepage from './Homepage';
import * as apiModule from '../utils/apiRequest';
import * as langModule from '../utils/language';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock translation
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

// Mock getCurrentLocale
jest.spyOn(langModule, 'getCurrentLocale').mockReturnValue('en');

// Mock child components
jest.mock('../components/Navbar', () => () => <div data-testid="navbar" />);
jest.mock('../components/Footer', () => () => <div data-testid="footer" />);
jest.mock('../components/ProductList', () => ({ products }) => (
  <div data-testid="product-list">{products && products.length}</div>
));
jest.mock('../components/HeroSlider', () => ({ slides }) => (
  <div data-testid="hero-slider">{slides && slides.length}</div>
));
jest.mock('./Loading', () => () => <div data-testid="loading" />);
jest.mock('./ErrorPage', () => () => <div data-testid="error-page" />);
jest.mock('../components/Subscription', () => () => <div data-testid="subscription" />);

describe('Homepage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', async () => {
    jest.spyOn(apiModule, 'default').mockResolvedValueOnce({ data: null, error: null });
    render(
      <Router>
        <Homepage />
      </Router>
    );
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders error page if error is 404', async () => {
    jest.spyOn(apiModule, 'default').mockResolvedValueOnce({ data: null, error: 404 });
    render(
      <Router>
        <Homepage />
      </Router>
    );
    await waitFor(() => {
      expect(screen.getByTestId('error-page')).toBeInTheDocument();
    });
  });

  it('renders homepage with categories, description, and top products', async () => {
    const homepageData = {
      slides: [{ id: 1 }, { id: 2 }],
      description: 'Welcome to the homepage!',
      categories: [
        { id: 1, name: 'Cat1', url_image: 'img1.jpg' },
        { id: 2, name: 'Cat2', url_image: 'img2.jpg' },
        { id: 3, name: 'Cat3', url_image: 'img3.jpg' },
      ],
      topProducts: [{ id: 1 }, { id: 2 }],
    };
    jest.spyOn(apiModule, 'default').mockResolvedValueOnce({ data: homepageData, error: null });

    render(
      <Router>
        <Homepage />
      </Router>
    );

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByTestId('navbar')).toBeInTheDocument();
    });

    expect(screen.getByText('homepage.descriptionTitle')).toBeInTheDocument();
    expect(screen.getByText('homepage.categoriesTitle')).toBeInTheDocument();
    expect(screen.getByText('Cat1')).toBeInTheDocument();
    expect(screen.getByText('Cat2')).toBeInTheDocument();
    expect(screen.getByText('Cat3')).toBeInTheDocument();
    expect(screen.getByTestId('hero-slider')).toHaveTextContent('2');
    expect(screen.getByTestId('product-list')).toHaveTextContent('2');
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('subscription')).toBeInTheDocument();
  });

  it('renders placeholder and noCategories if first category is missing', async () => {
    const homepageData = {
      slides: [],
      description: 'desc',
      categories: [{ id: 1, name: null, url_image: null }],
      topProducts: [],
    };
    jest.spyOn(apiModule, 'default').mockResolvedValueOnce({ data: homepageData, error: null });

    render(
      <Router>
        <Homepage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('homepage.noCategories')).toBeInTheDocument();
    });

    const img = screen.getByAltText('category image');
    expect(img).toHaveAttribute('src', expect.stringContaining('placeholder.com'));
  });

  it('does not render HeroSlider or ProductList if data is empty', async () => {
    const homepageData = {
      slides: [],
      description: 'desc',
      categories: [{ id: 1, name: 'Cat1', url_image: 'img1.jpg' }],
      topProducts: [],
    };
    jest.spyOn(apiModule, 'default').mockResolvedValueOnce({ data: homepageData, error: null });

    render(
      <Router>
        <Homepage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Cat1')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('hero-slider')).not.toBeInTheDocument();
    expect(screen.queryByTestId('product-list')).not.toBeInTheDocument();
  });
});