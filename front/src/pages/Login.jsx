import React, { useState, useEffect } from 'react';
import '../assets/css/forms.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import authProvider from '../utils/authProvider';
import Alert from '../components/Alert';
import Loading from '../pages/Loading';
import { getCurrentLocale } from '../utils/language';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/authSlice';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [errorLogin, setErrorLogin] = useState({ message: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isTwoFA, setIsTwoFA] = useState(false);
  const [userId, setUserId] = useState('');
  const dispatch = useDispatch();

  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const message = queryParams.get('message');
    if (message) {
      setErrorLogin({ message: t(message), type: 'success' });
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    setIsLoading(true);
    setErrorLogin({ message: '', type: '' });

    const tryLogin = async () => {
      try {
        if (isTwoFA) {
          const response = await authProvider.verifyTwoFA({
            userId,
            code: formData.twofaCode,
            rememberMe: formData.rememberMe,
          });
          dispatch(setToken(response.token));
          const from = location.state?.from?.pathname || '/account';
          navigate(from);
        } else {
          const response = await authProvider.login({
            username: formData.email,
            password: formData.password,
            rememberMe: formData.rememberMe,
            locale: getCurrentLocale(),
          });
          if (response.twofa_required) {
            setIsTwoFA(true);
            setUserId(response.user_id);
          } else {
            dispatch(setToken(response.token));
            const from = location.state?.from?.pathname || '/account';
            navigate(from);
          }
        }
      } catch (error) {
        if (error.status == 401) {
          const errorMessage = JSON.parse(error.message).message;
          if (errorMessage == 'Email is not verified.') {
            setErrorLogin({
              message: t('login.errors.emailNotVerified'),
              type: 'danger',
            });
          } else if (errorMessage == 'Invalid or expired OTP') {
            setErrorLogin({
              message: t('login.errors.invalid2facode'),
              type: 'danger',
            });
          } else {
            setErrorLogin({
              message: t('login.errors.invalidCredentials'),
              type: 'danger',
            });
          }
        } else {
          setErrorLogin({
            message: t('login.errors.serverError'),
            type: 'danger',
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    tryLogin();
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
                      <h2>{t('login.title')}</h2>
                    </div>
                  </div>
                </div>
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                  <div className="row mx-2 mx-sm-0">
                    <Alert message={errorLogin.message} type={errorLogin.type} />
                    {!isTwoFA && (
                      <>
                        <div className="col-12">
                          <div className="form-group">
                            <label>
                              {t('login.email')}
                              <span>*</span>
                            </label>
                            <input
                              {...register('email', {
                                required: t('login.errors.emailRequired'),
                                pattern: {
                                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/,
                                  message: t('login.errors.emailPattern'),
                                },
                              })}
                            />
                            {errors.email && (
                              <span className="text-danger">{errors.email.message}</span>
                            )}
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <label>
                              {t('login.password')}
                              <span>*</span>
                            </label>
                            <input
                              type="password"
                              {...register('password', {
                                required: t('login.errors.passwordRequired'),
                              })}
                            />
                            {errors.password && (
                              <span className="text-danger">{errors.password.message}</span>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                    {isTwoFA && (
                      <div className="col-12">
                        <div className="form-group">
                          <label>
                            {t('login.twofaCode')}
                            <span>*</span>
                          </label>
                          <input
                            type="text"
                            {...register('twofaCode', {
                              required: t('login.errors.twofaCodeRequired'),
                            })}
                          />
                          {errors.twofaCode && (
                            <span className="text-danger">{errors.twofaCode.message}</span>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="col-12">
                      <div className="form-group login-btn">
                        <button className="btn" type="submit">
                          {isTwoFA ? t('login.btnVerify') : t('login.btnLogin')}
                        </button>
                        {!isTwoFA && (
                          <button className="btn">
                            <Link to="/register">{t('login.btnRegister')}</Link>
                          </button>
                        )}
                      </div>
                      {!isTwoFA && (
                        <div className="checkbox">
                          <label className="checkbox-inline">
                            <input id="checkbox" type="checkbox" {...register('rememberMe')} />
                            {t('login.rememberMe')}
                          </label>
                        </div>
                      )}
                      {!isTwoFA && (
                        <Link to="/forgot-password" className="lost-pass">
                          {t('login.forgotPassword')}
                        </Link>
                      )}
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
