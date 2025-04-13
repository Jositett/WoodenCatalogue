import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';

interface FiltersProps {
  onFilterChange: (filters: {
    style: string;
    woodType: string;
    priceRange: string;
    features: string;
    origin: string;
  }) => void;
  currentFilters: {
    style: string;
    woodType: string;
    priceRange: string;
    features: string;
    origin: string;
  };
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange, currentFilters }) => {
  const styles = [
    { value: 'all', label: 'All Styles' },
    { value: 'Contemporary', label: 'Contemporary' },
    { value: 'Classic', label: 'Classic' },
    { value: 'Mediterranean', label: 'Mediterranean' },
    { value: 'Asian', label: 'Asian' }
  ];
  
  const woodTypes = [
    { value: 'all', label: 'All Wood Types' },
    { value: 'Oak', label: 'Oak' },
    { value: 'Mahogany', label: 'Mahogany' },
    { value: 'Teak', label: 'Teak' },
    { value: 'Walnut', label: 'Walnut' }
  ];
  
  const priceRanges = [
    { value: 'all', label: 'All Price Ranges' },
    { value: 'Premium', label: 'Premium' },
    { value: 'Luxury', label: 'Luxury' },
    { value: 'Ultra-Luxury', label: 'Ultra-Luxury' }
  ];
  
  const features = [
    { value: 'all', label: 'All Features' },
    { value: 'Security', label: 'Security Enhanced' },
    { value: 'Weather', label: 'Weather Resistant' },
    { value: 'Soundproof', label: 'Soundproof' }
  ];
  
  const origins = [
    { value: 'all', label: 'All Origins' },
    { value: 'Italian', label: 'Italian' },
    { value: 'Indonesian', label: 'Indonesian' },
    { value: 'Canadian', label: 'Canadian' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'Japanese', label: 'Japanese' }
  ];
  
  const handleStyleChange = (value: string) => {
    onFilterChange({ ...currentFilters, style: value });
  };
  
  const handleFilterReset = () => {
    onFilterChange({
      style: 'all',
      woodType: 'all',
      priceRange: 'all',
      features: 'all',
      origin: 'all',
    });
  };

  return (
    <div className="mb-12">
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {styles.map(style => (
          <Button
            key={style.value}
            variant={currentFilters.style === style.value ? "default" : "outline"}
            onClick={() => handleStyleChange(style.value)}
            className={
              currentFilters.style === style.value
                ? "bg-[#7D5A50] text-white border-[#7D5A50]"
                : "bg-white border border-[#7D5A50] text-[#7D5A50] hover:bg-[#7D5A50] hover:text-white"
            }
          >
            {style.label}
          </Button>
        ))}
      </div>
      
      <div className="flex flex-wrap justify-center gap-4">
        <Select 
          value={currentFilters.woodType} 
          onValueChange={(value) => onFilterChange({ ...currentFilters, woodType: value })}
        >
          <SelectTrigger className="w-[180px] bg-white border-[#7D5A50] text-[#5C4033]">
            <SelectValue placeholder="Wood Type" />
          </SelectTrigger>
          <SelectContent>
            {woodTypes.map(type => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select 
          value={currentFilters.priceRange} 
          onValueChange={(value) => onFilterChange({ ...currentFilters, priceRange: value })}
        >
          <SelectTrigger className="w-[180px] bg-white border-[#7D5A50] text-[#5C4033]">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            {priceRanges.map(range => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select 
          value={currentFilters.features} 
          onValueChange={(value) => onFilterChange({ ...currentFilters, features: value })}
        >
          <SelectTrigger className="w-[180px] bg-white border-[#7D5A50] text-[#5C4033]">
            <SelectValue placeholder="Features" />
          </SelectTrigger>
          <SelectContent>
            {features.map(feature => (
              <SelectItem key={feature.value} value={feature.value}>
                {feature.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select 
          value={currentFilters.origin} 
          onValueChange={(value) => onFilterChange({ ...currentFilters, origin: value })}
        >
          <SelectTrigger className="w-[180px] bg-white border-[#7D5A50] text-[#5C4033]">
            <SelectValue placeholder="Origin" />
          </SelectTrigger>
          <SelectContent>
            {origins.map(origin => (
              <SelectItem key={origin.value} value={origin.value}>
                {origin.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button 
          variant="outline" 
          onClick={handleFilterReset}
          className="border-[#7D5A50] text-[#7D5A50] hover:bg-[#7D5A50] hover:text-white"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default Filters;
