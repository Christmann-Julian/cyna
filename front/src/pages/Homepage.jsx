import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductList from '../components/ProductList'
import HeroSlider from '../components/HeroSlider'
import '../assets/css/category-section.css'
import { useTranslation } from 'react-i18next'
const Homepage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Navbar /> 
      <HeroSlider />
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
              <p className="mx-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid quo, dolores labore vel dolorum, 
                quibusdam optio fugiat, atque velit dignissimos deserunt illum vero corporis quaerat culpa numquam eligendi...
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid quo, dolores labore vel dolorum, 
                quibusdam optio fugiat, atque velit dignissimos deserunt illum vero corporis quaerat culpa numquam eligendi...
              </p>
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
                <img src="https://via.placeholder.com/850x530" alt="Promo" />
                <div className="inner">
                  <h4 className="title">Les megas promos: <span>50%</span> ce mois ci</h4>
                  <div className="button">
                    <a href="#" className="btn">Voir plus</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-12">
              <div className="small-content">
                <img src="https://via.placeholder.com/450x300" alt="SOC 2024" />
                <div className="inner">
                  <h4 className="title">Les SOC pour <br /> 2024</h4>
                  <div className="button">
                    <a href="#" className="btn">Voir plus</a>
                  </div>
                </div>
              </div>
              <div className="small-content">
                <img src="https://via.placeholder.com/450x300" alt="Collection EDR" />
                <div className="inner">
                  <h4 className="title">Notre collection <br /> EDR</h4>
                  <div className="button">
                    <a href="#" className="btn">Voir plus</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductList />
      <Footer />
    </>
  )
}

export default Homepage
