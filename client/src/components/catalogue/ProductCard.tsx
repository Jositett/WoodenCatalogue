import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Door } from '@shared/schema';

interface ProductCardProps {
  product: Door;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="door-card overflow-hidden bg-white rounded-sm shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
      <div className="overflow-hidden h-64 relative">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute bottom-0 right-0 bg-[#D4B483] text-[#5C4033] py-1 px-3 text-xs font-medium">
          {product.priceCategory}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-playfair text-xl text-[#7D5A50] mb-2">{product.name}</h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs bg-[#E8E4DA] px-2 py-1 rounded-sm">{product.woodType}</span>
          {product.features.slice(0, 2).map((feature, index) => (
            <span key={index} className="text-xs bg-[#E8E4DA] px-2 py-1 rounded-sm">{feature}</span>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-[#7D5A50] font-medium">From ${product.price.toLocaleString()}</span>
          <Link href={`/product/${product.id}`}>
            <Button size="sm" className="bg-[#7D5A50] hover:bg-[#5C4033] text-white font-medium px-4 py-2 rounded-sm text-sm">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
