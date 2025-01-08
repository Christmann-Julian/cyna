import React from 'react';
import  "../assets/css/cart.css";
import { useTranslation } from 'react-i18next';
import "../pages/Checkout";


const TotalCart = ()=> {
    const { t } = useTranslation();    

    return(
        <div className="row">
            <div className="col-12">
                <div className="total-amount">
                    <div className="row">
                        <div className="col-lg-8 col-md-5 col-12">
                            <div className="left">
                                <div className="coupon">
                                    <form action="#" target="_blank">
                                        <input name="Coupon" placeholder="Code promo"/>
                                        <button className="btn">Appliquer</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-7 col-12">
                            <div className="right">
                                <ul>
                                    <li>Sous Total<span>450,00€</span></li>
                                    <li>Promotion<span>00,00€</span></li>
                                    <li>Taxe (20%)<span>90,00€</span></li>
                                    <li className="last">Total<span>450,00€</span></li>
                                </ul>
                                <div>
                                    <a href="/checkout" className="btn">Passer à la caisse</a>
                                    <a href="#" className="btn">Continuer mes achats</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TotalCart;