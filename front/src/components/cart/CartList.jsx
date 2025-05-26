import React from 'react';
import SingleCart from './SingleCart';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const CartList = () => {
  const { t } = useTranslation();
  const cart = useSelector((state) => state.cart);

  return (
    <div className="row">
      <div className="col-12">
        <table className="table shopping-summery">
          <thead>
            <tr className="main-hading">
              <th>{t('cart.product')}</th>
              {/* <th>{t("cart.time")}</th> */}
              <th>{t('cart.unitPrice')}</th>
              <th>{t('cart.quantity')}</th>
              <th>{t('cart.total')}</th>
              <th>
                <FontAwesomeIcon icon={faTrashCan} />
              </th>
            </tr>
          </thead>
          <tbody>
            {cart.items.length === 0 ? (
              <tr>
                <td>{t('cart.noProduct')}</td>
                {/* <td></td> */}
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ) : (
              <>
                {cart.items.map((product) => (
                  <SingleCart key={product.id} {...product} />
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CartList;
