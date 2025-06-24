import React from 'react';
import Hero from "../components/Home/Hero";
import RecentlyAdded from "../components/Home/RecentlyAdded";
import HeroSection from "../components/HeroSection";

const Home = () => {
  return (
    <div className="bg-zinc-900 text-yellow-50">
      {/* Fullscreen Hero Section */}
      <HeroSection />

      {/* Full-width Hero section (next) */}
      <div className="w-full">
        <Hero />
      </div>

      {/* Recently Added with padding */}
      <div className="px-10 py-8">
        <RecentlyAdded />
      </div>
    </div>
  );
};

export default Home;
