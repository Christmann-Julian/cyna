import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../assets/css/product.css";
import  "../assets/css/product-area.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMinus,
	faCartShopping,
	faPlus,
  } from "@fortawesome/free-solid-svg-icons";
import SingleProduct from '../components/SingleProduct';
import { useTranslation } from 'react-i18next';

const Product = () => {
	const { t } = useTranslation();

	const products = [
		{ id: 1, name: 'Nom de service', price: '29,00€', imgSrc: 'https://via.placeholder.com/370x300', label: 'Nouveau' },
		{ id: 2, name: 'Nom de service', price: '29,00€', imgSrc: 'https://via.placeholder.com/370x300', label: 'Rupture' },
		{ id: 3, name: 'Nom de service', price: '29,00€', imgSrc: 'https://via.placeholder.com/370x300', label: '-30%' },
		{ id: 4, name: 'Nom de service', price: '29,00€', imgSrc: 'https://via.placeholder.com/370x300' },
		{ id: 5, name: 'Nom de service', price: '29,00€', imgSrc: 'https://via.placeholder.com/370x300' },
		{ id: 6, name: 'Nom de service', price: '29,00€', imgSrc: 'https://via.placeholder.com/370x300', label: 'Nouveau' },
	  ];

	return (
		<>
			<Navbar/>
			<section className="shop single section">
				<div className="container">
					<div className="row"> 
						<div className="col-12">
							<div className="row">
								<div className="col-lg-6 col-12">
									<div className="product-gallery">
										<div className="flexslider-thumbnails">
											<ul className="slides">
												<li>
													<img src="https://via.placeholder.com/570x520" alt="#"/>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div className="col-lg-6 col-12">
									<div className="product-des">
										<div className="short">
											<h2>Mon Super produit</h2>
											<p className="price"><span className="discount">70,00€</span><s>80,00€</s> </p>
											<p className="description">eget velit. Donec ac tempus ante. Fusce ultricies massa massa. Fusce aliquam, purus eget sagittis vulputate, sapien libero hendrerit est, sed commodo augue nisi non neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, lorem et placerat vestibulum, metus nisi posuere nisl, in</p>
										</div>
										<div className="product-buy">
											<div className="quantity">
												<h6>{t("product.quantity")} :</h6>
												<div className="input-group">
													<div className="button minus">
														<button type="button" className="btn btn-primary btn-number" disabled="disabled" data-type="minus" data-field="quant[1]">
															<FontAwesomeIcon icon={faMinus} />
														</button>
													</div>
													<input type="text" name="quant[1]" className="input-number"  data-min="1" data-max="1000" value="1"/>
													<div className="button plus">
														<button type="button" className="btn btn-primary btn-number" data-type="plus" data-field="quant[1]">
															<FontAwesomeIcon icon={faPlus} />
														</button>
													</div>
												</div>
											</div>
											<div className="add-to-cart">
												<a href="#" className="btn">{t("product.tryNow")}</a>
												<a href="#" className="btn min"><FontAwesomeIcon icon={faCartShopping} /></a>
											</div>
											<p>
												<strong>Caractéristique 1 :</strong> <a href="#">Lorem, ipsum dolor.</a><br/>
												<strong>Caractéristique 2 :</strong> Lorem ipsum dolor sit.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="product-area section mb-5">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="section-title">
								<h2>{t("product.similaryServices")}</h2>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<div className="row">								
								{products.map((product) => (
									<div className="col-xl-4 col-lg-4 col-md-4 col-12">
										<SingleProduct key={product.id} {...product} />
									</div>
								))}													
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer/>		
		</>		
	)
};



export default Product;



