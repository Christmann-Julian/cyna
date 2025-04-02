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
import { useNavigate } from "react-router-dom";
import { getCurrentLocale } from "../../utils/language";
import { Modal, Button } from "react-bootstrap";
import { calculettePromotions, formatPrice } from "../../utils/utils";

const Checkout = () => {
  const { t } = useTranslation();
  const cart = useSelector((state) => state.cart);
  const [addresses, setAddresses] = useState([]);
  const [fetchAddressesLoading, setFetchAddressesLoading] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [fetchPaymentMethodLoading, setFetchPaymentMethodLoading] =
    useState(false);
  const token = useSelector((state) => state.auth.token);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const currentLocale = getCurrentLocale();
  const [show, setShow] = useState(false);

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

  const handlePayment = async () => {
    event.preventDefault();

    let isComplete = true;
    if (!selectedAddress || !selectedPaymentMethod) {
      handleShow();
      isComplete = false;
    }

    setIsLoading(true);

    if (isComplete) {
      try {
        const response = await apiRequest("/payment/stripe", "POST", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            addressId: selectedAddress.id,
            paymentMethodId: selectedPaymentMethod.id,
            products: cart.items,
            amount: cart.totalPrice * 100,
            currency: "eur",
            locale: currentLocale,
            promotionalCodes: cart.promotionalCodeItems,
          }),
        });

        if (response.error) {
          throw new Error(response.error);
        }

        navigate("/order/success");
      } catch (error) {
        console.error("error payment :", error);
        alert(t("checkout.errorPayment"));
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const subTotal = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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
                                onChange={() => setSelectedAddress(address)}
                              />
                              <label
                                htmlFor={`radioAddress${index}`}
                                className="form-check-label"
                              >
                                {t("address.name")} {index + 1} -{" "}
                                {address.address} ({address.city}/
                                {address.country})
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
                                onChange={() =>
                                  setSelectedPaymentMethod(paymentMethod)
                                }
                              />
                              <label
                                htmlFor={`radioPayment${index}`}
                                className="form-check-label"
                              >
                                {paymentMethod.brand} **** **** ****{" "}
                                {paymentMethod.last4}
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
                        {item.name}{" "}
                        {/* - {item.duration} {t("checkout.month")} */} -{" "}
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
                        {formatPrice(subTotal * 0.8)}
                      </span>
                    </li>
                    <li>
                      {t("checkout.promotion")}
                      <span>
                        {formatPrice(calculettePromotions(cart, subTotal))}
                      </span>
                    </li>
                    <li>
                      {t("checkout.tax")}(20%)
                      <span>
                        {formatPrice(subTotal * 0.2)}
                      </span>
                    </li>
                    <li className="last">
                      {t("checkout.total")}
                      <span>
                        {formatPrice(cart.totalPrice)}
                      </span>
                    </li>
                  </ul>
                  <div>
                    <button
                      className="btn"
                      onClick={handlePayment}
                      disabled={isLoading}
                    >
                      {isLoading
                        ? t("checkout.paymentInProgress")
                        : t("checkout.payment")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {t("checkout.modal.title")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{t("checkout.modal.body")}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("checkout.modal.close")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Checkout;
