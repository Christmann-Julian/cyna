// src/components/ProductList.js
import React from 'react';
import SingleProduct from './SingleProduct';
import { useTranslation } from 'react-i18next';

const ProductList = () => {
  const { t } = useTranslation();
  const products = [
    { id: 1, name: 'Nom de service', price: '29,00€', imgSrc: 'https://via.placeholder.com/370x300', label: 'Nouveau' },
    { id: 2, name: 'Nom de service', price: '29,00€', imgSrc: 'https://via.placeholder.com/370x300', label: 'Rupture' },
    { id: 3, name: 'Nom de service', price: '29,00€', imgSrc: 'https://via.placeholder.com/370x300', label: '-30%' },
    { id: 4, name: 'Nom de service', price: '29,00€', imgSrc: 'https://via.placeholder.com/370x300' },
    { id: 5, name: 'Nom de service', price: '29,00€', imgSrc: 'https://via.placeholder.com/370x300' },
    { id: 6, name: 'Nom de service', price: '29,00€', imgSrc: 'https://via.placeholder.com/370x300', label: 'Nouveau' },
    { id: 7, name: 'Nom de service', price: '29,00€', imgSrc: 'https://via.placeholder.com/370x300' },
    { id: 8, name: 'Nom de service', price: '29,00€', imgSrc: 'https://via.placeholder.com/370x300', label: '-50%' },
  ];

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
            <SingleProduct key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductList;
