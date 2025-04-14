import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

const About: React.FC = () => {
  const aboutRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    // Check if the URL hash is #about and scroll to the section
    if (window.location.hash === '#about' && aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
  
  return (
    <section ref={aboutRef} id="about" className="py-20 bg-[#F7F3E9] dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="font-playfair text-3xl md:text-4xl text-[#5C4033] dark:text-amber-200 mb-6">
              Craftsmanship That Stands the Test of Time
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              For over three decades, Luxe Doors has been importing the finest wooden doors from master craftsmen around the world. Our passion for quality and detail has made us the preferred choice for architects, designers, and homeowners looking to make a statement.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Each door in our collection tells a story of tradition, innovation, and sustainable practices. We travel the globe to source woods that are both stunning and responsibly harvested, working with artisans who combine generations of knowledge with modern techniques.
            </p>
            <div className="flex space-x-4">
              <Link href="/catalogue">
                <Button className="bg-[#7D5A50] hover:bg-[#5C4033] dark:bg-amber-600 dark:hover:bg-amber-700 text-white">
                  Explore Our Collection
                </Button>
              </Link>
              <Link href="/#contact">
                <Button variant="outline" className="border-[#7D5A50] text-[#7D5A50] hover:bg-[#7D5A50] hover:text-white dark:border-amber-600 dark:text-amber-600 dark:hover:bg-amber-600 dark:hover:text-white">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1614596047225-7420f28a4c2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Craftsman at work" 
                className="rounded-sm object-cover w-full h-60"
              />
              <img 
                src="https://images.unsplash.com/photo-1598106132701-807638b0400d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Door detail" 
                className="rounded-sm object-cover w-full h-40"
              />
            </div>
            <div className="space-y-4 mt-8">
              <img 
                src="https://images.unsplash.com/photo-1591005318522-e2a191cf38af?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Wood selection" 
                className="rounded-sm object-cover w-full h-40"
              />
              <img 
                src="https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Workshop" 
                className="rounded-sm object-cover w-full h-60"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;