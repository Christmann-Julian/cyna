import React, { useEffect, useState } from 'react';
import  "../../assets/css/cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMinus,
	faTrashCan,
	faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, addToCart, decreaseFromCart, updateDuration } from '../../redux/cartSlice';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import { formatPrice } from '../../utils/utils';

const SingleCart = ({id, name, duration, price, quantity, total}) => {

    const item = useSelector(state => state.cart.items.find(item => item.id === id));
    const promotionalCodes = useSelector(state => state.cart.promotionalCodeItems);
    const [previousPromotionalCodes, setPreviousPromotionalCodes] = useState(promotionalCodes);
    const [show, setShow] = useState(false);
    const [removedCodePromoName, setRemovedCodePromoName] = useState("");
    const { t } = useTranslation();

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

    const handleShow = () => {
        setShow(true);
    };
    
    const handleClose = () => setShow(false);

    useEffect(() => {
        if (previousPromotionalCodes.length > promotionalCodes.length) {
            const removedCode = previousPromotionalCodes.find(
                code => !promotionalCodes.some(currentCode => currentCode.id === code.id)
            );

            if (removedCode) {
                setRemovedCodePromoName(removedCode.name);
                handleShow();
            }
        }
        setPreviousPromotionalCodes(promotionalCodes);
    }, [promotionalCodes]);
    
    return(
        <tr>
            <td className="product-des" data-title={t('cart.product')}>
                <p className="product-name"><a href="#">{name}</a></p>
            </td>
            {/* <td data-title={t('cart.time')} className="duration">
                <select name="duration" value={item.duration} onChange={handleDurationChange}>
                    <option value="1">{t('cart.month')}</option>
                    <option value="10">{t('cart.year')}</option>
                </select>
            </td> */}
            <td className="price" data-title={t('cart.unitPrice')}><span>{formatPrice(price)}</span></td>
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
            <td className="total-amount" data-title={t('cart.total')}><span>{formatPrice(total)}</span></td>
            <td className="action" data-title={t('cart.title')}><FontAwesomeIcon icon={faTrashCan} onClick={handleRemove} /></td>
            <Modal
                show={show}
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {t("cart.modalPromo.title")}
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>{t("cart.modalPromo.body", { name: removedCodePromoName })}</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {t("cart.modalPromo.close")}
                </Button>
                </Modal.Footer>
            </Modal>
        </tr> 
    )

}
export default SingleCart;