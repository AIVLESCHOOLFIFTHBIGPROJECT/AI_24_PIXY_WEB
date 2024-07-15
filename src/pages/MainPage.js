import React from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import GallerySection from '../components/GallerySection';
import FeaturesSection from '../components/FeaturesSection';
import Footer from '../components/Footer';

const MainPage = () => {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <GallerySection />
      <FeaturesSection />
      <Footer />
    </>
  );
};

export default MainPage;