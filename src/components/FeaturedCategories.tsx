
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const categories = [
  {
    title: "Breakfast",
    image: "https://images.unsplash.com/photo-1482938289607-e212871fec22?auto=format&fit=crop&w=600&h=400&q=80",
    count: 24,
    link: "/recipes/breakfast"
  },
  {
    title: "Lunch",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=600&h=400&q=80",
    count: 18,
    link: "/recipes/lunch"
  },
  {
    title: "Dinner",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&h=400&q=80",
    count: 32,
    link: "/recipes/dinner"
  },
  {
    title: "Desserts",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&h=400&q=80",
    count: 16,
    link: "/recipes/desserts"
  }
];

const FeaturedCategories = () => {
  return (
    <section id="featured-categories" className="py-16 px-4 bg-ivory">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-cormorant font-bold mb-3">Explore Our Collections</h2>
          <div className="gold-divider mx-auto max-w-xs"></div>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Discover our curated categories of exquisite recipes, each crafted to perfection with the finest ingredients.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-lg shadow-lg h-80 cursor-pointer"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${category.image})` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-playfair font-bold mb-2">{category.title}</h3>
                <p className="text-sm font-medium mb-4">{category.count} Recipes</p>
                <div className="transform translate-y-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <Button 
                    asChild
                    className="bg-gold hover:bg-gold-accent text-dark"
                  >
                    <Link to={category.link}>Explore</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            variant="outline"
            asChild
            className="border-2 border-gold text-gold hover:bg-gold hover:text-dark px-6 py-2 font-medium"
          >
            <Link to="/recipes">View All Categories</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
