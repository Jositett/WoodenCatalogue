import React from 'react';
import { useRoute, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Door } from '@shared/schema';
import { ChevronLeft, Check, Heart } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';

const ProductDetail: React.FC = () => {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute<{ id: string }>('/product/:id');
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  
  const { data: product, isLoading } = useQuery<Door>({
    queryKey: ['/api/doors', params?.id],
    enabled: !!params?.id,
  });

  if (!match) return null;
  
  const handleBack = () => {
    setLocation('/catalogue');
  };
  
  const handleToggleFavorite = () => {
    if (!product) return;
    
    if (isFavorite(product.id)) {
      removeFavorite(product.id);
    } else {
      addFavorite(product.id);
    }
  };

  if (isLoading) {
    return (
      <div className="py-12 bg-[#F7F3E9] dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <button 
            className="flex items-center text-[#7D5A50] dark:text-amber-200 mb-8" 
            onClick={handleBack}
          >
            <ChevronLeft className="mr-1" /> Back to Catalogue
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Skeleton className="h-[500px] w-full rounded-sm mb-4 dark:bg-gray-700" />
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-sm dark:bg-gray-700" />
                ))}
              </div>
            </div>
            
            <div>
              <Skeleton className="h-12 w-3/4 mb-4 dark:bg-gray-700" />
              <Skeleton className="h-6 w-1/4 mb-6 dark:bg-gray-700" />
              <Skeleton className="h-4 w-full mb-2 dark:bg-gray-700" />
              <Skeleton className="h-4 w-full mb-2 dark:bg-gray-700" />
              <Skeleton className="h-4 w-3/4 mb-6 dark:bg-gray-700" />
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <Skeleton className="h-10 w-full dark:bg-gray-700" />
                <Skeleton className="h-10 w-full dark:bg-gray-700" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="py-12 bg-[#F7F3E9] dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl text-[#5C4033] dark:text-amber-200 mb-4">Product Not Found</h2>
          <p className="mb-8 dark:text-gray-300">The door you're looking for cannot be found.</p>
          <Button 
            onClick={handleBack}
            className="bg-[#7D5A50] hover:bg-[#5C4033] dark:bg-amber-600 dark:hover:bg-amber-700 text-white"
          >
            Return to Catalogue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-[#F7F3E9] dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <button 
          className="flex items-center text-[#7D5A50] dark:text-amber-200 mb-8" 
          onClick={handleBack}
        >
          <ChevronLeft className="mr-1" /> Back to Catalogue
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="mb-4 bg-white dark:bg-gray-800 p-2 rounded-sm">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-[500px] object-cover rounded-sm"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {product.additionalImages?.map((img, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-1 rounded-sm cursor-pointer">
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
            <div className="flex justify-between items-start">
              <h1 className="font-playfair text-3xl text-[#5C4033] dark:text-amber-200 mb-2">
                {product.name}
              </h1>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleToggleFavorite}
                className={`${
                  isFavorite(product.id) 
                    ? 'text-red-500 hover:text-red-600' 
                    : 'text-[#7D5A50] dark:text-amber-200 hover:text-red-500 dark:hover:text-red-400'
                }`}
              >
                <Heart className={`h-6 w-6 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
              </Button>
            </div>
            <div className="mb-4">
              <span className="inline-block bg-[#D4B483] dark:bg-amber-600 text-[#5C4033] dark:text-white text-sm font-medium px-3 py-1 rounded-sm">
                {product.priceCategory}
              </span>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {product.description}
            </p>
            
            <div className="border-t border-b border-gray-200 dark:border-gray-700 py-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[#5C4033] dark:text-amber-200 font-medium">Price</span>
                <span className="text-xl font-playfair text-[#5C4033] dark:text-amber-200">From ${product.price ? product.price.toLocaleString() : '0'}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Wood Type</span>
                  <p className="font-medium text-gray-800 dark:text-gray-200">{product.woodType}</p>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Origin</span>
                  <p className="font-medium text-gray-800 dark:text-gray-200">{product.origin}</p>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Style</span>
                  <p className="font-medium text-gray-800 dark:text-gray-200">{product.style}</p>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Dimensions</span>
                  <p className="font-medium text-gray-800 dark:text-gray-200">{product.dimensions}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {product.features && product.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                    <Check className="h-4 w-4 text-[#7D5A50] dark:text-amber-400 mr-1" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col space-y-4">
              <Button className="bg-[#7D5A50] hover:bg-[#5C4033] dark:bg-amber-600 dark:hover:bg-amber-700 text-white w-full py-6">
                Request Quote
              </Button>
              <Button variant="outline" className="border-[#7D5A50] dark:border-amber-600 text-[#7D5A50] dark:text-amber-600 hover:bg-[#7D5A50] dark:hover:bg-amber-600 hover:text-white dark:hover:text-white w-full py-6">
                Schedule Viewing
              </Button>
            </div>
            
            <Tabs defaultValue="details" className="mt-8">
              <TabsList className="w-full bg-gray-100 dark:bg-gray-800">
                <TabsTrigger value="details" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">Details</TabsTrigger>
                <TabsTrigger value="installation" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">Installation</TabsTrigger>
                <TabsTrigger value="warranty" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">Warranty</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="pt-4">
                <Card className="border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                  <CardContent className="pt-6">
                    <p className="text-gray-700 dark:text-gray-300">
                      {product.details || "Detailed specifications about material properties, construction methods, and finishing options for this premium door."}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="installation" className="pt-4">
                <Card className="border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                  <CardContent className="pt-6">
                    <p className="text-gray-700 dark:text-gray-300">
                      Professional installation is recommended for all our premium doors. Our expert technicians ensure perfect fitting and optimal performance.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="warranty" className="pt-4">
                <Card className="border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                  <CardContent className="pt-6">
                    <p className="text-gray-700 dark:text-gray-300">
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
