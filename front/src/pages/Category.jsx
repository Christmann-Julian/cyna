import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../assets/css/hero-slider.css";
import "../assets/css/product-area.css";
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

  const fetchItems = async () => {
    const { data: category, error: errorCode } = await apiRequest(
      `/category/${currentLocale}/${id}`,
      "GET",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setCategory(category);
    setError(errorCode);
  };

  useEffect(() => {
    setCategory(null);
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
      <section className="hero-slider">
        <div className="single-slider">
          <div className="slide">
            <img src={category.url_image} alt={t("category.category")} />
            <div className="container">
              <div className="row no-gutters">
                <div className="col-lg-9 offset-lg-3 col-12">
                  <div className="text-inner">
                    <div className="row">
                      <div className="col-lg-7 col-12">
                        <div className="hero-text">
                          <h1>
                            <span>{t("category.category")} </span>
                            {category.name}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="homepage-description">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title">
                <h2>{t("category.description")}</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <p className="mx-5 text-center">{category.description}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="product-area section mb-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title">
                <h2>{t("category.services")}</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="row">
                {category.products.map((product) => (
                  <div
                    className="col-xl-3 col-lg-4 col-md-4 col-12"
                    key={product.id}
                  >
                    <SingleProduct product={product} />
                  </div>
                ))}
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
