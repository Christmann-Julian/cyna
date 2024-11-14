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


const Product = () => {
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
												<h6>Quantité :</h6>
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
												<a href="#" className="btn">Essayer Maintenant</a>
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
								<h2>Services Similaires</h2>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<div className="row">
								<div className="col-xl-4 col-lg-4 col-md-4 col-12">
									<div className="single-product">
											<div className="product-img">
											<a href="#">
												<img className="default-img" src="https://via.placeholder.com/370x300" alt="#"/>
											</a>
										</div>
										<div className="product-content">
											<h3><a href="#">Nom de service</a></h3>
											<div className="product-price">
												<span>29,00€</span>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-4 col-lg-4 col-md-4 col-12">
									<div className="single-product">
										<div className="product-img">
											<a href="#">
												<img className="default-img" src="https://via.placeholder.com/370x300" alt="#"/>
											</a>
										</div>
										<div className="product-content">
											<h3><a href="#">Nom de service</a></h3>
											<div className="product-price">
												<span>29,00€</span>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-4 col-lg-4 col-md-4 col-12">
									<div className="single-product">
										<div className="product-img">
											<a href="#">
												<img className="default-img" src="https://via.placeholder.com/370x300" alt="#"/>
											</a>
										</div>
										<div className="product-content">
											<h3><a href="#">Nom de service</a></h3>
											<div className="product-price">
												<span>29,00€</span>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-4 col-lg-4 col-md-4 col-12">
									<div className="single-product">
										<div className="product-img">
											<a href="#">
												<img className="default-img" src="https://via.placeholder.com/370x300" alt="#"/>
												<span>Nouveau</span>
											</a>
										</div>
										<div className="product-content">
											<h3><a href="#">Nom de service</a></h3>
											<div className="product-price">
												<span>29,00€</span>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-4 col-lg-4 col-md-4 col-12">
									<div className="single-product">
										<div className="product-img">
											<a href="#">
												<img className="default-img" src="https://via.placeholder.com/370x300" alt="#"/>
											</a>
										</div>
										<div className="product-content">
											<h3><a href="#">Nom de service</a></h3>
											<div className="product-price">
												<span>29,00€</span>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-4 col-lg-4 col-md-4 col-12">
									<div className="single-product">
										<div className="product-img">
											<a href="#">
												<img className="default-img" src="https://via.placeholder.com/370x300" alt="#"/>
												<span>-30%</span>
											</a>
										</div>
										<div className="product-content">
											<h3><a href="#">Nom de service</a></h3>
											<div className="product-price">
												<span>29,00€</span>
											</div>
										</div>
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
};



export default Product;



