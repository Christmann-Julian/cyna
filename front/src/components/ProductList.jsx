import React from 'react';
import SingleProduct from './SingleProduct';
import { useTranslation } from 'react-i18next';

const ProductList = ({products}) => {
  const { t } = useTranslation();

  return (
    <section className="product-area section mb-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title">
              <h2>{t("homepage.topServicesTitle")}</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {products.map((product) => (
            <div className="col-xl-3 col-lg-4 col-md-4 col-12" key={product.id}>
              <SingleProduct product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductList;
