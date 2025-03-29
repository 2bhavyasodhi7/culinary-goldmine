
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, ArrowUp } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo & Tagline */}
          <div>
            <h2 className="text-3xl font-playfair font-bold gold-text mb-4">SavorySpoon</h2>
            <p className="text-gray-300 mb-4">Discover the art of gourmet cooking with our curated recipes that blend tradition with innovation.</p>
            <div className="flex space-x-4">
              <a href="#" className="gold-icon">
                <Instagram size={24} />
              </a>
              <a href="#" className="gold-icon">
                <Facebook size={24} />
              </a>
              <a href="#" className="gold-icon">
                <Twitter size={24} />
              </a>
            </div>
          </div>
          
          {/* Column 2: Popular Categories */}
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4 border-b border-gold pb-2">Popular Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/recipes/indian" className="text-gray-300 hover:text-gold transition-colors">Indian Cuisine</Link></li>
              <li><Link to="/recipes/italian" className="text-gray-300 hover:text-gold transition-colors">Italian Dishes</Link></li>
              <li><Link to="/recipes/desserts" className="text-gray-300 hover:text-gold transition-colors">Desserts</Link></li>
              <li><Link to="/recipes/quick-meals" className="text-gray-300 hover:text-gold transition-colors">30-Minute Meals</Link></li>
              <li><Link to="/recipes/vegetarian" className="text-gray-300 hover:text-gold transition-colors">Vegetarian</Link></li>
            </ul>
          </div>
          
          {/* Column 3: About Us */}
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4 border-b border-gold pb-2">About Us</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-gold transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-gold transition-colors">Contact</Link></li>
              <li><Link to="/careers" className="text-gray-300 hover:text-gold transition-colors">Careers</Link></li>
              <li><Link to="/press" className="text-gray-300 hover:text-gold transition-colors">Press</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-gold transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4 border-b border-gold pb-2">Join Our Newsletter</h3>
            <p className="text-gray-300 mb-4">Subscribe for exclusive recipes and cooking tips delivered to your inbox.</p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-gray-800 border-gray-700 text-white" 
              />
              <Button className="bg-gold hover:bg-gold-accent text-dark">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        {/* Social Proof Section */}
        <div className="mt-12 mb-6">
          <h4 className="text-center text-sm text-gray-400 mb-4">AS FEATURED IN</h4>
          <div className="flex flex-wrap justify-center gap-6 opacity-70">
            <div className="w-24 h-12 bg-gray-800 flex items-center justify-center rounded">
              <span className="text-gold font-playfair">Food & Wine</span>
            </div>
            <div className="w-24 h-12 bg-gray-800 flex items-center justify-center rounded">
              <span className="text-gold font-playfair">Bon Appétit</span>
            </div>
            <div className="w-24 h-12 bg-gray-800 flex items-center justify-center rounded">
              <span className="text-gold font-playfair">Saveur</span>
            </div>
            <div className="w-24 h-12 bg-gray-800 flex items-center justify-center rounded">
              <span className="text-gold font-playfair">Epicurious</span>
            </div>
          </div>
        </div>
        
        {/* Copyright & Legal */}
        <div className="pt-6 mt-6 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} SavorySpoon. All rights reserved.</p>
          <div className="mt-2">
            <Link to="/terms" className="hover:text-gold">Terms of Service</Link>
            <span className="mx-2">|</span>
            <Link to="/privacy" className="hover:text-gold">Privacy Policy</Link>
            <span className="mx-2">|</span>
            <Link to="/sitemap" className="hover:text-gold">Sitemap</Link>
          </div>
        </div>
      </div>
      
      {/* Back to Top Button */}
      <button 
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-gold text-dark p-2 rounded-full shadow-lg hover:bg-gold-accent transition-all hover:-translate-y-1"
      >
        <ArrowUp size={24} />
      </button>
    </footer>
  );
};

export default Footer;
