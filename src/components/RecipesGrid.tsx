
import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import { Button } from "@/components/ui/button";

// Sample recipe data
const sampleRecipes = [
  {
    id: "1",
    title: "Paneer Butter Masala",
    image: "https://images.unsplash.com/photo-1482938289607-e212871fec22?auto=format&fit=crop&w=600&h=400&q=80",
    prepTime: "35 min",
    rating: 4.8,
    tags: ["Vegetarian", "Indian"],
    slug: "paneer-butter-masala"
  },
  {
    id: "2",
    title: "Chole (Chickpea Curry)",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=600&h=400&q=80",
    prepTime: "45 min",
    rating: 4.6,
    tags: ["Vegan", "Indian"],
    slug: "chole-chickpea-curry"
  },
  {
    id: "3",
    title: "Dal Makhani",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&h=400&q=80",
    prepTime: "50 min",
    rating: 4.9,
    tags: ["Vegetarian", "Indian"],
    slug: "dal-makhani"
  },
  {
    id: "4",
    title: "Aloo Gobi (Potato & Cauliflower Curry)",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&h=400&q=80",
    prepTime: "30 min",
    rating: 4.5,
    tags: ["Vegan", "Indian"],
    slug: "aloo-gobi"
  },
  {
    id: "5",
    title: "Bhindi Masala (Spiced Okra Stir-Fry)",
    image: "https://images.unsplash.com/photo-1486718448742-163732cd1544?auto=format&fit=crop&w=600&h=400&q=80",
    prepTime: "25 min",
    rating: 4.3,
    tags: ["Vegan", "Indian"],
    slug: "bhindi-masala"
  },
  {
    id: "6",
    title: "Chicken Curry (Desi Dhaba Style)",
    image: "https://images.unsplash.com/photo-1482938289607-e212871fec22?auto=format&fit=crop&w=600&h=400&q=80",
    prepTime: "40 min",
    rating: 4.7,
    tags: ["Non-Veg", "Indian"],
    slug: "chicken-curry"
  }
];

const RecipesGrid = () => {
  const [loading, setLoading] = useState(false);
  const [visibleRecipes, setVisibleRecipes] = useState(sampleRecipes.slice(0, 6));
  
  const loadMore = () => {
    setLoading(true);
    
    // Simulate loading more recipes
    setTimeout(() => {
      setVisibleRecipes(sampleRecipes);
      setLoading(false);
    }, 1000);
  };
  
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-cormorant font-bold mb-3">Featured Recipes</h2>
          <div className="gold-divider mx-auto max-w-xs"></div>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Discover our collection of premium recipes, carefully curated to bring exquisite flavors to your table.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleRecipes.map((recipe) => (
            <RecipeCard 
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              image={recipe.image}
              prepTime={recipe.prepTime}
              rating={recipe.rating}
              tags={recipe.tags}
              slug={recipe.slug}
            />
          ))}
        </div>
        
        {visibleRecipes.length < sampleRecipes.length && (
          <div className="text-center mt-12">
            <Button 
              onClick={loadMore}
              className="bg-gold hover:bg-gold-accent text-dark px-6 py-3"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load More Recipes'}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecipesGrid;
