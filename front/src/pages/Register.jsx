import React, { useState } from 'react';
import '../assets/css/forms.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loading from '../pages/Loading';
import Alert from '../components/Alert';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import apiRequest from '../utils/apiRequest';
import { getCurrentLocale } from '../utils/language';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [errorRegister, setErrorRegister] = useState({ message: '', type: '' });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    setLoading(true);
    const fetchItems = async () => {
      const { data, error } = await apiRequest('/users/register', 'POST', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          email: formData.email,
          plainPassword: formData.password,
          firstname: formData.firstname,
          lastname: formData.lastname,
          locale: getCurrentLocale(),
        },
      });

      setLoading(false);

      if (error) {
        if (error == 400) {
          setErrorRegister({
            message: t('register.errors.emailExists'),
            type: 'danger',
          });
        } else {
          setErrorRegister({
            message: t('register.errors.serverError'),
            type: 'danger',
          });
        }
      } else {
        navigate('/login?message=login.registerSuccess');
      }
    };

    fetchItems();
  };

  const password = watch('password');

  if (loading) {
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
                      <h2>{t('register.title')}</h2>
                    </div>
                  </div>
                </div>
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-12">
                      <Alert message={errorRegister.message} type={errorRegister.type} />
                      <div className="form-group">
                        <label>
                          {t('register.lastname')}
                          <span>*</span>
                        </label>
                        <input
                          {...register('lastname', {
                            required: t('register.errors.lastnameRequired'),
                            maxLength: {
                              value: 50,
                              message: t('register.errors.maxLength'),
                            },
                            minLength: {
                              value: 2,
                              message: t('register.errors.minLength'),
                            },
                          })}
                        />
                        {errors.lastname && (
                          <span className="text-danger">{errors.lastname.message}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label>
                          {t('register.firstname')}
                          <span>*</span>
                        </label>
                        <input
                          {...register('firstname', {
                            required: t('register.errors.firstnameRequired'),
                            maxLength: {
                              value: 50,
                              message: t('register.errors.maxLength'),
                            },
                            minLength: {
                              value: 2,
                              message: t('register.errors.minLength'),
                            },
                          })}
                        />
                        {errors.firstname && (
                          <span className="text-danger">{errors.firstname.message}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label>
                          {t('register.email')}
                          <span>*</span>
                        </label>
                        <input
                          {...register('email', {
                            required: t('register.errors.emailRequired'),
                            pattern: {
                              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/,
                              message: t('register.errors.emailPattern'),
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
                          {t('register.password')}
                          <span>*</span>
                        </label>
                        <input
                          type="password"
                          {...register('password', {
                            required: t('register.errors.passwordRequired'),
                            maxLength: {
                              value: 255,
                              message: t('register.errors.passwordMaxLength'),
                            },
                            minLength: {
                              value: 8,
                              message: t('register.errors.passwordMinLength'),
                            },
                            pattern: {
                              value:
                                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                              message: t('register.errors.passwordPattern'),
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
                          {t('register.confirmPassword')}
                          <span>*</span>
                        </label>
                        <input
                          type="password"
                          {...register('confirmPassword', {
                            required: t('register.errors.confirmPasswordRequired'),
                            validate: (value) =>
                              value === password || t('register.errors.passwordMustMatch'),
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
                          {t('register.btnRegister')}
                        </button>
                        <button className="btn" type="submit">
                          <Link to="/login">{t('register.btnLogin')}</Link>
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

export default Register;
