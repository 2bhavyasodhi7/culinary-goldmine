
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Menu, ChevronDown, Instagram, Facebook, Twitter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="w-full">
      {/* Announcement Bar */}
      <div className="bg-gold text-dark py-2 px-4 text-center font-medium">
        🎉 New: 30-Minute Meals Collection! Try our new recipes today!
      </div>
      
      {/* Main Header */}
      <div className={`bg-white transition-all duration-300 ${isScrolled ? 'py-2 shadow-md' : 'py-4'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className={`transition-all duration-300 ${isScrolled ? 'w-32' : 'w-44'}`}>
                <h1 className="text-3xl font-playfair font-bold gold-text">SavorySpoon</h1>
                <p className="text-xs text-gold-light italic">Epicurean Excellence</p>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="gold-underline font-medium">Home</Link>
              <Link to="/recipes" className="gold-underline font-medium">Recipes</Link>
              <Link to="/meal-plans" className="gold-underline font-medium">Meal Plans</Link>
              <Link to="/techniques" className="gold-underline font-medium">Techniques</Link>
              <Link to="/about" className="gold-underline font-medium">About</Link>
              <Link to="/contact" className="gold-underline font-medium">Contact</Link>
            </nav>
            
            {/* Search, User, Language */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative w-72">
                <Input 
                  type="text" 
                  placeholder="Search recipes..." 
                  className="pr-10 gold-input" 
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gold" size={18} />
              </div>
              
              <div className="flex items-center space-x-3">
                <a href="#" className="gold-icon">
                  <Instagram size={20} />
                </a>
                <a href="#" className="gold-icon">
                  <Facebook size={20} />
                </a>
                <a href="#" className="gold-icon">
                  <Twitter size={20} />
                </a>
              </div>
              
              <div className="relative">
                <Button variant="ghost" className="flex items-center space-x-1 gold-icon">
                  <User size={20} />
                  <ChevronDown size={16} />
                </Button>
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-dark p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
          
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 animate-fade-in">
              <nav className="flex flex-col space-y-4">
                <Link to="/" className="gold-underline font-medium">Home</Link>
                <Link to="/recipes" className="gold-underline font-medium">Recipes</Link>
                <Link to="/meal-plans" className="gold-underline font-medium">Meal Plans</Link>
                <Link to="/techniques" className="gold-underline font-medium">Techniques</Link>
                <Link to="/about" className="gold-underline font-medium">About</Link>
                <Link to="/contact" className="gold-underline font-medium">Contact</Link>
                
                <div className="pt-2">
                  <Input 
                    type="text" 
                    placeholder="Search recipes..." 
                    className="gold-input" 
                  />
                </div>
                
                <div className="flex items-center space-x-4 pt-2">
                  <a href="#" className="gold-icon">
                    <Instagram size={20} />
                  </a>
                  <a href="#" className="gold-icon">
                    <Facebook size={20} />
                  </a>
                  <a href="#" className="gold-icon">
                    <Twitter size={20} />
                  </a>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
