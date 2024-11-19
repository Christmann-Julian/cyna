import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../assets/css/loading.css";

const Loading = () => {
  return (
    <>
      <Navbar />
      <section className="loading-container">
        <div role="status" className="loading">
          <div className="spinner"></div>
          <span className="sr-only">Loading...</span>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Loading;
