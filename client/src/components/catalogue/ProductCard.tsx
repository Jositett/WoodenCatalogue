import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Door } from '@shared/schema';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';

interface ProductCardProps {
  product: Door;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isProductFavorite = isFavorite(product.id);
  
  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isProductFavorite) {
      removeFavorite(product.id);
    } else {
      addFavorite(product.id);
    }
  };
  
  return (
    <div className="door-card overflow-hidden bg-white dark:bg-gray-800 rounded-sm shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
      <div className="overflow-hidden h-64 relative">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-3 right-3 z-10">
          <button 
            onClick={handleFavoriteToggle}
            className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:scale-110 transition-transform duration-300"
            aria-label={isProductFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              size={18} 
              className={`${isProductFavorite ? "fill-red-500 text-red-500" : "text-gray-400 dark:text-gray-300"}`}
            />
          </button>
        </div>
        <div className="absolute bottom-0 right-0 bg-[#D4B483] dark:bg-amber-600 text-[#5C4033] dark:text-gray-900 py-1 px-3 text-xs font-medium">
          {product.priceCategory}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-playfair text-xl text-[#7D5A50] dark:text-amber-300 mb-2">{product.name}</h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs bg-[#E8E4DA] dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded-sm">{product.woodType}</span>
          {product.features && product.features.slice(0, 2).map((feature, index) => (
            <span key={index} className="text-xs bg-[#E8E4DA] dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded-sm">{feature}</span>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-[#7D5A50] dark:text-amber-300 font-medium">From ${product.price.toLocaleString()}</span>
          <Link href={`/product/${product.id}`}>
            <Button size="sm" className="bg-[#7D5A50] hover:bg-[#5C4033] dark:bg-amber-600 dark:hover:bg-amber-700 text-white font-medium px-4 py-2 rounded-sm text-sm">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
