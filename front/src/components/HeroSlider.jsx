// src/components/HeroSlider.js
import React from 'react';
import '../assets/css/hero-slider.css';


const HeroSlider = () => {
  return (
    <section className="hero-slider">
      <div className="single-slider">
        <img src="https://via.placeholder.com/1900x700" alt="#" />
        <div className="container">
          <div className="row no-gutters">
            <div className="col-lg-9 offset-lg-3 col-12">
              <div className="text-inner">
                <div className="row">
                  <div className="col-lg-7 col-12">
                    <div className="hero-text">
                      <h1><span>PROMO DE 50% SUR </span>Service de XDR</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSlider;
