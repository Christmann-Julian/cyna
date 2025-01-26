import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../assets/css/checkout.css";
import { useTranslation } from "react-i18next";
import ListAddresss from "../../components/ListAddress";
import CheckoutPayment from "../../components/checkout/CheckoutPayment";

const Checkout = () => {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <div className="checkout section">
        <div className="container">
          <h2 className="section-title">{t("checkout.title")}</h2>
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="billing-details">
                <h3>{t("checkout.addressTitle")}</h3>
                <ListAddresss />
              </div>
              <CheckoutPayment />
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="order-summary">
                <form className="mb-3">
                  <h3>{t("checkout.summaryAddress")}</h3>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="radioAddress"
                    />
                    <label className="form-check-label">Address 1</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="radioAddress"
                    />
                    <label className="form-check-label">Address 2</label>
                  </div>
                  <h3 className="mt-3">{t("checkout.summaryPayment")}</h3>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="radioPayment"
                    />
                    <label className="form-check-label">Payment 1</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="radioPayment"
                    />
                    <label className="form-check-label">Payment 2</label>
                  </div>
                  <h3 className="mt-3">{t("checkout.summary")}</h3>
                  <ul>
                    <li>
                      Produit 1 - 1 {t("checkout.month")} -{" "}
                      {t("checkout.quantity")} : 2<span>150,00€</span>
                    </li>
                    <li>
                      Produit 2 - 3 {t("checkout.month")} -{" "}
                      {t("checkout.quantity")} : 1<span>150,00€</span>
                    </li>
                    <li>
                      Produit 3 - 6 {t("checkout.month")} -{" "}
                      {t("checkout.quantity")} : 1<span>150,00€</span>
                    </li>
                    <li className="last"></li>
                  </ul>
                  <ul>
                    <li>
                      {t("checkout.subTotal")}
                      <span>450,00€</span>
                    </li>
                    <li>
                      {t("checkout.promotion")}
                      <span>450,00€</span>
                    </li>
                    <li>
                      {t("checkout.tax")}(20%)<span>90,00€</span>
                    </li>
                    <li className="last">
                      {t("checkout.total")}
                      <span>540,00€</span>
                    </li>
                  </ul>
                  <div>
                    <a href="" className="btn">
                      {t("checkout.payment")}
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
