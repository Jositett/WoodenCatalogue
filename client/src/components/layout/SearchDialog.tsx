import React, { useState } from 'react';
import { useLocation } from 'wouter';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from '@tanstack/react-query';
import { Door } from '@shared/schema';
import { Search, X, ArrowRight } from 'lucide-react';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog: React.FC<SearchDialogProps> = ({ open, onOpenChange }) => {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: doors } = useQuery<Door[]>({
    queryKey: ['/api/doors'],
    enabled: open, // Only fetch when dialog is open
  });
  
  const filteredDoors = doors?.filter(door => 
    door.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    door.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    door.woodType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    door.style.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleDoorClick = (id: number) => {
    setLocation(`/product/${id}`);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-[#F7F3E9] dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-[#5C4033] dark:text-amber-200">Search Products</DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4 text-[#5C4033] dark:text-gray-300"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-[#7D5A50] dark:text-gray-400" />
          <Input
            className="pl-10 border-[#D4B483] dark:border-gray-600 bg-white dark:bg-gray-700 text-[#5C4033] dark:text-white"
            placeholder="Search for doors by name, type, style..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>
        
        <div className="max-h-[400px] overflow-y-auto">
          {searchTerm.length > 0 && (
            <div className="space-y-2 mt-2">
              {filteredDoors && filteredDoors.length > 0 ? (
                filteredDoors.map(door => (
                  <div 
                    key={door.id} 
                    className="flex items-center gap-4 p-3 rounded-sm hover:bg-[#E8E4DA] dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => handleDoorClick(door.id)}
                  >
                    <img 
                      src={door.imageUrl} 
                      alt={door.name} 
                      className="w-16 h-16 object-cover rounded-sm"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-[#5C4033] dark:text-amber-200">{door.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{door.woodType} • {door.style}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-[#7D5A50] dark:text-gray-400" />
                  </div>
                ))
              ) : (
                <p className="text-center py-4 text-gray-500 dark:text-gray-400">No results found</p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;