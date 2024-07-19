import React from 'react';
import BannerSection from '../components/contact/BannerSection';
import ContactSection from '../components/contact/ContactSection';
import Footer from '../components/Footer';
import Header from '../components/Header';

const ContactPage = () => {
  return (
    <>
      <Header />
      <BannerSection />
      <ContactSection />
      <Footer />
    </>
  );
};

export default ContactPage;