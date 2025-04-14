import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Star } from 'lucide-react';
import { Testimonial } from '@shared/schema';

interface TestimonialsProps {
  testimonials: Testimonial[];
  isLoading: boolean;
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials, isLoading }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-[#D4B483] fill-[#D4B483] dark:text-amber-400 dark:fill-amber-400' : 'text-gray-300 dark:text-gray-600'}`} 
      />
    ));
  };

  const renderSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-sm p-8">
          <Skeleton className="h-4 w-24 mb-4 dark:bg-gray-700" />
          <Skeleton className="h-24 w-full mb-6 dark:bg-gray-700" />
          <div className="flex items-center">
            <Skeleton className="h-12 w-12 rounded-full mr-4 dark:bg-gray-700" />
            <div>
              <Skeleton className="h-4 w-24 mb-2 dark:bg-gray-700" />
              <Skeleton className="h-3 w-32 dark:bg-gray-700" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-24 bg-[#5C4033] dark:bg-gray-950 text-white">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-4xl text-center mb-16">What Our Clients Say</h2>
        
        {isLoading ? (
          renderSkeleton()
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="testimonial-card p-8 text-[#333333] dark:text-gray-300 bg-white dark:bg-gray-800 rounded-sm shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                <p className="mb-6 italic text-sm">{testimonial.content}</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatarUrl} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-medium dark:text-gray-200">{testimonial.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex justify-center mt-12 space-x-8">
          <div className="h-12 bg-white/10 px-6 py-2 rounded-sm opacity-75 flex items-center">
            <span className="text-sm font-medium">FSC Certified</span>
          </div>
          <div className="h-12 bg-white/10 px-6 py-2 rounded-sm opacity-75 flex items-center">
            <span className="text-sm font-medium">ISO 9001</span>
          </div>
          <div className="h-12 bg-white/10 px-6 py-2 rounded-sm opacity-75 flex items-center">
            <span className="text-sm font-medium">Sustainable Partner</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
