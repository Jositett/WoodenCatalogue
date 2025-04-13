import React from 'react';
import { Link } from 'wouter';
import { FileText, Package, Calendar } from 'lucide-react';

interface CTAItemProps {
  icon: React.ReactNode;
  text: string;
  href: string;
}

const CTAItem: React.FC<CTAItemProps> = ({ icon, text, href }) => {
  return (
    <Link href={href}>
      <div className="flex items-center px-6 py-4 bg-white rounded-sm shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
        <div className="text-[#D4B483] mr-4">
          {icon}
        </div>
        <span className="text-[#5C4033] font-medium">{text}</span>
      </div>
    </Link>
  );
};

const CTAs: React.FC = () => {
  const ctaItems = [
    {
      icon: <FileText size={24} />,
      text: 'Download Technical Specs',
      href: '#',
    },
    {
      icon: <Package size={24} />,
      text: 'Order a Free Sample Kit',
      href: '#',
    },
    {
      icon: <Calendar size={24} />,
      text: 'Book a Design Consultation',
      href: '#contact',
    },
  ];

  return (
    <section className="py-16 bg-[#E8E4DA]">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-6">
          {ctaItems.map((item, index) => (
            <CTAItem 
              key={index}
              icon={item.icon}
              text={item.text}
              href={item.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTAs;
