import React, { useState, useEffect, useRef } from 'react';
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
  const intervalRef = useRef(null);

  const startCarousel = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 5000); 
  };

  useEffect(() => {
    startCarousel(); 
    return () => clearInterval(intervalRef.current); 
  }, []);

  const resetCarouselInterval = () => {
    clearInterval(intervalRef.current); 
    startCarousel(); 
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
    resetCarouselInterval();
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
    resetCarouselInterval();
  };

  return (
    <section className="hero-slider">
      <div className="slider-container" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div className="slide" key={index}>
            <img src={image.src} alt="Slide" />
            <div className="text-inner">
              <h1><span>{image.caption}</span></h1>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control prev" onClick={goToPrevious}>&#10094;</button>
      <button className="carousel-control next" onClick={goToNext}>&#10095;</button>
    </section>
  );
}

export default HeroSlider;
