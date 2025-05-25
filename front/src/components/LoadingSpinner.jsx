import React from 'react'
import "../assets/css/loading.css";

const LoadingSpinner = ({height}) => {
  return (
    <section className="loading-container" style={{ height: height || 'calc(100vh - 350px)' }}>
        <div role="status" className="loading">
          <div className="spinner"></div>
          <span className="sr-only">Loading...</span>
        </div>
    </section>
  )
}

export default LoadingSpinner