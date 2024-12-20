import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../assets/css/hero-slider.css";
import "../assets/css/product-area.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import ErrorPage from "./ErrorPage";
import SingleProduct from "../components/SingleProduct";
import { useTranslation } from "react-i18next";
import apiRequest from "../utils/apiRequest";
import Loading from "./Loading";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCurrentLocale } from "../utils/language";

const Category = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const currentLocale = getCurrentLocale();
    const [category, setCategory] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setCategory(null);
        const fetchItems = async () => {
            const { data: category, error: errorCode } = await apiRequest(`/categories/${currentLocale}/${id}`, "GET", {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setCategory(category);
            setError(errorCode);
        };

        fetchItems();
    }, [id, currentLocale]);

    if (error == 404) {
        return <ErrorPage />;
    }

    if (!category) {
        return <Loading />;
    }

    return (
        <>
            <Navbar />
            <section class="hero-slider">
                <div class="single-slider">
                    {category.url_image}
                        <div class="container">
                            <div class="row no-gutters">
                                <div class="col-lg-9 offset-lg-3 col-12">
                                    <div class="text-inner">
                                        <div class="row">
                                            <div class="col-lg-7 col-12">
                                                <div class="hero-text">
                                                    <h1><span>{t("category.category")} </span>Service de XDR</h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </section>
            <section class="homepage-description">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="section-title">
                                <h2>{t("category.description")}</h2>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <p class="mx-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid quo, dolores labore vel dolorum, quibusdam optio fugiat, atque velit dignissimos deserunt illum vero corporis quaerat culpa numquam eligendi? Distinctio, veritatis optio dignissimos dolores numquam hic tempora natus corporis. Quam delectus beatae labore quaerat vel harum aspernatur voluptatum non esse ipsam? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga nesciunt nemo accusantium perspiciatis mollitia eveniet?</p>
                        </div>
                    </div>
                </div>
            </section>
            <section class="product-area section mb-5">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="section-title">
                                <h2>{t("category.services")}</h2>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="row">
                                <div class="col-xl-3 col-lg-4 col-md-4 col-12">
                                    <div class="single-product">
                                        <div class="product-img">
                                            <a href="#">
                                                <img class="default-img" src="https://via.placeholder.com/370x300" alt="#"/>
                                            </a>
                                        </div>
                                        <div class="product-content">
                                            <h3><a href="#">Nom de service</a></h3>
                                            <div class="product-price">
                                                <span>29,00€</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-4 col-md-4 col-12">
                                    <div class="single-product">
                                        <div class="product-img">
                                            <a href="#">
                                                <img class="default-img" src="https://via.placeholder.com/370x300" alt="#"/>
                                            </a>
                                        </div>
                                        <div class="product-content">
                                            <h3><a href="#">Nom de service</a></h3>
                                            <div class="product-price">
                                                <span>29,00€</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-4 col-md-4 col-12">
                                    <div class="single-product">
                                        <div class="product-img">
                                            <a href="#">
                                                <img class="default-img" src="https://via.placeholder.com/370x300" alt="#"/>
                                            </a>
                                        </div>
                                        <div class="product-content">
                                            <h3><a href="#">Nom de service</a></h3>
                                            <div class="product-price">
                                                <span>29,00€</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-4 col-md-4 col-12">
                                    <div class="single-product">
                                        <div class="product-img">
                                            <a href="#">
                                                <img class="default-img" src="https://via.placeholder.com/370x300" alt="#"/>
                                                    <span>Nouveau</span>
                                            </a>
                                        </div>
                                        <div class="product-content">
                                            <h3><a href="#">Nom de service</a></h3>
                                            <div class="product-price">
                                                <span>29,00€</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-4 col-md-4 col-12">
                                    <div class="single-product">
                                        <div class="product-img">
                                            <a href="#">
                                                <img class="default-img" src="https://via.placeholder.com/370x300" alt="#"/>
                                            </a>
                                        </div>
                                        <div class="product-content">
                                            <h3><a href="#">Nom de service</a></h3>
                                            <div class="product-price">
                                                <span>29,00€</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-4 col-md-4 col-12">
                                    <div class="single-product">
                                        <div class="product-img">
                                            <a href="#">
                                                <img class="default-img" src="https://via.placeholder.com/370x300" alt="#"/>
                                                    <span>-30%</span>
                                            </a>
                                        </div>
                                        <div class="product-content">
                                            <h3><a href="#">Nom de service</a></h3>
                                            <div class="product-price">
                                                <span>29,00€</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-4 col-md-4 col-12">
                                    <div class="single-product">
                                        <div class="product-img">
                                            <a href="#">
                                                <img class="default-img" src="https://via.placeholder.com/370x300" alt="#"/>
                                            </a>
                                        </div>
                                        <div class="product-content">
                                            <h3><a href="#">Nom de service</a></h3>
                                            <div class="product-price">
                                                <span>29,00€</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-4 col-md-4 col-12">
                                    <div class="single-product">
                                        <div class="product-img">
                                            <a href="#">
                                                <img class="default-img" src="https://via.placeholder.com/370x300" alt="#"/>
                                                    <span>Rupture</span>
                                            </a>
                                        </div>
                                        <div class="product-content">
                                            <h3><a href="#">Nom de service</a></h3>
                                            <div class="product-price">
                                                <span class="old">60,00€</span>
                                                <span>50,00€</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Category;
