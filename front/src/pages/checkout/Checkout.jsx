import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../assets/css/checkout.css";
import { useTranslation } from "react-i18next";
import ListAddresss from "../../components/ListAddress";
import ListPaymentMethod from "../../components/ListPaymentMethod";
import { useSelector } from "react-redux";
import apiRequest from "../../utils/apiRequest";
import LoadingSpinner from "../../components/LoadingSpinner";

const Checkout = () => {
  const { t } = useTranslation();
  const cart = useSelector((state) => state.cart);
  const [addresses, setAddresses] = useState([]);
  const [fetchAddressesLoading, setFetchAddressesLoading] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [fetchPaymentMethodLoading, setFetchPaymentMethodLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    setFetchAddressesLoading(true);

    const fetchAddresses = async () => {
      try {
        const { data, error } = await apiRequest("/user/addresses", "GET", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (data !== null) {
          setAddresses(data);
          setFetchAddressesLoading(false);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
        setFetchAddressesLoading(false);
      }
    };

    fetchAddresses();

    setFetchPaymentMethodLoading(true);

    const fetchPaymentMethod = async () => {
      try {
        const { data, error } = await apiRequest(
          `/user/payment_methods`,
          "GET",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (data !== null) {
          setPaymentMethods(data);
          setFetchPaymentMethodLoading(false);
        }
      } catch (error) {
        console.error("Error fetching :", error);
        setFetchPaymentMethodLoading(false);
      }
    };

    fetchPaymentMethod();
  }, []);

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
              <div className="billing-details">
                <h3>{t("checkout.paymentMethodTitle")}</h3>
                <ListPaymentMethod />
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="order-summary">
                <form className="mb-3">
                  <h3>{t("checkout.summaryAddress")}</h3>
                  {fetchAddressesLoading ? (
                    <LoadingSpinner height={"100px"} />
                  ) : (
                    <>
                      {addresses.length === 0 ? (
                        <div className="d-flex justify-content-center">
                          {t("address.noAddress")}
                        </div>
                      ) : (
                        <>
                          {addresses.map((address, index) => (
                            <div className="form-check" key={index}>
                              <input
                                className="form-check-input"
                                type="radio"
                                name="radioAddress"
                                id={`radioAddress${index}`}
                              />
                              <label htmlFor={`radioAddress${index}`} className="form-check-label">
                                {t("address.name")} {index + 1} - {address.address} ({address.city}/{address.country})
                              </label>
                            </div>
                          ))}
                        </>
                      )}
                    </>
                  )}
                  <h3 className="mt-3">{t("checkout.summaryPayment")}</h3>
                  {fetchPaymentMethodLoading ? (
                    <LoadingSpinner height={"100px"} />
                  ) : (
                    <>
                      {paymentMethods.length === 0 ? (
                        <div className="d-flex justify-content-center">
                          {t("paymentMethod.noPaymentMethod")}
                        </div>
                      ) : (
                        <>
                          {paymentMethods.map((paymentMethod, index) => (
                            <div className="form-check" key={index}>
                              <input
                                className="form-check-input"
                                type="radio"
                                name="radioPayment"
                                id={`radioPayment${index}`}
                              />
                              <label htmlFor={`radioPayment${index}`} className="form-check-label">
                                {paymentMethod.brand} **** **** **** {paymentMethod.last4}
                              </label>
                            </div>
                          ))}
                        </>
                      )}
                    </>
                  )}
                  <h3 className="mt-3">{t("checkout.summary")}</h3>
                  <ul>
                    {cart.items.map((item, index) => (
                      <li key={index}>
                        {item.name} - {item.duration} {t("checkout.month")} -{" "}
                        {t("checkout.quantity")} : {item.quantity}
                        <span>{item.total}€</span>
                      </li>
                    ))}
                    <li className="last"></li>
                  </ul>
                  <ul>
                    <li>
                      {t("checkout.subTotal")}
                      <span>
                        {(cart.totalPrice * 0.8)
                          .toFixed(2)
                          .toString()
                          .replace(".", ",")}
                        €
                      </span>
                    </li>
                    <li>
                      {t("checkout.promotion")}
                      <span>0,00€</span>
                    </li>
                    <li>
                      {t("checkout.tax")}(20%)
                      <span>
                        {(cart.totalPrice * 0.2)
                          .toFixed(2)
                          .toString()
                          .replace(".", ",")}
                        €
                      </span>
                    </li>
                    <li className="last">
                      {t("checkout.total")}
                      <span>
                        {cart.totalPrice
                          .toFixed(2)
                          .toString()
                          .replace(".", ",")}
                        €
                      </span>
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
