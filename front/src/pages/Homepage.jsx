import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";
import HeroSlider from "../components/HeroSlider";
import "../assets/css/category-section.css";
import { useTranslation } from "react-i18next";
import { getCurrentLocale } from "../utils/language";
import apiRequest from "../utils/apiRequest";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";
import { Link } from "react-router-dom";
import Subscription from "../components/Subscription";

const Homepage = () => {
  const { t } = useTranslation();
  const currentLocale = getCurrentLocale();
  const [homepage, setHomepage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setHomepage(null);
    const fetchItems = async () => {
      const { data: homepage, error: errorCode } = await apiRequest(
        `/homepage/${currentLocale}`,
        "GET",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setHomepage(homepage);
      setError(errorCode);
    };

    fetchItems();
  }, [currentLocale]);

  if (error == 404) {
    return <ErrorPage />;
  }

  if (!homepage) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      {homepage.slides.length > 0 && <HeroSlider slides={homepage.slides} />}
      <section className="homepage-description">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title">
                <h2>{t("homepage.descriptionTitle")}</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <p className="mx-5">{homepage.description}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="categories-grid">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title">
                <h2>{t("homepage.categoriesTitle")}</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 col-12">
              <div className="big-content">
                <img
                  src={
                    homepage.categories[0]?.url_image ??
                    "https://via.placeholder.com/850x530"
                  }
                  alt="category image"
                />
                <div className="inner">
                  <h4
                    className={
                      homepage.categories[0]?.name === null ? "" : "title"
                    }
                  >
                    {homepage.categories[0]?.name ?? t("homepage.noCategories")}
                  </h4>
                  <div className="button">
                    <Link
                      to={`category/${homepage.categories[0]?.id}`}
                      className="btn"
                    >
                      {t("homepage.seeMore")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-12">
              {homepage.categories.slice(1, 3).map((category, index) => (
                <div key={index} className="small-content">
                  <img src={category.url_image} alt="SOC 2024" />
                  <div className="inner">
                    <h4 className="title">{category.name}</h4>
                    <div className="button">
                      <Link to={`category/${category.id}`} className="btn">
                        {t("homepage.seeMore")}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {homepage.topProducts.length > 0 && (
        <ProductList products={homepage.topProducts} />
      )}
      <Subscription />
      <Footer />
    </>
  );
};

export default Homepage;
