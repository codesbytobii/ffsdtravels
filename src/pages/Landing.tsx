import Navbar from "@/components/components/navbar/Navbar";
import AboutUs from "./about/AboutUs";
import Header from "./header/Header";
import BestOffer from "./offer/BestOffer";
import Reviews from "./reviews/Reviews";
import TravelTips from "./tips/TravelTips";
import React from "react";
import Footer from "@/components/components/footer/Footer";

const Landing: React.FC = () => {
  return (
    <>
      <Navbar />
      <Header />
      <BestOffer />
      <AboutUs />
      <Reviews />
      <TravelTips />
      <Footer />
    </>
  );
};

export default Landing;
