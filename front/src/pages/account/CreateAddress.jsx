import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import Alert from '../../components/Alert';
import Loading from '../Loading';
import '../../assets/css/forms.css';
import { jwtDecode } from 'jwt-decode';
import apiRequest from '../../utils/apiRequest';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CreateAddress = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { t } = useTranslation();
  const [createLoading, setCreateLoading] = useState(false);
  const [alertCreate, setAlertCreate] = useState({ message: '', type: '' });
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const onSubmit = async (formData) => {
    setCreateLoading(true);

    let userId;
    if (token) {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.id;
    }

    const body = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      address1: formData.address1,
      address2: null,
      city: formData.city,
      county: formData.county,
      postalCode: formData.postalCode,
      country: formData.country,
      phone: formData.phone,
      user: `http://127.0.0.1:8000/api/users/${userId}`,
    };

    if (formData.address2 !== '') {
      body.address2 = formData.address2;
    }

    const { error } = await apiRequest(`/addresses`, 'POST', {
      headers: {
        'Content-Type': 'application/ld+json',
        Authorization: `Bearer ${token}`,
      },
      body,
    });

    if (error) {
      setAlertCreate({
        message: t('address.addressErrors.serverError'),
        type: 'danger',
      });
    } else {
      setAlertCreate({
        message: t('address.createAddressSuccess'),
        type: 'success',
      });
      reset();
    }

    setCreateLoading(false);
  };

  const backToPreviousPage = () => {
    navigate(-1);
  };

  return (
    <>
      {createLoading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <div className="shop login container mb-4">
            <div className="login-form">
              <div className="form-width">
                <div className="row">
                  <div className="col-12">
                    <h2>{t('address.createAddressTitle')}</h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <Alert message={alertCreate.message} type={alertCreate.type} />
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-group">
                        <label>{t('address.firstname')}</label>
                        <input
                          type="text"
                          placeholder={t('address.firstnameExample')}
                          {...register('firstname', {
                            required: t('address.addressErrors.firstnameRequired'),
                            maxLength: {
                              value: 250,
                              message: t('address.addressErrors.maxLength'),
                            },
                            minLength: {
                              value: 2,
                              message: t('address.addressErrors.minLength'),
                            },
                          })}
                        />
                        {errors.firstname && (
                          <span className="text-danger">{errors.firstname.message}</span>
                        )}
                      </div>
                      <div className="form-group">
                        <label>{t('address.lastname')}</label>
                        <input
                          type="text"
                          placeholder={t('address.lastnameExample')}
                          {...register('lastname', {
                            required: t('address.addressErrors.lastnameRequired'),
                            maxLength: {
                              value: 250,
                              message: t('address.addressErrors.maxLength'),
                            },
                            minLength: {
                              value: 2,
                              message: t('address.addressErrors.minLength'),
                            },
                          })}
                        />
                        {errors.lastname && (
                          <span className="text-danger">{errors.lastname.message}</span>
                        )}
                      </div>
                      <div className="form-group">
                        <label>{t('address.address1')}</label>
                        <input
                          type="text"
                          placeholder={t('address.address1Example')}
                          {...register('address1', {
                            required: t('address.addressErrors.address1Required'),
                            maxLength: {
                              value: 250,
                              message: t('address.addressErrors.maxLength'),
                            },
                            minLength: {
                              value: 2,
                              message: t('address.addressErrors.minLength'),
                            },
                          })}
                        />
                        {errors.address1 && (
                          <span className="text-danger">{errors.address1.message}</span>
                        )}
                      </div>
                      <div className="form-group">
                        <label>{t('address.address2')}</label>
                        <input
                          type="text"
                          placeholder={t('address.address2Example')}
                          {...register('address2', {
                            maxLength: {
                              value: 250,
                              message: t('address.addressErrors.maxLength'),
                            },
                            minLength: {
                              value: 2,
                              message: t('address.addressErrors.minLength'),
                            },
                          })}
                        />
                        {errors.address2 && (
                          <span className="text-danger">{errors.address2.message}</span>
                        )}
                      </div>
                      <div className="form-group">
                        <label>{t('address.city')}</label>
                        <input
                          type="text"
                          placeholder={t('address.cityExample')}
                          {...register('city', {
                            required: t('address.addressErrors.cityRequired'),
                            maxLength: {
                              value: 250,
                              message: t('address.addressErrors.maxLength'),
                            },
                            minLength: {
                              value: 2,
                              message: t('address.addressErrors.minLength'),
                            },
                          })}
                        />
                        {errors.city && <span className="text-danger">{errors.city.message}</span>}
                      </div>
                      <div className="form-group">
                        <label>{t('address.county')}</label>
                        <input
                          type="text"
                          placeholder={t('address.countyExample')}
                          {...register('county', {
                            required: t('address.addressErrors.countyRequired'),
                            maxLength: {
                              value: 250,
                              message: t('address.addressErrors.maxLength'),
                            },
                            minLength: {
                              value: 2,
                              message: t('address.addressErrors.minLength'),
                            },
                          })}
                        />
                        {errors.county && (
                          <span className="text-danger">{errors.county.message}</span>
                        )}
                      </div>
                      <div className="form-group">
                        <label>{t('address.postalCode')}</label>
                        <input
                          type="text"
                          placeholder={t('address.postalCodeExample')}
                          {...register('postalCode', {
                            required: t('address.addressErrors.postalCodeRequired'),
                            maxLength: {
                              value: 250,
                              message: t('address.addressErrors.maxLength'),
                            },
                            minLength: {
                              value: 2,
                              message: t('address.addressErrors.minLength'),
                            },
                          })}
                        />
                        {errors.postalCode && (
                          <span className="text-danger">{errors.postalCode.message}</span>
                        )}
                      </div>
                      <div className="form-group">
                        <label>{t('address.country')}</label>
                        <input
                          type="text"
                          placeholder={t('address.countryExample')}
                          {...register('country', {
                            required: t('address.addressErrors.countryRequired'),
                            maxLength: {
                              value: 250,
                              message: t('address.addressErrors.maxLength'),
                            },
                            minLength: {
                              value: 2,
                              message: t('address.addressErrors.minLength'),
                            },
                          })}
                        />
                        {errors.country && (
                          <span className="text-danger">{errors.country.message}</span>
                        )}
                      </div>
                      <div className="form-group">
                        <label>{t('address.phone')}</label>
                        <input
                          type="text"
                          placeholder={t('address.phoneExample')}
                          {...register('phone', {
                            required: t('address.addressErrors.phoneRequired'),
                            pattern: {
                              value: /^\+?[0-9]\d{1,14}$/,
                              message: t('address.errors.phonePattern'),
                            },
                          })}
                        />
                        {errors.phone && (
                          <span className="text-danger">{errors.phone.message}</span>
                        )}
                      </div>
                      <button type="submit" className="btn mt-3">
                        {t('address.createAddress')}
                      </button>
                      <button className="btn mt-3" onClick={backToPreviousPage}>
                        {t('address.backToPreviousPage')}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default CreateAddress;
