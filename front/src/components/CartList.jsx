import React from 'react';
import SingleCart from './SingleCart';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const CartList = ()=> {
    const { t } = useTranslation();

    const products = [
        { id: 1, product: 'CYNA XDR', price: '50,00€',  total: '150,00€' },
        { id: 2, product: 'CYNA XDR', price: '50,00€',  total: '150,00€' },
        { id: 3, product: 'CYNA XDR', price: '50,00€',  total: '150,00€' },
    ];
    
    return(
        <div className="row">
            <div className="col-12">
                <table className="table shopping-summery">
                    <thead>
                        <tr className="main-hading">
                            <th>PRODUIT</th>
                            <th>DUREE</th>
                            <th className="text-center">PRIX UNITAIRE</th>
                            <th className="text-center">QUANTITE</th>
                            <th className="text-center">TOTAL</th> 
                            <th className="text-center"><FontAwesomeIcon icon={faTrashCan} /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (                                
                            <SingleCart key={product.id} {...product} />                               
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CartList;