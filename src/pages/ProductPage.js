import React from 'react';
import BannerSection from '../components/product/BannerSection';
import CustomLLMSection from '../components/product/CustomLLMSection';
import SalesSection from '../components/product/SalesSection';
import CCTVSection from '../components/product/CCTVSection';
import Footer from '../components/Footer';
import Header from '../components/Header';

const ProductPage = () => {
  return (
    <>
      <Header />
      <BannerSection />
      <CustomLLMSection />
      <SalesSection />
      <CCTVSection />
      <Footer />
    </>
  );
};

export default ProductPage;