import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import apiRequest from '../utils/apiRequest';
import Alert from '../components/Alert';
import Loading from './Loading';

const ResetPassword = () => {
  const { t } = useTranslation();
  const [error, setError] = useState({ message: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    setIsLoading(true);
    setError({ message: '', type: '' });

    const sendRequest = async () => {
      const { error: errorCode } = await apiRequest('/password-reset', 'POST', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          reset_token: token,
          password: formData.password,
        },
      });

      if (errorCode) {
        if (errorCode == 400) {
          setError({
            message: t('resetPassword.errors.linkExpired'),
            type: 'danger',
          });
        } else {
          setError({
            message: t('resetPassword.errors.serverError'),
            type: 'danger',
          });
        }
      } else {
        navigate('/login?message=login.resetPasswordSuccess');
      }

      setIsLoading(false);
    };

    sendRequest();
  };

  if (isLoading) {
    return <Loading />;
  }

  const password = watch('password');

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
                      <h2>{t('resetPassword.title')}</h2>
                    </div>
                  </div>
                </div>
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                  <div className="row mx-2 mx-sm-0">
                    <div className="col-12">
                      <Alert message={error.message} type={error.type} />
                      <div className="form-group">
                        <label>
                          {t('resetPassword.password')}
                          <span>*</span>
                        </label>
                        <input
                          type="password"
                          {...register('password', {
                            required: t('resetPassword.errors.passwordRequired'),
                            maxLength: {
                              value: 255,
                              message: t('resetPassword.errors.passwordMaxLength'),
                            },
                            minLength: {
                              value: 8,
                              message: t('resetPassword.errors.passwordMinLength'),
                            },
                            pattern: {
                              value:
                                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                              message: t('resetPassword.errors.passwordPattern'),
                            },
                          })}
                        />
                        {errors.password && (
                          <span className="text-danger">{errors.password.message}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label>
                          {t('resetPassword.confirmPassword')}
                          <span>*</span>
                        </label>
                        <input
                          type="password"
                          {...register('confirmPassword', {
                            required: t('resetPassword.errors.confirmPasswordRequired'),
                            validate: (value) =>
                              value === password || t('resetPassword.errors.passwordMustMatch'),
                          })}
                        />
                        {errors.confirmPassword && (
                          <span className="text-danger">{errors.confirmPassword.message}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group login-btn">
                        <button className="btn" type="submit">
                          {t('resetPassword.btnReset')}
                        </button>
                        <button className="btn">
                          <Link to="/login">{t('resetPassword.btnLogin')}</Link>
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

export default ResetPassword;
