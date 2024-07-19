import React from 'react';
import BannerSection from '../components/contact/BannerSection';
import ServicesSection from '../components/home/ServicesSection';
import FeaturesSection from '../components/home/FeaturesSection';
import SignUpButton from '../components/home/SignUpButton';
import Footer from '../components/Footer';
import Header from '../components/Header';

const ContactPage = () => {
  return (
    <>
      <Header />
      <BannerSection />
      <ServicesSection />
      <FeaturesSection />
      <SignUpButton />
      <Footer />
    </>
  );
};

export default ContactPage;