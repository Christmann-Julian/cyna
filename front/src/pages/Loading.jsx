import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';

const Loading = () => {
  return (
    <>
      <Navbar />
      <LoadingSpinner />
      <Footer />
    </>
  );
};

export default Loading;
