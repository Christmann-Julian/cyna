import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import apiRequest from '../utils/apiRequest';
import LoadingSpinner from './LoadingSpinner';
import Alert from './Alert';
import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const AddressUpdateForm = ({ address }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { t } = useTranslation();
  const [updateLoading, setUpdateLoading] = useState(false);
  const [alertUpdate, setAlertUpdate] = useState({ message: '', type: '' });
  const [show, setShow] = useState(false);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    setValue('firstname', address.firstname);
    setValue('lastname', address.lastname);
    setValue('address1', address.address1);
    setValue('address2', address.address2);
    setValue('city', address.city);
    setValue('county', address.county);
    setValue('postalCode', address.postalCode);
    setValue('country', address.country);
    setValue('phone', address.phone);
  }, []);

  const onSubmit = async (formData, addressId) => {
    setUpdateLoading(true);

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
    };

    if (formData.address2 !== '') {
      body.address2 = formData.address2;
    }

    const { error } = await apiRequest(`/addresses/${addressId}`, 'PATCH', {
      headers: {
        'Content-Type': 'application/merge-patch+json',
        Authorization: `Bearer ${token}`,
      },
      body,
    });

    if (error) {
      setAlertUpdate({
        message: t('address.errors.serverError'),
        type: 'danger',
      });
    } else {
      setAlertUpdate({
        message: t('address.updateAddressSuccess'),
        type: 'success',
      });
    }

    setUpdateLoading(false);
  };

  const handleDelete = async () => {
    try {
      const { error } = await apiRequest(`/addresses/${address.id}`, 'DELETE', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      window.location.reload();
    } catch (error) {
      setAlertUpdate({
        message: t('address.errors.serverError'),
        type: 'danger',
      });
    }
  };

  const handleShow = (event) => {
    event.preventDefault();
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <>
      <Alert message={alertUpdate.message} type={alertUpdate.type} />
      {updateLoading ? (
        <LoadingSpinner height={'100px'} />
      ) : (
        <form
          className="form"
          onSubmit={handleSubmit((formData) => onSubmit(formData, address.id))}
        >
          <div className="form-group">
            <label>{t('address.firstname')}</label>
            <input
              type="text"
              placeholder={t('address.firstnameExample')}
              {...register('firstname', {
                required: t('address.errors.firstnameRequired'),
                maxLength: {
                  value: 250,
                  message: t('address.errors.maxLength'),
                },
                minLength: {
                  value: 2,
                  message: t('address.errors.minLength'),
                },
              })}
            />
            {errors.firstname && <span className="text-danger">{errors.firstname.message}</span>}
          </div>
          <div className="form-group">
            <label>{t('address.lastname')}</label>
            <input
              type="text"
              placeholder={t('address.lastnameExample')}
              {...register('lastname', {
                required: t('address.errors.lastnameRequired'),
                maxLength: {
                  value: 250,
                  message: t('address.errors.maxLength'),
                },
                minLength: {
                  value: 2,
                  message: t('address.errors.minLength'),
                },
              })}
            />
            {errors.lastname && <span className="text-danger">{errors.lastname.message}</span>}
          </div>
          <div className="form-group">
            <label>{t('address.address1')}</label>
            <input
              type="text"
              placeholder={t('address.address1Example')}
              {...register('address1', {
                required: t('address.errors.address1Required'),
                maxLength: {
                  value: 250,
                  message: t('address.errors.maxLength'),
                },
                minLength: {
                  value: 2,
                  message: t('address.errors.minLength'),
                },
              })}
            />
            {errors.address1 && <span className="text-danger">{errors.address1.message}</span>}
          </div>
          <div className="form-group">
            <label>{t('address.address2')}</label>
            <input
              type="text"
              placeholder={t('address.address2Example')}
              {...register('address2', {
                maxLength: {
                  value: 250,
                  message: t('address.errors.maxLength'),
                },
                minLength: {
                  value: 2,
                  message: t('address.errors.minLength'),
                },
              })}
            />
            {errors.address2 && <span className="text-danger">{errors.address2.message}</span>}
          </div>
          <div className="form-group">
            <label>{t('address.city')}</label>
            <input
              type="text"
              placeholder={t('address.cityExample')}
              {...register('city', {
                required: t('address.errors.cityRequired'),
                maxLength: {
                  value: 250,
                  message: t('address.errors.maxLength'),
                },
                minLength: {
                  value: 2,
                  message: t('address.errors.minLength'),
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
                required: t('address.errors.countyRequired'),
                maxLength: {
                  value: 250,
                  message: t('address.errors.maxLength'),
                },
                minLength: {
                  value: 2,
                  message: t('address.errors.minLength'),
                },
              })}
            />
            {errors.county && <span className="text-danger">{errors.county.message}</span>}
          </div>
          <div className="form-group">
            <label>{t('address.postalCode')}</label>
            <input
              type="text"
              placeholder={t('address.postalCodeExample')}
              {...register('postalCode', {
                required: t('address.errors.postalCodeRequired'),
                maxLength: {
                  value: 250,
                  message: t('address.errors.maxLength'),
                },
                minLength: {
                  value: 2,
                  message: t('address.errors.minLength'),
                },
              })}
            />
            {errors.postalCode && <span className="text-danger">{errors.postalCode.message}</span>}
          </div>
          <div className="form-group">
            <label>{t('address.country')}</label>
            <input
              type="text"
              placeholder={t('address.countryExample')}
              {...register('country', {
                required: t('address.errors.countryRequired'),
                maxLength: {
                  value: 250,
                  message: t('address.errors.maxLength'),
                },
                minLength: {
                  value: 2,
                  message: t('address.errors.minLength'),
                },
              })}
            />
            {errors.country && <span className="text-danger">{errors.country.message}</span>}
          </div>
          <div className="form-group">
            <label>{t('address.phone')}</label>
            <input
              type="text"
              placeholder={t('address.phoneExample')}
              {...register('phone', {
                required: t('address.errors.phoneRequired'),
                pattern: {
                  value: /^\+?[0-9]\d{1,14}$/,
                  message: t('address.errors.phonePattern'),
                },
              })}
            />
            {errors.phone && <span className="text-danger">{errors.phone.message}</span>}
          </div>
          <button type="submit" className="btn mt-3">
            {t('address.updateAddress')}
          </button>
          <button
            type="button"
            className="btn btn-danger mt-3"
            style={{ backgroundColor: 'red' }}
            onClick={handleShow}
          >
            {t('address.deleteAddress')}
          </button>
        </form>
      )}
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{t('address.modal.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t('address.modal.body')}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            {t('address.modal.confirm')}
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            {t('address.modal.close')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddressUpdateForm;
