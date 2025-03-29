
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedCategories from '@/components/FeaturedCategories';
import RecipesGrid from '@/components/RecipesGrid';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedCategories />
      <RecipesGrid />
      <Footer />
    </div>
  );
};

export default Index;
