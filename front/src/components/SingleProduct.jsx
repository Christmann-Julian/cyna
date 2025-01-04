import React from 'react';
import '../assets/css/product-area.css';
import { Link } from 'react-router-dom';

const SingleProduct = ({ id, name, price, imgSrc, label }) => {
  const labelClass = `product-label ${label === "Rupture" ? "rupture" : ""}`;

  return (    
      <div className="single-product">
        <div className="product-img">
          <Link to={"/product/" + id}>
            <img className="default-img" src={imgSrc || 'https://via.placeholder.com/370x300'} alt={name} />
            {label && <span className={labelClass}>{label}</span>}
          </Link>
        </div>
        <div className="product-content">
          <h3><Link to={"/product/" + id}>{name}</Link></h3>
          <div className="product-price">
            <span>{price}</span>
          </div>
        </div>
      </div>
  );
}

export default SingleProduct;
