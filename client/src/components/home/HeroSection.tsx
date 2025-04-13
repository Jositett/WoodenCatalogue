import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

const HeroSection: React.FC = () => {
  const scrollToCollections = () => {
    const element = document.getElementById('collections');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1517581177682-a085bb7ffb38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')` 
      }}
    >
      <div className="container mx-auto px-8 text-center text-white">
        <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Elevate Your Entrance with Exquisite Imported Wooden Doors
        </h1>
        <p className="font-cormorant text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Handcrafted elegance from Europe and Asia, designed to transform your space.
        </p>
        <Button 
          onClick={scrollToCollections}
          className="bg-[#D4B483] hover:bg-[#E6D2B3] text-[#5C4033] font-medium px-8 py-6 rounded-sm transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-lg"
        >
          Explore Our Collection
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
