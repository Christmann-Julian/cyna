import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../assets/css/success.css';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';

const OrderSuccess = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <section className="page-success section page">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="page-inner">
                <h2>{t('success.title')}</h2>
                <p>
                  {t('success.message')}
                  <br />
                  {t('success.message2')}
                </p>
                <div className="button">
                  <Link className="btn" to="/">
                    {t('success.goToHome')}
                  </Link>
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

export default OrderSuccess;
