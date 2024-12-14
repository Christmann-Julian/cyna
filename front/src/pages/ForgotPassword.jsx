import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import apiRequest from "../utils/apiRequest";
import { getCurrentLocale } from "../utils/language";
import Alert from "../components/Alert";
import Loading from "./Loading";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [error, setError] = useState({ message: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (formData) => {
    setIsLoading(true);
    setError({ message: "", type: "" });

    const sendRequest = async () => {
      const { error: errorCode } = await apiRequest("/password-forgot", "POST", {
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          "email": formData.email,
          "locale": getCurrentLocale(),
        }
      });

      if (errorCode) {
        if (errorCode == 404) {
          setError({
            message: t("forgotPassword.success"),
            type: "success",
          });
        } else {
          setError({
            message: t("forgotPassword.errors.serverError"),
            type: "danger",
          });
        }
      } else {
        setError({
          message: t("forgotPassword.success"),
          type: "success",
        });
      }

      setIsLoading(false);
      reset();
    };

    sendRequest();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <section className="shop login section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3 col-12">
              <div className="login-form">
                <div className="row">
                  <div className="col-12">
                    <div className="section-title">
                      <h2>{t("forgotPassword.title")}</h2>
                    </div>
                  </div>
                </div>
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                  <div className="row mx-2 mx-sm-0">
                    <div className="col-12">
                      <Alert
                        message={error.message}
                        type={error.type}
                      />
                      <div className="form-group">
                        <label>
                          {t("forgotPassword.email")}
                          <span>*</span>
                        </label>
                        <input
                          {...register("email", {
                            required: t("forgotPassword.errors.emailRequired"),
                            pattern: {
                              value:
                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/,
                              message: t("forgotPassword.errors.emailPattern"),
                            },
                          })}
                        />
                        {errors.email && (
                          <span className="text-danger">
                            {errors.email.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group login-btn">
                        <button className="btn" type="submit">
                          {t("forgotPassword.btnSend")}
                        </button>
                        <button className="btn">
                          <Link to="/login">
                            {t("forgotPassword.btnLogin")}
                          </Link>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ForgotPassword;
