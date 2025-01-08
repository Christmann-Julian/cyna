import React from 'react';
import '../assets/css/product-area.css';
import { Link } from 'react-router-dom';

const SingleProduct = ({ product }) => {
  // const labelClass = `product-label ${label === "Rupture" ? "rupture" : ""}`;

  return (    
      <div className="single-product">
        <div className="product-img">
          <Link to={"/product/" + product.id}>
            <img className="default-img" src={product.url_image || 'https://via.placeholder.com/370x300'} alt={product.name} />
            {/* {label && <span className={labelClass}>{label}</span>} */}
          </Link>
        </div>
        <div className="product-content">
          <h3><Link to={"/product/" + product.id}>{product.name}</Link></h3>
          <div className="product-price">
            <span>{product.price}</span>
          </div>
        </div>
      </div>
  );
}

export default SingleProduct;
