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
                ? "bg-[#7D5A50] text-white border-[#7D5A50] dark:bg-amber-600 dark:border-amber-600"
                : "bg-white dark:bg-gray-800 border border-[#7D5A50] text-[#7D5A50] hover:bg-[#7D5A50] hover:text-white dark:border-amber-600 dark:text-amber-500 dark:hover:bg-amber-600"
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
          <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800 border-[#7D5A50] dark:border-amber-600 text-[#5C4033] dark:text-amber-500">
            <SelectValue placeholder="Wood Type" />
          </SelectTrigger>
          <SelectContent className="dark:bg-gray-800 dark:border-amber-600">
            {woodTypes.map(type => (
              <SelectItem key={type.value} value={type.value} className="dark:text-amber-500 dark:focus:bg-gray-700 dark:focus:text-amber-400">
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select 
          value={currentFilters.priceRange} 
          onValueChange={(value) => onFilterChange({ ...currentFilters, priceRange: value })}
        >
          <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800 border-[#7D5A50] dark:border-amber-600 text-[#5C4033] dark:text-amber-500">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent className="dark:bg-gray-800 dark:border-amber-600">
            {priceRanges.map(range => (
              <SelectItem key={range.value} value={range.value} className="dark:text-amber-500 dark:focus:bg-gray-700 dark:focus:text-amber-400">
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select 
          value={currentFilters.features} 
          onValueChange={(value) => onFilterChange({ ...currentFilters, features: value })}
        >
          <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800 border-[#7D5A50] dark:border-amber-600 text-[#5C4033] dark:text-amber-500">
            <SelectValue placeholder="Features" />
          </SelectTrigger>
          <SelectContent className="dark:bg-gray-800 dark:border-amber-600">
            {features.map(feature => (
              <SelectItem key={feature.value} value={feature.value} className="dark:text-amber-500 dark:focus:bg-gray-700 dark:focus:text-amber-400">
                {feature.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select 
          value={currentFilters.origin} 
          onValueChange={(value) => onFilterChange({ ...currentFilters, origin: value })}
        >
          <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800 border-[#7D5A50] dark:border-amber-600 text-[#5C4033] dark:text-amber-500">
            <SelectValue placeholder="Origin" />
          </SelectTrigger>
          <SelectContent className="dark:bg-gray-800 dark:border-amber-600">
            {origins.map(origin => (
              <SelectItem key={origin.value} value={origin.value} className="dark:text-amber-500 dark:focus:bg-gray-700 dark:focus:text-amber-400">
                {origin.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button 
          variant="outline" 
          onClick={handleFilterReset}
          className="border-[#7D5A50] text-[#7D5A50] hover:bg-[#7D5A50] hover:text-white dark:border-amber-600 dark:text-amber-500 dark:hover:bg-amber-600 dark:hover:text-white"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default Filters;
