
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RecipeCard from '@/components/RecipeCard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Search, Filter } from 'lucide-react';
import { recipes } from '@/data/recipes';

// Create array from recipes object
const allRecipes = Object.entries(recipes).map(([slug, recipe]) => ({
  id: slug,
  title: recipe.title,
  image: recipe.heroImage,
  prepTime: recipe.prepTime,
  rating: recipe.rating,
  tags: recipe.tags,
  slug: slug,
  category: recipe.category
}));

// Dietary filter options
const dietaryFilters = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "non-veg", label: "Non-Vegetarian" },
  { id: "gluten-free", label: "Gluten-Free" },
  { id: "dairy-free", label: "Dairy-Free" }
];

// Time filter options
const timeFilters = [
  { id: "quick", label: "Quick (< 30 min)" },
  { id: "medium", label: "Medium (30-45 min)" },
  { id: "slow", label: "Slow (> 45 min)" }
];

// Category options
const categories = [
  { id: "all", label: "All Recipes" },
  { id: "indian", label: "Indian" },
  { id: "italian", label: "Italian" },
  { id: "chinese", label: "Chinese" },
  { id: "desserts", label: "Desserts" },
  { id: "breakfast", label: "Breakfast" }
];

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter recipes based on search and filters
  const filteredRecipes = allRecipes.filter(recipe => {
    // Search filter
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = selectedCategory === "all" || recipe.category.toLowerCase() === selectedCategory;
    
    // Dietary filter
    const matchesDietary = selectedDietary.length === 0 || 
      selectedDietary.some(diet => {
        const lowerDiet = diet.toLowerCase();
        return recipe.tags.some(tag => tag.toLowerCase() === lowerDiet);
      });
    
    // Time filter
    const matchesTime = selectedTime.length === 0 || 
      selectedTime.some(time => {
        const prepTimeText = recipe.prepTime.split(' ')[0];
        const prepTimeMinutes = parseInt(prepTimeText);
        
        if (time === 'quick') return prepTimeMinutes < 30;
        if (time === 'medium') return prepTimeMinutes >= 30 && prepTimeMinutes <= 45;
        if (time === 'slow') return prepTimeMinutes > 45;
        return false;
      });
    
    return matchesSearch && matchesCategory && matchesDietary && matchesTime;
  });
  
  const toggleDietaryFilter = (dietId: string) => {
    setSelectedDietary(prev => 
      prev.includes(dietId) 
        ? prev.filter(id => id !== dietId) 
        : [...prev, dietId]
    );
  };
  
  const toggleTimeFilter = (timeId: string) => {
    setSelectedTime(prev => 
      prev.includes(timeId) 
        ? prev.filter(id => id !== timeId) 
        : [...prev, timeId]
    );
  };
  
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedDietary([]);
    setSelectedTime([]);
  };
  
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1482938289607-e212871fec22?auto=format&fit=crop&w=1920&q=80)" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6">
            Explore Our Recipes
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Discover our collection of meticulously crafted recipes, from authentic Indian curries to global cuisines.
          </p>
          <div className="max-w-xl mx-auto relative">
            <Input 
              type="text" 
              placeholder="Search for recipes..." 
              className="h-12 pl-12 bg-white bg-opacity-90 text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark" size={20} />
          </div>
        </div>
      </section>
      
      {/* Filters & Recipe Grid */}
      <section className="py-12 px-4 bg-ivory">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="md:w-1/4">
              <div className="sticky top-24 bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-playfair font-bold">Filters</h2>
                  <button 
                    onClick={clearFilters}
                    className="text-gold text-sm hover:underline"
                  >
                    Clear All
                  </button>
                </div>
                
                {/* Mobile Filter Toggle */}
                <div className="md:hidden mb-4">
                  <Button 
                    onClick={() => setShowFilters(!showFilters)}
                    variant="outline"
                    className="w-full border-gold text-gold flex items-center gap-2"
                  >
                    <Filter size={16} />
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                  </Button>
                </div>
                
                <div className={`space-y-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
                  {/* Categories */}
                  <div>
                    <h3 className="font-semibold mb-3 text-lg border-b border-gold-light pb-2">Categories</h3>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <div key={category.id} className="flex items-center">
                          <input 
                            type="radio"
                            id={`category-${category.id}`}
                            name="category"
                            checked={selectedCategory === category.id}
                            onChange={() => setSelectedCategory(category.id)}
                            className="mr-2 text-gold"
                          />
                          <label 
                            htmlFor={`category-${category.id}`}
                            className="cursor-pointer"
                          >
                            {category.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Dietary Preferences */}
                  <div>
                    <h3 className="font-semibold mb-3 text-lg border-b border-gold-light pb-2">Dietary Preferences</h3>
                    <div className="space-y-2">
                      {dietaryFilters.map(diet => (
                        <div key={diet.id} className="flex items-center">
                          <input 
                            type="checkbox"
                            id={`diet-${diet.id}`}
                            checked={selectedDietary.includes(diet.id)}
                            onChange={() => toggleDietaryFilter(diet.id)}
                            className="mr-2 text-gold"
                          />
                          <label 
                            htmlFor={`diet-${diet.id}`}
                            className="cursor-pointer"
                          >
                            {diet.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Preparation Time */}
                  <div>
                    <h3 className="font-semibold mb-3 text-lg border-b border-gold-light pb-2">Preparation Time</h3>
                    <div className="space-y-2">
                      {timeFilters.map(time => (
                        <div key={time.id} className="flex items-center">
                          <input 
                            type="checkbox"
                            id={`time-${time.id}`}
                            checked={selectedTime.includes(time.id)}
                            onChange={() => toggleTimeFilter(time.id)}
                            className="mr-2 text-gold"
                          />
                          <label 
                            htmlFor={`time-${time.id}`}
                            className="cursor-pointer"
                          >
                            {time.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recipe Grid */}
            <div className="md:w-3/4">
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-playfair font-bold">
                  {filteredRecipes.length} Recipe{filteredRecipes.length !== 1 ? 's' : ''} Found
                </h2>
                <div className="text-sm text-gray-500">
                  Sort by: 
                  <select className="ml-2 border-gold-light p-1 rounded focus:outline-none focus:ring-gold">
                    <option>Most Popular</option>
                    <option>Newest</option>
                    <option>Prep Time (Low to High)</option>
                    <option>Rating (High to Low)</option>
                  </select>
                </div>
              </div>
              
              {filteredRecipes.length === 0 ? (
                <div className="bg-white p-8 rounded-lg text-center">
                  <h3 className="text-xl font-medium mb-2">No recipes found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters or search term to find what you're looking for.
                  </p>
                  <Button onClick={clearFilters} className="bg-gold hover:bg-gold-accent text-dark">
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRecipes.map(recipe => (
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
              )}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Recipes;
