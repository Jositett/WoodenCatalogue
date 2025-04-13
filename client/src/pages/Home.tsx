import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import ValueProposition from '@/components/home/ValueProposition';
import FeaturedCollections from '@/components/home/FeaturedCollections';
import Testimonials from '@/components/home/Testimonials';
import ContactForm from '@/components/home/ContactForm';
import CTAs from '@/components/home/CTAs';
import About from '@/components/home/About';
import { useQuery } from '@tanstack/react-query';

const Home: React.FC = () => {
  const { data: collectionsData, isLoading: collectionsLoading } = useQuery({
    queryKey: ['/api/collections'],
  });

  const { data: testimonialsData, isLoading: testimonialsLoading } = useQuery({
    queryKey: ['/api/testimonials'],
  });

  return (
    <div>
      <HeroSection />
      <ValueProposition />
      <FeaturedCollections 
        collections={collectionsData || []} 
        isLoading={collectionsLoading} 
      />
      <About />
      <Testimonials 
        testimonials={testimonialsData || []} 
        isLoading={testimonialsLoading} 
      />
      <ContactForm />
      <CTAs />
    </div>
  );
};

export default Home;
