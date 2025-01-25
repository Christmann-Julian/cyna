import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import  "../assets/css/cart.css";
import CartList from '../components/CartList';
import TotalCart from '../components/TotalCart';

const Cart = ()=> {

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