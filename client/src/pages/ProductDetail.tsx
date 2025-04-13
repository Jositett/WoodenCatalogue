import React from 'react';
import { useRoute, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Door } from '@shared/schema';
import { ChevronLeft, Check } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute<{ id: string }>('/product/:id');
  
  const { data: product, isLoading } = useQuery<Door>({
    queryKey: ['/api/doors', params?.id],
    enabled: !!params?.id,
  });

  if (!match) return null;
  
  const handleBack = () => {
    setLocation('/catalogue');
  };

  if (isLoading) {
    return (
      <div className="py-12 bg-[#F7F3E9]">
        <div className="container mx-auto px-4">
          <button 
            className="flex items-center text-[#7D5A50] mb-8" 
            onClick={handleBack}
          >
            <ChevronLeft className="mr-1" /> Back to Catalogue
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Skeleton className="h-[500px] w-full rounded-sm mb-4" />
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-sm" />
                ))}
              </div>
            </div>
            
            <div>
              <Skeleton className="h-12 w-3/4 mb-4" />
              <Skeleton className="h-6 w-1/4 mb-6" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-6" />
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="py-12 bg-[#F7F3E9]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl text-[#5C4033] mb-4">Product Not Found</h2>
          <p className="mb-8">The door you're looking for cannot be found.</p>
          <Button 
            onClick={handleBack}
            className="bg-[#7D5A50] hover:bg-[#5C4033] text-white"
          >
            Return to Catalogue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-[#F7F3E9]">
      <div className="container mx-auto px-4">
        <button 
          className="flex items-center text-[#7D5A50] mb-8" 
          onClick={handleBack}
        >
          <ChevronLeft className="mr-1" /> Back to Catalogue
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="mb-4 bg-white p-2 rounded-sm">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-[500px] object-cover rounded-sm"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {product.additionalImages?.map((img, index) => (
                <div key={index} className="bg-white p-1 rounded-sm cursor-pointer">
                  <img 
                    src={img} 
                    alt={`${product.name} view ${index + 1}`} 
                    className="w-full h-24 object-cover rounded-sm"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h1 className="font-playfair text-3xl text-[#5C4033] mb-2">
              {product.name}
            </h1>
            <div className="mb-4">
              <span className="inline-block bg-[#D4B483] text-[#5C4033] text-sm font-medium px-3 py-1 rounded-sm">
                {product.priceCategory}
              </span>
            </div>
            
            <p className="text-gray-700 mb-6">
              {product.description}
            </p>
            
            <div className="border-t border-b border-gray-200 py-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[#5C4033] font-medium">Price</span>
                <span className="text-xl font-playfair">From ${product.price ? product.price.toLocaleString() : '0'}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="text-gray-600 text-sm">Wood Type</span>
                  <p className="font-medium">{product.woodType}</p>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Origin</span>
                  <p className="font-medium">{product.origin}</p>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Style</span>
                  <p className="font-medium">{product.style}</p>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Dimensions</span>
                  <p className="font-medium">{product.dimensions}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {product.features && product.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-700 text-sm">
                    <Check className="h-4 w-4 text-[#7D5A50] mr-1" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col space-y-4">
              <Button className="bg-[#7D5A50] hover:bg-[#5C4033] text-white w-full py-6">
                Request Quote
              </Button>
              <Button variant="outline" className="border-[#7D5A50] text-[#7D5A50] hover:bg-[#7D5A50] hover:text-white w-full py-6">
                Schedule Viewing
              </Button>
            </div>
            
            <Tabs defaultValue="details" className="mt-8">
              <TabsList className="w-full">
                <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                <TabsTrigger value="installation" className="flex-1">Installation</TabsTrigger>
                <TabsTrigger value="warranty" className="flex-1">Warranty</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="pt-4">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-gray-700">
                      {product.details || "Detailed specifications about material properties, construction methods, and finishing options for this premium door."}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="installation" className="pt-4">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-gray-700">
                      Professional installation is recommended for all our premium doors. Our expert technicians ensure perfect fitting and optimal performance.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="warranty" className="pt-4">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-gray-700">
                      All Luxe Doors come with a comprehensive lifetime warranty covering craftsmanship and materials.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
