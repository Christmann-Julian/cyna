import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../assets/css/product.css';
import '../assets/css/product-area.css';
import ErrorPage from './ErrorPage';
import SingleProduct from '../components/SingleProduct';
import { useTranslation } from 'react-i18next';
import apiRequest from '../utils/apiRequest';
import Loading from './Loading';
import { useParams, useNavigate } from 'react-router-dom';
import { getCurrentLocale } from '../utils/language';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { Modal, Button, Carousel } from 'react-bootstrap';
import { formatPrice } from '../utils/utils';

const Product = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const currentLocale = getCurrentLocale();
  const [product, setProduct] = useState(null);
  const [productCart, setProductCart] = useState(null);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const handleAddToCart = (productCart) => {
    if (productCart == null) {
      setShow(true);
    } else {
      dispatch(addToCart(productCart));
      navigate('/cart');
    }
  };

  useEffect(() => {
    setProduct(null);
    const fetchItems = async () => {
      const { data: product, error: errorCode } = await apiRequest(
        `/product/${currentLocale}/${id}`,
        'GET',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setProduct(product);

      if (!product) {
        setError(errorCode);
      } else if (product.disponibility) {
        setProductCart({
          id: product.id,
          name: product.name,
          price:
            product.promotionActive && product.promotionPrice != null
              ? product.promotionPrice
              : product.price,
          quantity: 1,
          duration: 1,
          total:
            product.promotionActive && product.promotionPrice != null
              ? product.promotionPrice
              : product.price,
        });
      }
    };

    fetchItems();
  }, [id, currentLocale]);

  if (error === 404) {
    return <ErrorPage />;
  }

  if (!product && error !== 404) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <section className="shop single section">
        <div className="container">
          <div className="row">
            {product.slides.length > 0 ? (
              <div className="col-lg-6 col-12">
                <div className="product-gallery">
                  <Carousel>
                    {product.slides.map((img, index) => (
                      <Carousel.Item key={index}>
                        <img className="d-block w-100" src={img.url_image} alt={img.alt} />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </div>
              </div>
            ) : (
              <div className="col-lg-6 col-12">
                <div className="product-gallery">
                  <div className="flexslider-thumbnails">
                    <ul className="slides">
                      <li>
                        <img
                          src={product.url_image ?? 'https://via.placeholder.com/850x530'}
                          alt="Service Image"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            <div className="col-lg-6 col-12">
              <div className="product-des">
                <div className="short">
                  <h2>{product.name}</h2>
                  {!product.disponibility && (
                    <span className="badge text-bg-danger mt-2">{t('product.noStock')}</span>
                  )}
                  <p className="price">
                    {product.promotionActive && product.promotionPrice != null ? (
                      <>
                        <span className="discount">
                          {product.promotionPrice.toString().replace('.', ',')}€
                        </span>
                        <s>{formatPrice(product.price)}</s>
                      </>
                    ) : (
                      <span className="discount">{formatPrice(product.price)}</span>
                    )}
                  </p>
                  <p className="description">{product.description}</p>
                </div>
                <div className="product-buy">
                  <div className="add-to-cart">
                    <button className="btn" onClick={() => handleAddToCart(productCart)}>
                      {t('product.buyNow')}
                    </button>
                  </div>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: product.caracteristic,
                    }}
                  ></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="product-area section mb-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title">
                <h2>{t('product.similaryServices')}</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {product.similarProduct.map((prod) => (
              <div className="col-xl-4 col-lg-4 col-md-4 col-12" key={prod.id}>
                <SingleProduct product={prod} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{t('product.modal.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t('product.modal.body')}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            {t('product.modal.close')}
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer />
    </>
  );
};

export default Product;
