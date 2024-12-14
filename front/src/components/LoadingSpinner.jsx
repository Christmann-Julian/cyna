import React from 'react'
import "../assets/css/loading.css";

const LoadingSpinner = () => {
  return (
    <section className="loading-container">
        <div role="status" className="loading">
          <div className="spinner"></div>
          <span className="sr-only">Loading...</span>
        </div>
    </section>
  )
}

export default LoadingSpinner