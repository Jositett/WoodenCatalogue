import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Search, Heart } from "lucide-react";
import SearchDialog from './SearchDialog';
import FavoritesDialog from './FavoritesDialog';
import ThemeToggle from './ThemeToggle';
import { useFavorites } from '@/context/FavoritesContext';

const Header: React.FC = () => {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const { favorites, removeFavorite } = useFavorites();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collections', path: '/#collections' },
    { name: 'Catalogue', path: '/catalogue' },
    { name: 'About', path: '/#about' },
    { name: 'Contact', path: '/#contact' }
  ];

  const scrollToSection = (id: string) => {
    if (location !== '/') {
      return true; // Let the link navigate normally
    }
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      return false; // Prevent default navigation
    }
    return true;
  };

  return (
    <header className="bg-[#F7F3E9] dark:bg-gray-900 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <span className="text-[#7D5A50] dark:text-amber-200 font-playfair text-3xl font-bold">Luxe Doors</span>
        </Link>
        
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => {
            // Extract section ID from path if it's a hash link
            const isHashLink = link.path.includes('#');
            const sectionId = isHashLink ? link.path.split('#')[1] : '';
            
            return (
              <Link 
                key={link.name}
                href={link.path}
                onClick={() => isHashLink ? !scrollToSection(sectionId) : true}
                className="text-[#5C4033] dark:text-amber-100 hover:text-[#7D5A50] dark:hover:text-amber-300 font-medium"
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSearchOpen(true)}
            className="text-[#5C4033] dark:text-amber-200 hover:text-[#7D5A50] dark:hover:text-amber-100"
          >
            <Search className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsFavoritesOpen(true)}
            className="text-[#5C4033] dark:text-amber-200 hover:text-[#7D5A50] dark:hover:text-amber-100 relative"
          >
            <Heart className="h-5 w-5" />
            {favorites.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-[#D4B483] dark:bg-amber-500 rounded-full transform -translate-y-1/2 translate-x-1/2">
                {favorites.length}
              </span>
            )}
          </Button>
          
          <ThemeToggle />
          
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden text-[#5C4033] dark:text-amber-200 hover:text-[#7D5A50] dark:hover:text-amber-100"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#F7F3E9] dark:bg-gray-900 w-[250px]">
              <div className="flex flex-col mt-10 space-y-6">
                {navLinks.map((link) => {
                  const isHashLink = link.path.includes('#');
                  const sectionId = isHashLink ? link.path.split('#')[1] : '';
                  
                  return (
                    <Link 
                      key={link.name}
                      href={link.path}
                      onClick={() => {
                        setIsMenuOpen(false);
                        return isHashLink ? !scrollToSection(sectionId) : true;
                      }}
                      className="text-[#5C4033] dark:text-amber-100 hover:text-[#7D5A50] dark:hover:text-amber-300 font-medium text-lg"
                    >
                      {link.name}
                    </Link>
                  );
                })}
                <div className="pt-6 border-t border-[#D4B483] dark:border-gray-700">
                  <div className="flex justify-center space-x-4">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsSearchOpen(true);
                      }}
                      className="text-[#5C4033] dark:text-amber-200"
                    >
                      <Search className="h-5 w-5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsFavoritesOpen(true);
                      }}
                      className="text-[#5C4033] dark:text-amber-200 relative"
                    >
                      <Heart className="h-5 w-5" />
                      {favorites.length > 0 && (
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-[#D4B483] dark:bg-amber-500 rounded-full transform -translate-y-1/2 translate-x-1/2">
                          {favorites.length}
                        </span>
                      )}
                    </Button>
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
      <FavoritesDialog 
        open={isFavoritesOpen} 
        onOpenChange={setIsFavoritesOpen} 
        favorites={favorites} 
        onRemoveFavorite={removeFavorite} 
      />
    </header>
  );
};

export default Header;
