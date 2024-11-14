// src/components/HeroSlider.js
import React, { useState, useEffect } from 'react';
import '../assets/css/hero-slider.css';
import Bureau from '../assets/img/bureau.jpg';
import Clock from '../assets/img/clock.jpg';
import Travail from '../assets/img/Travail.jpg';

function HeroSlider() {
  const images = [
    { src: Bureau, caption: "Service de XDR - Promo de 50%" },
    { src: Clock, caption: "Service de SOC - Promo de 30%" },
    { src: Travail, caption: "Service de EDR - Nouveau" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <section className="hero-slider">
      <div className="single-slider">
        <img src={images[currentIndex].src} alt="Slide" />
        <div className="text-inner">
          <h1>{images[currentIndex].caption}</h1>
        </div>
        <button className="carousel-control prev" onClick={goToPrevious}>&#10094;</button>
        <button className="carousel-control next" onClick={goToNext}>&#10095;</button>
      </div>
    </section>
  );
}

export default HeroSlider;
