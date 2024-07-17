import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import FeaturesSection from '../components/home/FeaturesSection';
import Footer from '../components/Footer';
import Header from '../components/Header';

const HomePage = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <ServicesSection />
      <FeaturesSection />
      <Footer />
    </>
  );
};

export default HomePage;