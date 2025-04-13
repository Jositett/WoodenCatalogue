import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search, Heart } from "lucide-react";

const Header: React.FC = () => {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <header className="bg-[#F7F3E9] sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <span className="text-[#7D5A50] font-playfair text-3xl font-bold">Luxe Doors</span>
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
                className="text-[#5C4033] hover:text-[#7D5A50] font-medium"
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="text-[#5C4033] hover:text-[#7D5A50]">
            <Search className="h-5 w-5" />
          </button>
          <button className="text-[#5C4033] hover:text-[#7D5A50]">
            <Heart className="h-5 w-5" />
          </button>
          
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden text-[#5C4033] hover:text-[#7D5A50]">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#F7F3E9] w-[250px]">
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
                      className="text-[#5C4033] hover:text-[#7D5A50] font-medium text-lg"
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
