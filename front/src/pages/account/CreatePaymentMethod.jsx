import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import apiRequest from "../../utils/apiRequest";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";
import Alert from "../../components/Alert";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import "../../assets/css/payment-method.css";

const CreatePaymentMethod = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [alertCreate, setAlertCreate] = useState({ message: "", type: "" });
  const [createLoading, setCreateLoading] = useState(false);

  const backToPreviousPage = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    setCreateLoading(true);
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (!error) {
      const token = localStorage.getItem("token");

      let userId;
      if (token) {
        const decodedToken = jwtDecode(token);
        userId = decodedToken.id;
      }

      const { error: errorPM } = await apiRequest(
        `/add_payment_method`,
        "POST",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: {
            userId,
            paymentMethodId: paymentMethod.id,
          },
        }
      );

      if (errorPM) {
        setAlertCreate({
          message: t("paymentMethod.errors.serverError"),
          type: "danger",
        });
        setCreateLoading(false);
      } else {
        setAlertCreate({
          message: t("paymentMethod.createSuccess"),
          type: "success",
        });
        setCreateLoading(false);
      }
    } else {
      setAlertCreate({
        message: error.message,
        type: "danger",
      });
      setCreateLoading(false);
    }
  };

  return (
    <>
      {createLoading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <div className="container payment-method" >
            <div className="row justify-content-center align-items-center pm-height">
              <div className="col-md-6">
                <form onSubmit={handleSubmit} className="card p-4">
                  <Alert
                    message={alertCreate.message}
                    type={alertCreate.type}
                  />
                  <div className="form-group">
                    <CardElement className="form-control" />
                  </div>
                  <button className="btn mt-3 mb-2" type="submit">
                    {t("paymentMethod.addCard")}
                  </button>
                  <a href="#" onClick={backToPreviousPage}>{t('paymentMethod.backToPreviousPage')}</a>
                </form>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default CreatePaymentMethod;
