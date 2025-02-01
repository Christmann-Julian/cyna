import React from 'react';
import  "../../assets/css/cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMinus,
	faTrashCan,
	faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, addToCart, decreaseFromCart, updateDuration } from '../../redux/cartSlice';
import { t } from 'i18next';

const SingleCart = ({id, name, duration, price, quantity, total}) => {

    const item = useSelector(state => state.cart.items.find(item => item.id === id));

    const dispatch = useDispatch();

    const handleAdd = () => {
        dispatch(addToCart({ id: id}));
    };

    const handleRemove = () => {
        dispatch(removeFromCart({ id: id }));
    };

    const handleDecrease = () => {
        dispatch(decreaseFromCart({ id: id }));
    };

    const handleDurationChange = (event) => {
        const newDuration = parseInt(event.target.value, 10);
        dispatch(updateDuration({ id, duration: newDuration }));
    };
    
    return(
        <tr>
            <td className="product-des" data-title={t('cart.product')}>
                <p className="product-name"><a href="#">{name}</a></p>
            </td>
            <td data-title={t('cart.time')} className="duration">
                <select name="duration" value={item.duration} onChange={handleDurationChange}>
                    <option value="1">{t('cart.month')}</option>
                    <option value="10">{t('cart.year')}</option>
                </select>
            </td>
            <td className="price" data-title={t('cart.unitPrice')}><span>{price.toFixed(2).toString().replace('.', ',')}€</span></td>
            <td className="qty text-center" data-title={t('cart.quantity')}>
                <div className="input-group">
                    <div className="button minus">
                        <button type="button" className="btn btn-primary btn-number" onClick={handleDecrease}>
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                    </div>
                    <input type="text" className="input-number" value={quantity} readOnly disabled />
                    <div className="button plus">
                        <button type="button" className="btn btn-primary btn-number" onClick={handleAdd}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                </div>
            </td>
            <td className="total-amount" data-title={t('cart.total')}><span>{total.toFixed(2).toString().replace('.', ',')}€</span></td>
            <td className="action" data-title={t('cart.title')}><FontAwesomeIcon icon={faTrashCan} onClick={handleRemove} /></td>
        </tr> 
    )

}
export default SingleCart;