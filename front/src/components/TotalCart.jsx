import React, { useState } from "react";
import "../assets/css/cart.css";
import { useTranslation } from "react-i18next";
import "../pages/Checkout";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const TotalCart = () => {
  const { t } = useTranslation();
  const cart = useSelector((state) => state.cart);
  const [show, setShow] = useState(false);

  const handleShow = (event) => {
    if (cart.items.length === 0) {
      event.preventDefault();
      setShow(true);
    }
  };

  const handleClose = () => setShow(false);

  return (
    <div className="row">
      <div className="col-12">
        <div className="total-amount">
          <div className="row">
            <div className="col-lg-8 col-md-5 col-12">
              <div className="left">
                <div className="coupon">
                  <form action="#" target="_blank">
                    <input
                      name="Coupon"
                      placeholder={t("cart.codePromotion")}
                      className="me-2"
                    />
                    <button className="btn">{t("cart.apply")}</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-7 col-12">
              <div className="right">
                <ul>
                  <li>
                    {t("cart.subTotal")}
                    <span>
                      {(cart.totalPrice * 0.8)
                        .toFixed(2)
                        .toString()
                        .replace(".", ",")}
                      €
                    </span>
                  </li>
                  <li>
                    {t("cart.promotion")}
                    <span>0,00€</span>
                  </li>
                  <li>
                    {t("cart.tax")} (20%)
                    <span>
                      {(cart.totalPrice * 0.2)
                        .toFixed(2)
                        .toString()
                        .replace(".", ",")}
                      €
                    </span>
                  </li>
                  <li className="last">
                    {t("cart.totalCart")}
                    <span>
                      {cart.totalPrice.toFixed(2).toString().replace(".", ",")}€
                    </span>
                  </li>
                </ul>
                <div>
                  <Link
                    to={cart.items.length === 0 ? "#" : "/order/checkout"}
                    className="btn"
                    onClick={handleShow}
                  >
                    {t("cart.order")}
                  </Link>
                  <Link to="/" className="btn">
                    {t("cart.continueShopping")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
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
