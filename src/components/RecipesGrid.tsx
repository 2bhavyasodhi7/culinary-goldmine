
import React, { useState } from 'react';
import RecipeCard from './RecipeCard';
import { Button } from "@/components/ui/button";
import { recipes } from '@/data/recipes';

// Convert recipes object to array
const allRecipes = Object.entries(recipes).map(([slug, recipe]) => ({
  id: slug,
  title: recipe.title,
  image: recipe.heroImage,
  prepTime: recipe.prepTime,
  rating: recipe.rating,
  tags: recipe.tags,
  slug: slug
}));

const RecipesGrid = () => {
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  
  const visibleRecipes = allRecipes.slice(0, visibleCount);
  
  const loadMore = () => {
    setLoading(true);
    
    // Simulate loading more recipes
    setTimeout(() => {
      setVisibleCount(prevCount => Math.min(prevCount + 3, allRecipes.length));
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
        
        {visibleCount < allRecipes.length && (
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
