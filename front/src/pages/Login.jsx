import React, { useState } from "react";
import "../assets/css/forms.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../utils/apiRequest";
import Cookies from "js-cookie";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [errorLogin, setErrorLogin] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    const fetchItems = async () => {
      const { data: user, error: errorLogin } = await apiRequest("/login_check", "POST",
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            username: formData.email,
            password: formData.password,
          },
        }
      );
      if (user) {
        const cookieOptions = formData.rememberMe ? 
          { expires: 30, sameSite: 'Strict', secure: true } :  { expires: 1 / 24, sameSite: 'Strict', secure: true };
        Cookies.set('userToken', user.token, cookieOptions);
        navigate("/account");
      }

      if (errorLogin == 401) {
        setErrorLogin(t("login.errors.invalidCredentials"));
      }else {
        setErrorLogin(t("login.errors.serverError"));
      }
    };

    fetchItems();
  };

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
                      <h2>Se connecter</h2>
                    </div>
                  </div>
                </div>
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-12">
                      {errorLogin && (
                        <div className="alert alert-danger" role="alert">
                          {errorLogin}
                        </div>
                      )}
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label>
                          Votre Email<span>*</span>
                        </label>
                        <input
                          {...register("email", {
                            required: t("login.errors.emailRequired"),
                            pattern: {
                              value:
                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/,
                              message: t("login.errors.emailPattern"),
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
                      <div className="form-group">
                        <label>
                          Votre mot de passe<span>*</span>
                        </label>
                        <input
                          type="password"
                          {...register("password", {
                            required: t("login.errors.passwordRequired"),
                          })}
                        />
                        {errors.password && (
                          <span className="text-danger">
                            {errors.password.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group login-btn">
                        <button className="btn" type="submit">
                          Se connecter
                        </button>
                        <button className="btn">
                          <Link to="/register">S'inscrire</Link>
                        </button>
                      </div>
                      <div className="checkbox">
                        <label className="checkbox-inline">
                          <input id="checkbox" type="checkbox" {...register("rememberMe")} />
                          Se souvenir de moi
                        </label>
                      </div>
                      <Link to="/forgot-password" className="lost-pass">Mot de passe oublié ?</Link>
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

export default Login;
