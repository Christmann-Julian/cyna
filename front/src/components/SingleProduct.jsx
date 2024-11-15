import React from 'react';
import '../assets/css/product-area.css';

const SingleProduct = ({ name, price, imgSrc, label }) => {
  const labelClass = `product-label ${label === "Rupture" ? "rupture" : ""}`;

  return (    
      <div className="single-product">
        <div className="product-img">
          <a href="#">
            <img className="default-img" src={imgSrc} alt={name} />
            {label && <span className={labelClass}>{label}</span>}
          </a>
        </div>
        <div className="product-content">
          <h3><a href="#">{name}</a></h3>
          <div className="product-price">
            <span>{price}</span>
          </div>
        </div>
      </div>
  );
}

export default SingleProduct;
