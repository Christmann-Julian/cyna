import React, { useState, useEffect, useRef } from 'react';
import '../assets/css/hero-slider.css';

function HeroSlider({slides}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const startCarousel = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
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
    setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
    resetCarouselInterval();
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
    resetCarouselInterval();
  };

  return (
    <section className="hero-slider">
      <div className="slider-container" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <div className="slide" key={index}>
            <img src={slide.url_image} alt="Slide" />
            <div className="text-inner">
              <h1><span>{slide.title}</span></h1>
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
