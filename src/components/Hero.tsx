
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown, Clock } from 'lucide-react';

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1482938289607-e212871fec22?auto=format&fit=crop&w=1920&q=80",
    title: "Weeknight Pasta Perfection",
    subtitle: "Ready in just 30 minutes",
    buttonText: "Get Recipe"
  },
  {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80",
    title: "5-Ingredient Meals",
    subtitle: "Simplicity meets extraordinary flavor",
    buttonText: "Explore Collection"
  },
  {
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=1920&q=80",
    title: "Seasonal Specials",
    subtitle: "Fresh, vibrant & healthy",
    buttonText: "Discover Now"
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleScrollDown = () => {
    const featuredSection = document.getElementById('featured-categories');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-[80vh] overflow-hidden">
      {/* Carousel */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div 
              className="absolute inset-0 bg-center bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
        <div className="bg-black bg-opacity-20 backdrop-blur-sm p-8 rounded-lg max-w-3xl animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-cormorant font-bold mb-4">
            {heroSlides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl mb-6 font-playfair">
            {heroSlides[currentSlide].subtitle}
          </p>
          <Button 
            className="bg-gold hover:bg-gold-accent text-dark font-medium text-lg px-8 py-3 rounded hover:-translate-y-1 transition-all shadow-lg"
          >
            {heroSlides[currentSlide].buttonText}
          </Button>
        </div>
        
        {/* Search Overlay */}
        <div className="w-full max-w-2xl mt-12 bg-white bg-opacity-95 backdrop-blur-sm rounded-lg p-6 shadow-xl">
          <h3 className="text-dark text-xl font-medium mb-4 font-playfair">What's in your kitchen?</h3>
          <div className="flex gap-2 mb-4">
            <input 
              type="text" 
              placeholder="Enter ingredients..." 
              className="gold-input flex-1"
            />
            <Button className="bg-gold hover:bg-gold-accent text-dark">
              Search
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="gold-badge">Vegan</span>
            <span className="gold-badge bg-opacity-70">Gluten-Free</span>
            <span className="gold-badge bg-opacity-70">Keto</span>
            <span className="gold-badge bg-opacity-70">Quick Meals</span>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <button 
          className="absolute bottom-8 animate-bounce"
          onClick={handleScrollDown}
        >
          <ChevronDown size={36} className="text-gold" />
        </button>
      </div>
      
      {/* Carousel Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? 'w-8 bg-gold' : 'w-2 bg-white bg-opacity-60'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
