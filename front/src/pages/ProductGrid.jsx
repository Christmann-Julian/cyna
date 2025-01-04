import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import  "../assets/css/product-area.css";
import  "../assets/css/filters.css";
import SingleProduct from '../components/SingleProduct';
import { useTranslation } from 'react-i18next';


const ProductGrid = () => {
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
        <>
            <Navbar/>
            <section className="product-area shop-sidebar shop section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-12">
                            <div className="shop-sidebar">
                                <div className="single-widget category">
                                    <h3 className="title">{t("product-grid.categories")}</h3>
                                    <ul className="categor-list">
                                        <li><a href="#">Catégorie 1</a></li>
                                        <li><a href="#">Catégorie 2</a></li>
                                        <li><a href="#">Catégorie 3</a></li>
                                        <li><a href="#">Catégorie 4</a></li>
                                        <li><a href="#">Catégorie 5</a></li>
                                        <li><a href="#">Catégorie 6</a></li>
                                    </ul>
                                </div>
                                <div className="single-widget range">
                                    <h3 className="title">{t("product-grid.sortByPrice")}</h3>
                                    <div className="price-filter">
                                        <div className="price-filter-inner">
                                            <div id="slider-range"></div>
                                                <div className="price_slider_amount">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="single-widget category">
                                    <h3 className="title">Caractéristiques</h3>
                                    <ul className="check-box-list">
                                            <li>
                                                <label className="checkbox-inline" for="1"><input name="news" id="1" type="checkbox"/>Caractéristique 1<span className="count">(3)</span></label>
                                            </li>
                                            <li>
                                                <label className="checkbox-inline" for="2"><input name="news" id="2" type="checkbox"/>Caractéristique 2<span className="count">(5)</span></label>
                                            </li>
                                            <li>
                                                <label className="checkbox-inline" for="3"><input name="news" id="3" type="checkbox"/>Caractéristique 3<span className="count">(8)</span></label>
                                            </li>
                                        </ul>
                                </div>
                                <div className="single-widget category">
                                    <h3 className="title">{t("product-grid.only")}</h3>
                                    <ul className="check-box-list">
                                            <li>
                                                <label className="checkbox-inline" for="1"><input name="news" id="1" type="checkbox"/>{t("product-grid.promotions")}<span className="count">(3)</span></label>
                                            </li>
                                            <li>
                                                <label className="checkbox-inline" for="2"><input name="news" id="2" type="checkbox"/>{t("product-grid.available")}<span className="count">(5)</span></label>
                                            </li>
                                        </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-8 col-12">
                            <div className="row">
                                <div className="col-12">
                                    <div className="shop-top">
                                        <div className="shop-shorter">
                                            <div className="single-shorter">
                                                <label>{t("product-grid.show")} :</label>
                                                <select className="form-select">
                                                    <option selected="selected">05</option>
                                                    <option>20</option>
                                                    <option>50</option>
                                                    <option>100</option>
                                                </select>
                                            </div>
                                            <div className="single-shorter">
                                                <label>{t("product-grid.sortBy")} :</label>
                                                <select className="form-select">
                                                    <option selected="selected">Nom (A-Z)</option>
                                                    <option>Nom (Z-A)</option>
                                                    <option>Prix croissant</option>
                                                    <option>Prix décroissant</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="row">
                                        {products.map((product) => (
                                            <div className="col-xl-3 col-lg-3 col-md-2 col-12">
                                                <SingleProduct key={product.id} {...product} />
                                            </div>
                                        ))}	
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}

export default ProductGrid;