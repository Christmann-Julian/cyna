import React, { useState } from 'react';
import '../../assets/css/cart.css';
import { useTranslation } from 'react-i18next';
import '../../pages/checkout/Checkout';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { applyPromotionalCode } from '../../redux/cartSlice';
import apiRequest from '../../utils/apiRequest';
import { useDispatch } from 'react-redux';
import { calculettePromotions, formatPrice } from '../../utils/utils';

const TotalCart = () => {
  const { t } = useTranslation();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [error, setError] = useState('');

  const handleShow = (event) => {
    if (cart.items.length === 0) {
      event.preventDefault();
      setShow(true);
    }
  };

  const handleClose = () => setShow(false);

  const handleApplyPromoCode = async (e) => {
    e.preventDefault();
    setError('');

    if (!promoCode || promoCode === '') {
      setError(t('cart.errors.codePromotionRequired'));
      return;
    }

    if (cart.items.length === 0) {
      setError(t('cart.errors.emptyCartPromo'));
      return;
    }

    const isAlreadyApplied = cart.promotionalCodeItems.some(
      (code) => code.name.toLowerCase() === promoCode.toLowerCase()
    );

    if (isAlreadyApplied) {
      setError(t('cart.errors.promoCodeAlreadyApplied'));
      return;
    }

    const { data, error } = await apiRequest(`/promotional-code/${promoCode}`);
    if (error) {
      setError(t('cart.errors.invalidPromoCode'));
      return;
    }

    const discount = data.isPercent ? (cart.totalPrice * data.promotion) / 100 : data.promotion;

    if (cart.totalPrice - discount < 0) {
      setError(t('cart.errors.codePromotionNotApplicable'));
      return;
    }

    dispatch(applyPromotionalCode(data));
    setPromoCode('');
  };

  const subTotal = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="row">
      <div className="col-12">
        <div className="total-amount">
          <div className="row">
            <div className="col-lg-8 col-md-5 col-12">
              <div className="left">
                <div className="coupon">
                  <form onSubmit={handleApplyPromoCode}>
                    <input
                      name="Coupon"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder={t('cart.codePromotion')}
                      className="me-2"
                    />
                    <button type="submit" className="btn">
                      {t('cart.apply')}
                    </button>
                  </form>
                  {error && <p className="text-danger mt-2">{error}</p>}
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-7 col-12">
              <div className="right">
                <ul>
                  <li>
                    {t('cart.subTotal')}
                    <span>{formatPrice(subTotal * 0.8)}</span>
                  </li>
                  <li>
                    {t('cart.promotion')}
                    <span>{formatPrice(calculettePromotions(cart, subTotal))}</span>
                  </li>
                  <li>
                    {t('cart.tax')} (20%)
                    <span>{formatPrice(subTotal * 0.2)}</span>
                  </li>
                  <li className="last">
                    {t('cart.totalCart')}
                    <span>{formatPrice(cart.totalPrice)}</span>
                  </li>
                </ul>
                <div>
                  <Link
                    to={cart.items.length === 0 ? '#' : '/order/checkout'}
                    className="btn"
                    onClick={handleShow}
                  >
                    {t('cart.order')}
                  </Link>
                  <Link to="/" className="btn">
                    {t('cart.continueShopping')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{t('cart.modal.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t('cart.modal.body')}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('cart.modal.close')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TotalCart;
