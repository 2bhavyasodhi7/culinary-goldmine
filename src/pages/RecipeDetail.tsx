
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Printer, Heart, Bookmark, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Sample recipe data
const recipes = {
  "paneer-butter-masala": {
    title: "Paneer Butter Masala",
    heroImage: "https://images.unsplash.com/photo-1482938289607-e212871fec22?auto=format&fit=crop&w=1920&q=80",
    prepTime: "15 min",
    cookTime: "20 min",
    servings: 4,
    rating: 4.8,
    description: "A rich and creamy North Indian curry made with paneer (cottage cheese) in a tomato-based sauce, flavored with aromatic spices. This restaurant-style dish is perfect for special occasions.",
    ingredients: [
      "250g paneer (cottage cheese), cubed",
      "1 large onion, finely chopped",
      "2 tomatoes, pureed",
      "1 tbsp ginger-garlic paste",
      "2 tbsp butter",
      "1 tbsp oil",
      "1 tsp cumin seeds",
      "1 tsp red chili powder",
      "1 tsp garam masala",
      "1/2 tsp turmeric powder",
      "1 tsp coriander powder",
      "1/2 cup fresh cream",
      "1 tsp kasuri methi (dried fenugreek leaves)",
      "Salt to taste",
      "Fresh coriander leaves for garnishing"
    ],
    instructions: [
      {
        step: "Fry the Paneer",
        details: "Heat 1 tbsp butter in a pan. Lightly fry paneer cubes until golden brown on the edges. Remove and keep them in warm water (to keep them soft).",
        image: "https://images.unsplash.com/photo-1482938289607-e212871fec22?auto=format&fit=crop&w=600&h=400&q=80"
      },
      {
        step: "Prepare the Gravy",
        details: "In the same pan, add 1 tbsp butter and sauté onions until golden. Add ginger-garlic paste and cook until the raw smell disappears. Pour in the tomato puree and cook for 5 minutes. Add cashew nut paste and stir well. Add red chili powder, turmeric, coriander powder, and salt. Stir and cook until the mixture thickens.",
        image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=600&h=400&q=80"
      },
      {
        step: "Blend the Gravy",
        details: "Cool the mixture slightly and blend it into a smooth paste. Strain to get a silky texture.",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&h=400&q=80"
      },
      {
        step: "Final Cooking",
        details: "Heat the blended gravy in the pan again. Add garam masala, kasuri methi, and fresh cream. Add the fried paneer cubes and simmer for 5 minutes. Serve hot with naan or jeera rice.",
        image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&h=400&q=80"
      }
    ],
    nutrition: {
      calories: 320,
      fat: 24,
      carbs: 14,
      protein: 17,
      sodium: 580,
      fiber: 2
    },
    notes: "For a vegan version, replace paneer with firm tofu and use coconut cream instead of dairy cream. You can also add peas or bell peppers for extra vegetables.",
    tags: ["Vegetarian", "Indian", "Main Course"]
  }
};

const RecipeDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const [servings, setServings] = useState(4);
  const [saved, setSaved] = useState(false);
  const recipe = recipes[slug as keyof typeof recipes];
  
  if (!recipe) {
    return (
      <>
        <Header />
        <div className="py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Recipe Not Found</h1>
          <p className="mb-6">We couldn't find the recipe you're looking for.</p>
          <Button asChild>
            <Link to="/recipes">Browse All Recipes</Link>
          </Button>
        </div>
        <Footer />
      </>
    );
  }
  
  const handleSave = () => {
    setSaved(!saved);
    
    toast({
      title: saved ? "Recipe removed from collection" : "Recipe saved to collection",
      description: saved ? "You can add it back anytime." : "View all your saved recipes in your profile.",
      duration: 3000,
    });
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    
    toast({
      title: "Link copied to clipboard",
      description: "Share this recipe with your friends and family!",
      duration: 3000,
    });
  };
  
  const adjustServings = (amount: number) => {
    const newServings = servings + amount;
    if (newServings >= 1 && newServings <= 12) {
      setServings(newServings);
    }
  };
  
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${recipe.heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        </div>
        
        <div className="relative container mx-auto h-full flex flex-col justify-end pb-12 px-4">
          {/* Breadcrumbs */}
          <div className="text-white mb-4">
            <Link to="/" className="hover:text-gold">Home</Link>
            <span className="mx-2">&gt;</span>
            <Link to="/recipes" className="hover:text-gold">Recipes</Link>
            <span className="mx-2">&gt;</span>
            <Link to="/recipes/indian" className="hover:text-gold">Indian</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-gold">{recipe.title}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-4">
            {recipe.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-white">
            <div className="flex items-center">
              <Clock size={20} className="mr-2 text-gold" />
              <span>Prep: {recipe.prepTime}</span>
            </div>
            <div className="flex items-center">
              <Clock size={20} className="mr-2 text-gold" />
              <span>Cook: {recipe.cookTime}</span>
            </div>
            <div className="flex items-center">
              <Users size={20} className="mr-2 text-gold" />
              <span>Serves: {recipe.servings}</span>
            </div>
            <div className="flex text-xl">
              {Array(5).fill(0).map((_, i) => (
                <span key={i} className={i < Math.floor(recipe.rating) ? "text-gold" : "text-gray-400"}>★</span>
              ))}
              <span className="ml-2 text-sm self-end">{recipe.rating}</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Action Bar */}
      <section className="bg-ivory border-b border-gold-light">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/recipes" className="flex items-center text-gold hover:text-gold-accent">
              <ArrowLeft size={18} className="mr-1" />
              <span>Back to Recipes</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gold rounded overflow-hidden">
                <button 
                  onClick={() => adjustServings(-1)}
                  className="px-3 py-1 bg-gold-light text-dark hover:bg-gold"
                  disabled={servings <= 1}
                >
                  -
                </button>
                <span className="px-3 py-1">
                  {servings} {servings === 1 ? 'Serving' : 'Servings'}
                </span>
                <button 
                  onClick={() => adjustServings(1)}
                  className="px-3 py-1 bg-gold-light text-dark hover:bg-gold"
                  disabled={servings >= 12}
                >
                  +
                </button>
              </div>
              
              <button 
                onClick={handleSave}
                className={`text-gold p-2 rounded-full ${saved ? 'bg-gold-muted' : 'hover:bg-gold-muted'}`}
              >
                <Bookmark size={20} className={saved ? 'fill-gold' : ''} />
              </button>
              
              <button 
                onClick={handleShare}
                className="text-gold p-2 rounded-full hover:bg-gold-muted"
              >
                <Share2 size={20} />
              </button>
              
              <button 
                onClick={handlePrint}
                className="text-gold p-2 rounded-full hover:bg-gold-muted"
              >
                <Printer size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Description */}
            <div className="lg:col-span-3">
              <p className="text-lg text-gray-700 leading-relaxed">
                {recipe.description}
              </p>
              <div className="gold-divider mt-6"></div>
            </div>
            
            {/* Sidebar - Ingredients */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h2 className="text-2xl font-playfair font-bold mb-6 border-b border-gold pb-2">
                  Ingredients
                </h2>
                
                <div className="space-y-4">
                  {recipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-start">
                      <input 
                        type="checkbox" 
                        id={`ingredient-${index}`} 
                        className="mt-1 mr-3 h-4 w-4 text-gold border-gold-light focus:ring-gold"
                      />
                      <label 
                        htmlFor={`ingredient-${index}`}
                        className="text-gray-700 hover:text-gold cursor-pointer"
                      >
                        {ingredient}
                      </label>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-playfair font-semibold mb-4">Recipe Notes</h3>
                  <div className="bg-gold-light bg-opacity-30 p-4 rounded-lg">
                    <p className="text-gray-700">{recipe.notes}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content - Instructions & Tabs */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="instructions">
                <TabsList className="w-full grid grid-cols-4 mb-8">
                  <TabsTrigger value="instructions" className="text-sm md:text-base">Instructions</TabsTrigger>
                  <TabsTrigger value="nutrition" className="text-sm md:text-base">Nutrition</TabsTrigger>
                  <TabsTrigger value="comments" className="text-sm md:text-base">Comments</TabsTrigger>
                  <TabsTrigger value="tips" className="text-sm md:text-base">Tips</TabsTrigger>
                </TabsList>
                
                <TabsContent value="instructions" className="space-y-10">
                  {recipe.instructions.map((instruction, index) => (
                    <div key={index} className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-2/3">
                        <div className="flex items-center mb-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gold text-dark font-bold mr-3">
                            {index + 1}
                          </div>
                          <h3 className="text-xl font-playfair font-semibold">{instruction.step}</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          {instruction.details}
                        </p>
                      </div>
                      <div className="md:w-1/3">
                        <img 
                          src={instruction.image} 
                          alt={instruction.step} 
                          className="w-full h-48 object-cover rounded-lg shadow-md"
                        />
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="nutrition">
                  <h3 className="text-2xl font-playfair font-bold mb-6">Nutrition Information</h3>
                  <div className="border border-gray-200 rounded-lg p-6 max-w-md">
                    <h4 className="text-lg font-semibold mb-4 text-center border-b pb-2">Nutrition Facts</h4>
                    <div className="space-y-2 divide-y">
                      <div className="flex justify-between py-1">
                        <span className="font-medium">Calories</span>
                        <span>{recipe.nutrition.calories}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="font-medium">Total Fat</span>
                        <span>{recipe.nutrition.fat}g</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="font-medium">Total Carbohydrates</span>
                        <span>{recipe.nutrition.carbs}g</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="font-medium">Protein</span>
                        <span>{recipe.nutrition.protein}g</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="font-medium">Sodium</span>
                        <span>{recipe.nutrition.sodium}mg</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="font-medium">Dietary Fiber</span>
                        <span>{recipe.nutrition.fiber}g</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-4">
                      * Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="comments">
                  <h3 className="text-2xl font-playfair font-bold mb-6">Comments</h3>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-500 italic text-center">Be the first to leave a comment on this recipe!</p>
                    <textarea 
                      placeholder="Share your experience with this recipe..."
                      className="mt-4 w-full p-3 border border-gold-light rounded-lg focus:ring-gold focus:border-gold"
                      rows={4}
                    ></textarea>
                    <div className="flex justify-end mt-3">
                      <Button className="bg-gold hover:bg-gold-accent text-dark">
                        Post Comment
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="tips">
                  <h3 className="text-2xl font-playfair font-bold mb-6">Chef's Tips</h3>
                  <div className="space-y-6">
                    <div className="bg-ivory p-6 rounded-lg border-l-4 border-gold">
                      <h4 className="text-lg font-semibold mb-2">Perfect Paneer</h4>
                      <p className="text-gray-700">
                        For the best texture, fry the paneer cubes briefly until just golden on the edges, then immediately place in warm water while you prepare the gravy. This keeps the paneer soft and prevents it from becoming chewy.
                      </p>
                    </div>
                    <div className="bg-ivory p-6 rounded-lg border-l-4 border-gold">
                      <h4 className="text-lg font-semibold mb-2">Rich Gravy</h4>
                      <p className="text-gray-700">
                        The key to a silky smooth gravy is to blend the tomato-onion mixture well and then strain it for a restaurant-style finish. This removes any fibrous bits and creates a luxurious texture.
                      </p>
                    </div>
                    <div className="bg-ivory p-6 rounded-lg border-l-4 border-gold">
                      <h4 className="text-lg font-semibold mb-2">Spice Balance</h4>
                      <p className="text-gray-700">
                        For a milder version, reduce the red chili powder and add a tablespoon of honey to balance the flavors. This makes it perfect for those who prefer less heat but still want all the rich flavors.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default RecipeDetail;
