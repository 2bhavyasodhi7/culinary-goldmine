
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Printer, Heart, Bookmark, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { recipes } from '@/data/recipes';

const RecipeDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [servings, setServings] = useState(4);
  const [saved, setSaved] = useState(false);
  const recipe = recipes[slug as keyof typeof recipes];
  
  // Redirect to recipes page if the recipe doesn't exist
  useEffect(() => {
    if (!recipe && slug) {
      navigate('/recipes');
    }
  }, [recipe, slug, navigate]);
  
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
            <Link to="/recipes" className="hover:text-gold">{recipe.category}</Link>
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
              <span>Cook: {recipe.cookTime || "20 min"}</span>
            </div>
            <div className="flex items-center">
              <Users size={20} className="mr-2 text-gold" />
              <span>Serves: {recipe.servings || 4}</span>
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
                        <span>{recipe.nutrition?.calories || 320}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="font-medium">Total Fat</span>
                        <span>{recipe.nutrition?.fat || 24}g</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="font-medium">Total Carbohydrates</span>
                        <span>{recipe.nutrition?.carbs || 14}g</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="font-medium">Protein</span>
                        <span>{recipe.nutrition?.protein || 17}g</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="font-medium">Sodium</span>
                        <span>{recipe.nutrition?.sodium || 580}mg</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="font-medium">Dietary Fiber</span>
                        <span>{recipe.nutrition?.fiber || 2}g</span>
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
                      <h4 className="text-lg font-semibold mb-2">Perfect Preparation</h4>
                      <p className="text-gray-700">
                        {recipe.tips?.[0] || "For the best texture, prepare ingredients ahead of time and follow the recipe closely for authentic flavors."}
                      </p>
                    </div>
                    <div className="bg-ivory p-6 rounded-lg border-l-4 border-gold">
                      <h4 className="text-lg font-semibold mb-2">Rich Flavors</h4>
                      <p className="text-gray-700">
                        {recipe.tips?.[1] || "The key to a flavorful dish is to allow spices to bloom in hot oil before adding other ingredients."}
                      </p>
                    </div>
                    <div className="bg-ivory p-6 rounded-lg border-l-4 border-gold">
                      <h4 className="text-lg font-semibold mb-2">Spice Balance</h4>
                      <p className="text-gray-700">
                        {recipe.tips?.[2] || "For a milder version, reduce the red chili powder and add a tablespoon of honey to balance the flavors. This makes it perfect for those who prefer less heat but still want all the rich flavors."}
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
