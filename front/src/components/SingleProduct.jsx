// src/components/SingleProduct.js
import React from 'react';
import '../assets/css/product-area.css';

function SingleProduct({ name, price, imgSrc, label }) {
  // Déterminer la classe de style pour l'étiquette en fonction du label
  const labelClass = `product-label ${label === "Rupture" ? "rupture" : ""}`;

  return (
    <div className="col-xl-3 col-lg-4 col-md-4 col-12">
      <div className="single-product">
        <div className="product-img">
          <a href="#">
            <img className="default-img" src={imgSrc} alt={name} />
            {/* Affichage conditionnel du label avec la classe dynamique */}
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
    </div>
  );
}

export default SingleProduct;
