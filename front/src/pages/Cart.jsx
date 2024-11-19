import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import  "../assets/css/cart.css";
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMinus,
	faTrashCan,
	faPlus,
  } from "@fortawesome/free-solid-svg-icons";
import CartList from '../components/CartList';
import TotalCart from '../components/TotalCart';


const Cart = ()=> {
    const { t } = useTranslation();

    return(
        <>
        <Navbar/>
        <div className="shopping-cart section">
            <div className="container">
                <CartList />
                <TotalCart />                
            </div>
        </div>
        <Footer/>        
        </>
    )
}

export default Cart;