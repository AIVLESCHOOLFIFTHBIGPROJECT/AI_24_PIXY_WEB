import React from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import GallerySection from '../components/GallerySection';
import FeaturesSection from '../components/FeaturesSection';
import Footer from '../components/Footer';
import Header from '../components/Header';

const HomePage = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <ServicesSection />
      <GallerySection />
      <FeaturesSection />
      <Footer />
    </>
  );
};

export default HomePage;