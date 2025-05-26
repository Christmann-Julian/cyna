import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../assets/css/product-area.css';
import '../assets/css/filters.css';
import SingleProduct from '../components/SingleProduct';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import apiRequest from '../utils/apiRequest';
import { getCurrentLocale } from '../utils/language';
import { Pagination } from 'react-bootstrap';
import ReactSlider from 'react-slider';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductGrid = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const locale = getCurrentLocale();
  const [categories, setCategories] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(8);
  const [by, setBy] = useState('');
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page'), 10) || 1;
    const limit = parseInt(searchParams.get('limit'), 10) || 8;
    const by = searchParams.get('by') || '';
    const category = searchParams.get('category') || '';
    const priceMin = parseInt(searchParams.get('priceMin'), 10) || 0;
    const priceMax = parseInt(searchParams.get('priceMax'), 10) || 15000;

    const fetchProducts = async () => {
      let url = `/search?q=${searchTerm}&locale=${locale}&page=${page}&limit=${limit}`;

      if (by && by !== '') {
        url += `&by=${by}`;
      }

      if (category && category !== '') {
        url += `&category=${category}`;
      }

      if (priceMin && priceMin !== 0) {
        url += `&priceMin=${priceMin}`;
      }

      if (priceMax && priceMax !== 15000) {
        url += `&priceMax=${priceMax}`;
      }

      const { data } = await apiRequest(url, 'GET');
      setProducts(data.data);
      setTotalPages(data.totalPages);
      setCurrentPage(page);
      setLimit(limit);
      setBy(by);
    };
    fetchProducts();
  }, [locale, location.search]);

  useEffect(() => {
    fetchCategories();
  }, [locale]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const priceMin = parseInt(searchParams.get('priceMin'), 10) || 0;
    const priceMax = parseInt(searchParams.get('priceMax'), 10) || 15000;

    setPriceRange([Number(priceMin), Number(priceMax)]);
  }, []);

  const fetchCategories = async () => {
    setCategoriesLoading(true);
    const { data, error: errorCode } = await apiRequest(`/${locale}/categories/filter`, 'GET', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (errorCode) {
      setCategories(null);
    } else {
      setCategories(data);
    }
    setCategoriesLoading(false);
  };

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', pageNumber);
    searchParams.set('limit', limit);
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, '', newUrl);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleLimitChange = (event) => {
    const newLimit = parseInt(event.target.value, 10);
    setLimit(newLimit);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('limit', newLimit);
    searchParams.set('page', 1);
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, '', newUrl);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleByChange = (event) => {
    const newBy = event.target.value;
    setBy(newBy);
    const searchParams = new URLSearchParams(location.search);
    if (newBy) {
      searchParams.set('by', newBy);
    } else {
      searchParams.delete('by');
    }
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, '', newUrl);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleCategoryClick = (categoryId) => {
    const searchParams = new URLSearchParams(location.search);
    if (categoryId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categoryId);
    }
    searchParams.set('page', 1);
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, '', newUrl);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const debounceTimer = useRef(null);

  const handleSliderChange = (values) => {
    setPriceRange(values);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      const searchParams = new URLSearchParams(location.search);
      if (values[0] === 0 && values[1] === 15000) {
        searchParams.delete('priceMin');
        searchParams.delete('priceMax');
      } else if (values[0] === 0) {
        searchParams.delete('priceMin');
        searchParams.set('priceMax', values[1]);
      } else if (values[1] === 15000) {
        searchParams.set('priceMin', values[0]);
        searchParams.delete('priceMax');
      } else {
        searchParams.set('priceMin', values[0]);
        searchParams.set('priceMax', values[1]);
      }
      const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
      window.history.pushState({}, '', newUrl);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }, 300);
  };

  return (
    <>
      <Navbar />
      <section className="product-area shop-sidebar shop section">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4 col-12">
              <div className="shop-sidebar">
                <div className="single-widget category">
                  <h3 className="title">{t('product-grid.categories')}</h3>
                  <ul className="category-list">
                    {categoriesLoading ? (
                      <LoadingSpinner height={'30px'} />
                    ) : (
                      <>
                        {categories === null ? (
                          <li>{t('navbar.no-categories')}</li>
                        ) : (
                          <>
                            <li onClick={(event) => handleCategoryClick('all')}>
                              {t('product-grid.allCategories')}
                            </li>
                            {categories.map((category) => (
                              <li
                                key={category.id}
                                onClick={(event) => handleCategoryClick(category.id)}
                              >
                                {category.name}
                              </li>
                            ))}
                          </>
                        )}
                      </>
                    )}
                  </ul>
                </div>
                <div className="single-widget range">
                  <h3 className="title">{t('product-grid.sortByPrice')}</h3>
                  <div className="price-filter">
                    <div className="price-filter-inner">
                      <ReactSlider
                        className="horizontal-slider"
                        thumbClassName="example-thumb"
                        trackClassName="example-track"
                        min={0}
                        max={15000}
                        step={100}
                        value={priceRange}
                        onChange={handleSliderChange}
                        renderTrack={(props, state) => {
                          const { key, ...otherProps } = props;
                          return (
                            <div
                              key={key}
                              {...otherProps}
                              className={`example-track ${
                                state.index === 1 ? 'example-track-1' : ''
                              }`}
                            />
                          );
                        }}
                        renderThumb={(props, state) => {
                          const { key, ...otherProps } = props;
                          return (
                            <div key={key} {...otherProps}>
                              {state.valueNow}
                            </div>
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="single-widget category">
                  <h3 className="title">Caractéristiques</h3>
                  <ul className="check-box-list">
                    <li>
                      <label className="checkbox-inline" htmlFor="1">
                        <input name="news" id="1" type="checkbox" />
                        Caractéristique 1<span className="count">(3)</span>
                      </label>
                    </li>
                    <li>
                      <label className="checkbox-inline" htmlFor="2">
                        <input name="news" id="2" type="checkbox" />
                        Caractéristique 2<span className="count">(5)</span>
                      </label>
                    </li>
                    <li>
                      <label className="checkbox-inline" htmlFor="3">
                        <input name="news" id="3" type="checkbox" />
                        Caractéristique 3<span className="count">(8)</span>
                      </label>
                    </li>
                  </ul>
                </div> */}
              </div>
            </div>
            <div className="col-lg-9 col-md-8 col-12">
              <div className="row">
                <div className="col-12">
                  <div className="shop-top">
                    <div className="shop-shorter">
                      <div className="single-shorter">
                        <label>{t('product-grid.show')} :</label>
                        <select className="form-select" value={limit} onChange={handleLimitChange}>
                          <option value="8">08</option>
                          <option value="16">16</option>
                          <option value="20">20</option>
                        </select>
                      </div>
                      <div className="single-shorter">
                        <label>{t('product-grid.sortBy')} :</label>
                        <select className="form-select" value={by} onChange={handleByChange}>
                          <option value="">---</option>
                          <option value="disponibility">{t('product-grid.disponibility')}</option>
                          <option value="created_at">{t('product-grid.new')}</option>
                          <option value="price-asc">{t('product-grid.priceAsc')}</option>
                          <option value="price-desc">{t('product-grid.priceDesc')}</option>
                          <option value="promotion">{t('product-grid.promotion')}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="row">
                    {products.length === 0 ? (
                      <div className="col-12">
                        <h3>{t('product-grid.noProduct')}</h3>
                      </div>
                    ) : (
                      <>
                        {products.map((product) => (
                          <div className="col-xl-3 col-lg-3 col-md-2 col-12" key={product.id}>
                            <SingleProduct product={product} />
                          </div>
                        ))}
                        <Pagination className="justify-content-center pt-3">
                          <Pagination.First onClick={() => handlePageChange(1)} />
                          <Pagination.Prev
                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                          />
                          {[...Array(totalPages)].map((_, index) => (
                            <Pagination.Item
                              key={index + 1}
                              active={index + 1 === currentPage}
                              onClick={() => handlePageChange(index + 1)}
                            >
                              {index + 1}
                            </Pagination.Item>
                          ))}
                          <Pagination.Next
                            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                          />
                          <Pagination.Last onClick={() => handlePageChange(totalPages)} />
                        </Pagination>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductGrid;
