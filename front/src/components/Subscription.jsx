import React, { useEffect, useState } from 'react';
import '../assets/css/subscription.css';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import apiRequest from '../utils/apiRequest';
import { formatPrice } from '../utils/utils';
import { getCurrentLocale } from '../utils/language';
import { useDispatch } from 'react-redux';
import { addSubscription } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

const Subscription = () => {
  const { t } = useTranslation();
  const [subscriptions, setSubscriptions] = useState([]);
  const currentLocale = getCurrentLocale();
  const navigate = useNavigate();
  const durationTitle = {
    1: t('homepage.month'),
    12: t('homepage.year'),
  };

  const dispatch = useDispatch();

  const handleSubscribe = (subscription) => {
    dispatch(addSubscription(subscription));
    navigate('/order/checkout/subscription');
  };

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const { data, error } = await apiRequest(`/${currentLocale}/subscriptions`, 'GET');

      if (error) {
        setSubscriptions([]);
      } else {
        setSubscriptions(data);
      }
    };

    fetchSubscriptions();
  }, []);

  if (subscriptions.length === 0) {
    return;
  }

  const lastSubscription = subscriptions[subscriptions.length - 1];

  return (
    <section className="subscription pricing py-5 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title">
              <h2>{t('homepage.subscriptionTitle')}</h2>
            </div>
          </div>
        </div>

        <div className="row justify-content-center pt-5">
          {subscriptions.map((subscription) => (
            <div className="col-lg-5 col-md-6 mb-4" key={subscription.id}>
              <div className="card pricing-card h-100 border-0 shadow">
                <div
                  className={`card-header text-center border-0 pt-4 ${
                    subscription.id === lastSubscription.id ? 'bg-primary text-white' : 'bg-white'
                  }`}
                >
                  <h4 className="my-0 fw-bold">{subscription.title}</h4>
                </div>
                <div className="card-body text-center">
                  <div className="price mb-3">
                    <span className="price">{formatPrice(subscription.price)}</span>
                    <span className="period">/{durationTitle[subscription.duration]}</span>
                  </div>
                  <p className="text-muted mb-4">{subscription.subtitle}</p>
                  <ul className="feature-list text-start mb-4">
                    {subscription.caracteristics.map((feature) => (
                      <li key={feature.id}>{feature.text}</li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className={`btn btn-lg btn-subscribe w-75 ${
                      subscription.id === lastSubscription.id
                        ? 'btn-primary'
                        : 'btn-outline-primary'
                    }`}
                    onClick={() => handleSubscribe(subscription)}
                  >
                    {t('homepage.subscribe')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <p className="mb-0 text-muted">
            {t('homepage.questions')}{' '}
            <Link to="/contact" className="text-decoration-none">
              {t('homepage.contactUs')}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Subscription;
