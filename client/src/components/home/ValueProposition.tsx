import React from 'react';
import { Gem, Network, Wand2, Shield } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="feature text-center px-6 py-8 transition-all duration-300 ease-in-out">
      <div className="mb-6 flex justify-center">
        <div className="text-[#D4B483] transform transition-transform duration-300 hover:scale-110">
          {icon}
        </div>
      </div>
      <h3 className="font-playfair text-xl mb-3 text-[#7D5A50]">{title}</h3>
      <p className="text-[#333333] text-sm leading-relaxed">{description}</p>
    </div>
  );
};

const ValueProposition: React.FC = () => {
  const features = [
    {
      icon: <Gem size={42} />,
      title: 'Exquisite Craftsmanship',
      description: 'Handcrafted designs with meticulous attention to detail by master artisans.'
    },
    {
      icon: <Network size={42} />,
      title: 'Premium Materials',
      description: 'European Oak, Burmese Mahogany, and Sustainable Teak sourced from the finest forests.'
    },
    {
      icon: <Wand2 size={42} />,
      title: 'Custom Creations',
      description: 'Tailored sizing, finishes, and hardware options to match your unique style.'
    },
    {
      icon: <Shield size={42} />,
      title: 'Lifetime Warranty',
      description: 'Expert installation services and a commitment to quality that lasts a lifetime.'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-4xl text-center text-[#5C4033] mb-16">Why Choose Our Doors?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {features.map((feature, index) => (
            <Feature 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
