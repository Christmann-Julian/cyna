import React from "react";
import "../assets/css/product-area.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatPrice } from "../utils/utils";

const SingleProduct = ({ product }) => {
  const { t } = useTranslation();

  return (
    <div className="single-product">
      <div className="product-img">
        <Link to={"/product/" + product.id}>
          <img
            className="default-img"
            src={product.url_image || "https://via.placeholder.com/370x300"}
            alt={product.name}
          />
          {product.promotionActive && product.promotionLabel.length > 0 && (
            <span className="product-label">{product.promotionLabel}</span>
          )}
          {product.disponibility == false && (
            <span className="product-label rupture">
              {t("product.noStock")}
            </span>
          )}
        </Link>
      </div>
      <div className="product-content">
        <h3>
          <Link to={"/product/" + product.id}>{product.name}</Link>
        </h3>
        <div className="product-price">
          {product.promotionActive ? (
            <>
              <span className="old me-2">
                {product.price.toFixed(2).toString().replace(".", ",")}
              </span>
              <span>
                {formatPrice(product.promotionPrice)}
              </span>
            </>
          ) : (
            <span>
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
