import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import Filters from '@/components/catalogue/Filters';
import ProductCard from '@/components/catalogue/ProductCard';
import { Button } from '@/components/ui/button';
import { Door } from '@shared/schema';

const Catalogue: React.FC = () => {
  const [filters, setFilters] = useState({
    style: 'all',
    woodType: 'all',
    priceRange: 'all',
    features: 'all',
    origin: 'all',
  });

  const { data: products, isLoading } = useQuery<Door[]>({
    queryKey: ['/api/doors'],
  });
  
  const [filteredProducts, setFilteredProducts] = useState<Door[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<number>(6);
  
  useEffect(() => {
    if (products) {
      let filtered = [...products];
      
      if (filters.style !== 'all') {
        filtered = filtered.filter(product => product.style === filters.style);
      }
      
      if (filters.woodType !== 'all') {
        filtered = filtered.filter(product => product.woodType === filters.woodType);
      }
      
      if (filters.priceRange !== 'all') {
        filtered = filtered.filter(product => product.priceCategory === filters.priceRange);
      }
      
      if (filters.features !== 'all') {
        filtered = filtered.filter(product => 
          product.features.some(feature => feature.toLowerCase().includes(filters.features.toLowerCase()))
        );
      }
      
      if (filters.origin !== 'all') {
        filtered = filtered.filter(product => product.origin === filters.origin);
      }
      
      setFilteredProducts(filtered);
    }
  }, [filters, products]);
  
  const loadMore = () => {
    setVisibleProducts(prev => Math.min(prev + 6, filteredProducts.length));
  };

  return (
    <section id="catalogue" className="py-24 bg-[#F7F3E9]">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-4xl text-center text-[#5C4033] mb-6">Door Catalogue</h2>
        <p className="text-center text-lg mb-16 max-w-2xl mx-auto">
          Browse our extensive collection of premium wooden doors
        </p>
        
        <Filters onFilterChange={setFilters} currentFilters={filters} />
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-sm overflow-hidden shadow-md p-4">
                <Skeleton className="h-64 w-full mb-4" />
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3 mb-4" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-10 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {filteredProducts.slice(0, visibleProducts).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {visibleProducts < filteredProducts.length && (
              <div className="text-center">
                <Button
                  onClick={loadMore}
                  className="bg-[#5C4033] hover:bg-[#7D5A50] text-white font-medium px-8 py-6 rounded-sm transition duration-300"
                >
                  Load More Doors
                </Button>
              </div>
            )}
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-2xl font-playfair text-[#5C4033] mb-4">No doors match your filters</h3>
                <p className="mb-6">Try adjusting your filter criteria to see more options.</p>
                <Button
                  onClick={() => setFilters({
                    style: 'all',
                    woodType: 'all',
                    priceRange: 'all',
                    features: 'all',
                    origin: 'all',
                  })}
                  variant="outline"
                  className="border-[#7D5A50] text-[#7D5A50] hover:bg-[#7D5A50] hover:text-white"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Catalogue;
