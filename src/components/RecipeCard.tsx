
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Bookmark, BookmarkCheck } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

interface RecipeCardProps {
  id: string;
  title: string;
  image: string;
  prepTime: string;
  rating: number;
  tags: string[];
  slug: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  id,
  title,
  image,
  prepTime,
  rating,
  tags,
  slug
}) => {
  const [saved, setSaved] = useState(false);
  const { toast } = useToast();
  
  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setSaved(!saved);
    
    toast({
      title: saved ? "Recipe removed from favorites" : "Recipe saved to favorites",
      description: saved ? "You can add it back anytime." : "View all your saved recipes in your profile.",
      duration: 3000,
    });
  };
  
  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="text-gold">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-gold">★</span>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
    }
    
    return stars;
  };
  
  return (
    <Link to={`/recipe/${slug}`} className="block">
      <div className="gold-card group">
        {/* Image Container */}
        <div className="relative overflow-hidden h-56">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Prep Time Badge */}
          <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-medium flex items-center">
            <Clock size={14} className="mr-1 text-gold" />
            {prepTime}
          </div>
          
          {/* Tags */}
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <Badge 
                key={index} 
                className={`text-xs font-bold ${
                  tag === 'Vegan' ? 'bg-green-500' : 
                  tag === 'Keto' ? 'bg-purple-500' : 
                  'bg-gold'
                } text-white`}
              >
                {tag}
              </Badge>
            ))}
          </div>
          
          {/* Quick View Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-dark bg-opacity-70 px-4 py-2 rounded-full text-white text-sm font-medium">
              See Recipe
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold line-clamp-2 font-playfair">{title}</h3>
            <button 
              onClick={handleSave}
              className="text-gold hover:scale-110 transition-transform"
            >
              {saved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
            </button>
          </div>
          
          <div className="flex items-center mt-2 text-lg">
            {renderRatingStars(rating)}
            <span className="ml-1 text-sm text-gray-500">
              ({rating.toFixed(1)})
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
