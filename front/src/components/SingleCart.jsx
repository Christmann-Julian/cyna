import React from 'react';
import  "../assets/css/cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMinus,
	faTrashCan,
	faPlus,
  } from "@fortawesome/free-solid-svg-icons";

const SingleCart = ({product, price, total}) => {
    return(
        <tr>
            <td className="product-des" data-title="Produit">
                <p className="product-name"><a href="#">{product}</a></p>
            </td>
            <td data-title="Durée">
                <select name="duration" id="duration">
                <option value="">--Choisir une durée--</option>
                <option value="1">Mois</option>
                <option value="2">Année</option>
                </select>
            </td>
            <td className="price" data-title="Prix"><span>{price}</span></td>
            <td className="qty" data-title="Qte">
                <div className="input-group">
                    <div className="button minus">
                        <button type="button" className="btn btn-primary btn-number" disabled="disabled" data-type="minus" data-field="quant[1]">
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                    </div>
                    <input type="text" name="quant[1]" className="input-number"  data-min="1" data-max="100" value="1"/>
                    <div className="button plus">
                        <button type="button" className="btn btn-primary btn-number" data-type="plus" data-field="quant[1]">
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                </div>
            </td>
            <td className="total-amount" data-title="Total"><span>{total}</span></td>
            <td className="action" data-title="Supprimer"><a href="#"><FontAwesomeIcon icon={faTrashCan} /></a></td>
        </tr> 
    )

}
export default SingleCart;