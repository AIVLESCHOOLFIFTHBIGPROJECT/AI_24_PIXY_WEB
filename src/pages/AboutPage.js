import React from 'react';
import BannerSection from '../components/about/BannerSection';
import CompanySection from '../components/about/CompanySection';
import VisionMissionSection from '../components/about/VisionMissionSection';
import TeamSection from '../components/about/TeamSection';
import Footer from '../components/Footer';
import Header from '../components/Header';

const AboutPage = () => {
  return (
    <>
      <Header />
      <BannerSection />
      <CompanySection />
      <VisionMissionSection />
      <TeamSection />
      <Footer />
    </>
  );
};

export default AboutPage;