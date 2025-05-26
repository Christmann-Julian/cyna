import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AccountLayout from './AccountLayout';
import apiRequest from '../../utils/apiRequest';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { formatDate, formatPrice } from '../../utils/utils';
import LoadingSpinner from '../../components/LoadingSpinner';

const OrderAccount = () => {
  const [ordersByYear, setOrdersByYear] = useState({});
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const [activeTab, setActiveTab] = useState('orders');
  const [filterYearSecondPage, setFilterYearSecondPage] = useState('');
  const [filterStatusSecondPage, setFilterStatusSecondPage] = useState('');
  const [searchQuerySecondPage, setSearchQuerySecondPage] = useState('');
  const { t } = useTranslation();

  const statusTranslations = {
    paid: t('orderList.statusPaid'),
    active: t('orderList.statusActive'),
    terminated: t('orderList.statusTerminated'),
    renewed: t('orderList.statusRenewed'),
  };

  const filteredOrdersSecondPage = Object.keys(ordersByYear)
    .filter((year) => (filterYearSecondPage ? year === filterYearSecondPage : true))
    .reduce((acc, year) => {
      const filteredByStatus = ordersByYear[year].filter((order) =>
        filterStatusSecondPage ? order.status === filterStatusSecondPage : true
      );

      const filteredBySearch = filteredByStatus.filter(
        (order) =>
          order.reference.toLowerCase().includes(searchQuerySecondPage.toLowerCase()) ||
          order.date.includes(searchQuerySecondPage)
      );

      if (filteredBySearch.length > 0) {
        acc[year] = filteredBySearch;
      }

      return acc;
    }, {});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data, error } = await apiRequest('/order/by-year', 'GET', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (error) {
          console.error('Error :', error);
        } else {
          setOrdersByYear(data);
        }
      } catch (error) {
        console.error('Error :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'terminated':
        return 'danger';
      case 'paid':
        return 'primary';
      case 'active':
        return 'success';
      default:
        return 'secondary';
    }
  };

  return (
    <AccountLayout>
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          {t('orderList.firstTab')}
        </button>
        <button
          className={`tab-button ${activeTab === 'secondPage' ? 'active' : ''}`}
          onClick={() => setActiveTab('secondPage')}
        >
          {t('orderList.secondTab')}
        </button>
      </div>

      {activeTab === 'orders' && (
        <>
          {loading ? (
            <LoadingSpinner />
          ) : Object.keys(ordersByYear).length === 0 ? (
            <div className="no-orders">
              <p>{t('orderList.noOrders')}</p>
            </div>
          ) : (
            <div className="order-list">
              {Object.keys(ordersByYear)
                .sort((a, b) => b - a)
                .map((year) => (
                  <div key={year} className="order-year">
                    <h2 className="my-2">
                      {t('orderList.year')} {year}
                    </h2>
                    <div className="table-responsive mb-3">
                      <table className="table table-hover mb-0">
                        <thead>
                          <tr>
                            <th>{t('orderList.reference')}</th>
                            <th>{t('orderList.date')}</th>
                            <th>{t('orderList.status')}</th>
                            <th>{t('orderList.duration')}</th>
                            <th>{t('orderList.total')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ordersByYear[year].map((order) => (
                            <tr key={order.id}>
                              <td>
                                <Link className="navi-link" to={`/account/order/${order.id}`}>
                                  {order.reference}
                                </Link>
                              </td>
                              <td>{formatDate(new Date(order.date))}</td>
                              <td>
                                <span className={`badge text-bg-${getStatusBadge(order.status)}`}>
                                  {statusTranslations[order.status] || order.status}
                                </span>
                              </td>
                              <td>{order.duration ?? t('orderList.ponctual')}</td>
                              <td>{formatPrice(order.total)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </>
      )}

      {activeTab === 'secondPage' && (
        <div className="second-page">
          <div className="filters" style={{ flexWrap: 'wrap' }}>
            <select
              value={filterYearSecondPage}
              onChange={(e) => setFilterYearSecondPage(e.target.value)}
              className="filter-select"
            >
              <option value="">{t('orderList.allYears')}</option>
              {Object.keys(ordersByYear)
                .sort((a, b) => b - a)
                .map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
            </select>

            <select
              value={filterStatusSecondPage}
              onChange={(e) => setFilterStatusSecondPage(e.target.value)}
              className="filter-select"
            >
              <option value="">{t('orderList.allStatus')}</option>
              <option value="paid">{t('orderList.statusPaid')}</option>
              <option value="active">{t('orderList.statusActive')}</option>
              <option value="terminated">{t('orderList.statusTerminated')}</option>
              <option value="renewed">{t('orderList.statusRenewed')}</option>
            </select>

            <input
              type="text"
              placeholder={t('orderList.searchPlaceholder')}
              value={searchQuerySecondPage}
              onChange={(e) => setSearchQuerySecondPage(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="order-list">
            {Object.keys(filteredOrdersSecondPage)
              .sort((a, b) => b - a)
              .map((year) => (
                <div key={year} className="order-year">
                  <h2 className="my-2">
                    {t('orderList.year')} {year}
                  </h2>
                  <div className="table-responsive mb-3">
                    <table className="table table-hover mb-0">
                      <thead>
                        <tr>
                          <th>{t('orderList.reference')}</th>
                          <th>{t('orderList.date')}</th>
                          <th>{t('orderList.status')}</th>
                          <th>{t('orderList.duration')}</th>
                          <th>{t('orderList.total')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrdersSecondPage[year].map((order) => (
                          <tr key={order.id}>
                            <td>
                              <Link className="navi-link" to={`/account/order/${order.id}`}>
                                {order.reference}
                              </Link>
                            </td>
                            <td>{formatDate(new Date(order.date))}</td>
                            <td>
                              <span className={`badge text-bg-${getStatusBadge(order.status)}`}>
                                {statusTranslations[order.status] || order.status}
                              </span>
                            </td>
                            <td>{order.duration ?? t('orderList.ponctual')}</td>
                            <td>{formatPrice(order.total)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </AccountLayout>
  );
};

export default OrderAccount;
