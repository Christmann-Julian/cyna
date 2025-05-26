import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import apiRequest from '../utils/apiRequest';
import LoadingSpinner from './LoadingSpinner';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const ListPaymentMethod = () => {
  const { t } = useTranslation();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [fetchPaymentMethodLoading, setFetchPaymentMethodLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [paymentMethodId, setPaymentMethodId] = useState(null);
  const token = useSelector((state) => state.auth.token);

  const handleShow = (event, id) => {
    event.preventDefault();
    setShow(true);
    setPaymentMethodId(id);
  };

  const handleClose = () => setShow(false);

  useEffect(() => {
    setFetchPaymentMethodLoading(true);

    const fetchPaymentMethod = async () => {
      try {
        const { data, error } = await apiRequest(`/user/payment_methods`, 'GET', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (data !== null) {
          setPaymentMethods(data);
          setFetchPaymentMethodLoading(false);
        }
      } catch (error) {
        console.error('Error fetching :', error);
        setFetchPaymentMethodLoading(false);
      }
    };

    fetchPaymentMethod();
  }, []);

  const handleDelete = async () => {
    try {
      const { error } = await apiRequest(`/payment_methods/${paymentMethodId}`, 'DELETE', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      window.location.reload();
    } catch (error) {}
  };

  return (
    <>
      {fetchPaymentMethodLoading ? (
        <LoadingSpinner height={'100px'} />
      ) : (
        <>
          {paymentMethods.length === 0 ? (
            <div className="d-flex justify-content-center">
              {t('paymentMethod.noPaymentMethod')}
            </div>
          ) : (
            <ul className="list-group">
              {paymentMethods.map((paymentMethod, index) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={index}
                >
                  <span>
                    {paymentMethod.brand} **** **** **** {paymentMethod.last4} -{' '}
                    {t('paymentMethod.expirationDate')} {paymentMethod.expiryMonth}/
                    {paymentMethod.expiryYear}
                  </span>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-danger"
                    onClick={(event) => handleShow(event, paymentMethod.id)}
                    style={{ cursor: 'pointer' }}
                  />
                </li>
              ))}
            </ul>
          )}
          <div className="d-flex justify-content-center mt-4">
            <Link to="/account/payment-method" className="btn btn-add">
              {t('paymentMethod.add')}
            </Link>
          </div>
          <Modal
            show={show}
            onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                {t('paymentMethod.modal.title')}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>{t('paymentMethod.modal.body')}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleDelete}>
                {t('paymentMethod.modal.confirm')}
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
};

export default ListPaymentMethod;
