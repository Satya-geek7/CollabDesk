import React from "react";
import Navbar from "../../Components/ui/LandingPageCpmnts/Navbar";
import Hero from "../../Components/ui/LandingPageCpmnts/Hero";
import Features from "../../Components/ui/LandingPageCpmnts/Features";
import Testimonials from "../../Components/ui/LandingPageCpmnts/testimonial";
import CTA from "../../Components/ui/LandingPageCpmnts/CTA";
import Footer from "../../Components/ui/LandingPageCpmnts/Footer";
import HowItWorks from "../../Components/ui/LandingPageCpmnts/HowitWorks";
import TrustedBy from "../../Components/ui/LandingPageCpmnts/TrustedBy";
import FAQ from "../../Components/ui/LandingPageCpmnts/FAQ";
import Pricing from "../../Components/ui/LandingPageCpmnts/Pricing";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <TrustedBy />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
};

export default LandingPage;
