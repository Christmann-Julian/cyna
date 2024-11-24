import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../assets/css/product.css";
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

const Product = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const currentLocale = getCurrentLocale();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      const { data: product, error: errorCode } = await apiRequest(`/product/${currentLocale}/${id}`, "GET", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setProduct(product);
      setError(errorCode);
    };

    fetchItems();
  }, [id, currentLocale]);

  if (error == 404) {
    return <ErrorPage />;
  }

  if (!product) {
    return <Loading />;
  }

  const products = [
    {
      id: 1,
      name: "Nom de service",
      price: "29,00€",
      imgSrc: "https://via.placeholder.com/370x300",
      label: "Nouveau",
    },
    {
      id: 2,
      name: "Nom de service",
      price: "29,00€",
      imgSrc: "https://via.placeholder.com/370x300",
      label: "Rupture",
    },
    {
      id: 3,
      name: "Nom de service",
      price: "29,00€",
      imgSrc: "https://via.placeholder.com/370x300",
      label: "-30%",
    },
    {
      id: 4,
      name: "Nom de service",
      price: "29,00€",
      imgSrc: "https://via.placeholder.com/370x300",
    },
    {
      id: 5,
      name: "Nom de service",
      price: "29,00€",
      imgSrc: "https://via.placeholder.com/370x300",
    },
    {
      id: 6,
      name: "Nom de service",
      price: "29,00€",
      imgSrc: "https://via.placeholder.com/370x300",
      label: "Nouveau",
    },
  ];

  return (
    <>
      <Navbar />
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
                          <img
                            src="https://via.placeholder.com/570x520"
                            alt="#"
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  <div className="product-des">
                    <div className="short">
                      <h2>{product.name}</h2>
                      <p className="price">
                        <span className="discount">{product.price.toString().replace('.', ',')}€</span>
                        {/* <s>80,00€</s> */}
                      </p>
                      <p className="description">
                        {product.description}
                      </p>
                    </div>
                    <div className="product-buy">
                      <div className="add-to-cart">
                        <a href="#" className="btn">
                          {t("product.tryNow")}
                        </a>
                        <a href="#" className="btn min">
                          <FontAwesomeIcon icon={faCartShopping} />
                        </a>
                      </div>
                      <p dangerouslySetInnerHTML={{ __html: product.caracteristic }}></p>
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
                  <div
                    className="col-xl-4 col-lg-4 col-md-4 col-12"
                    key={product.id}
                  >
                    <SingleProduct {...product} />
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

export default Product;
