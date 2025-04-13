import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Collection } from '@shared/schema';

interface FeaturedCollectionsProps {
  collections: Collection[];
  isLoading: boolean;
}

const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({ collections, isLoading }) => {
  const renderSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="bg-white rounded-sm shadow-md overflow-hidden">
          <Skeleton className="h-80 w-full" />
          <div className="p-6">
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-6" />
            <Skeleton className="h-6 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section id="collections" className="py-24 bg-[#F7F3E9]">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-4xl text-center text-[#5C4033] mb-6">Featured Collections</h2>
        <p className="text-center text-lg mb-16 max-w-2xl mx-auto">
          Discover our exquisite collections that combine traditional craftsmanship with innovative design
        </p>
        
        {isLoading ? (
          renderSkeleton()
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
            {collections.map((collection) => (
              <div 
                key={collection.id} 
                className="door-card overflow-hidden bg-white rounded-sm shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="overflow-hidden h-80">
                  <img 
                    src={collection.imageUrl} 
                    alt={collection.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-playfair text-2xl text-[#7D5A50] mb-2">{collection.name}</h3>
                  <p className="text-[#333333] mb-4 text-sm">{collection.description}</p>
                  <Link href={`/collection/${collection.id}`} className="inline-block text-[#D4B483] font-medium hover:underline flex items-center">
                    View Collection <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center">
          <Link href="/catalogue">
            <Button className="bg-[#7D5A50] hover:bg-[#A67C52] text-white font-medium px-8 py-6 rounded-sm transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
              View Full Catalogue
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
