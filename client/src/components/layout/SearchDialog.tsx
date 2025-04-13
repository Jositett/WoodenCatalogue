import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Door } from '@shared/schema';
import { useQuery } from '@tanstack/react-query';
import { Search, Loader2 } from 'lucide-react';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog: React.FC<SearchDialogProps> = ({ open, onOpenChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Door[]>([]);
  const [, setLocation] = useLocation();
  
  const { data: doors, isLoading } = useQuery<Door[]>({
    queryKey: ['/api/doors'],
  });
  
  useEffect(() => {
    if (open) {
      setSearchQuery('');
      setSearchResults([]);
    }
  }, [open]);
  
  useEffect(() => {
    if (!doors || !searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const results = doors.filter(
      door => 
        door.name.toLowerCase().includes(query) ||
        door.description.toLowerCase().includes(query) ||
        door.woodType.toLowerCase().includes(query) ||
        door.style.toLowerCase().includes(query) ||
        door.origin.toLowerCase().includes(query)
    );
    
    setSearchResults(results);
  }, [searchQuery, doors]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && searchResults.length > 0) {
      setLocation(`/product/${searchResults[0].id}`);
      onOpenChange(false);
    }
  };
  
  const handleResultClick = (doorId: number) => {
    setLocation(`/product/${doorId}`);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair text-[#5C4033] dark:text-amber-200">
            Search Doors
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            Find your perfect door by name, wood type, style, or origin
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSearch} className="mt-4">
          <div className="flex items-center relative">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, wood type, style..."
              className="pr-10 h-12 bg-white dark:bg-gray-700 border-[#7D5A50] dark:border-amber-700 text-gray-800 dark:text-gray-200"
              autoComplete="off"
            />
            <Button 
              type="submit" 
              size="icon" 
              className="absolute right-1 h-10 w-10 bg-[#7D5A50] hover:bg-[#5C4033] dark:bg-amber-600 dark:hover:bg-amber-700 text-white"
              disabled={isLoading || searchQuery.trim() === ''}
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
            </Button>
          </div>
        </form>
        
        <div className="mt-6">
          {isLoading ? (
            <div className="py-4 text-center">
              <Loader2 className="h-6 w-6 animate-spin mx-auto text-[#7D5A50] dark:text-amber-500" />
              <p className="text-gray-500 dark:text-gray-400 mt-2">Loading...</p>
            </div>
          ) : (
            <>
              {searchQuery && (
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  {searchResults.length === 0 
                    ? 'No results found' 
                    : `Found ${searchResults.length} result${searchResults.length !== 1 ? 's' : ''}`}
                </h3>
              )}
              
              <div className="space-y-2">
                {searchResults.slice(0, 5).map((door) => (
                  <div 
                    key={door.id}
                    onClick={() => handleResultClick(door.id)}
                    className="p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-sm transition"
                  >
                    <div className="h-12 w-12 overflow-hidden rounded-sm flex-shrink-0">
                      <img 
                        src={door.imageUrl} 
                        alt={door.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#5C4033] dark:text-amber-200">{door.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {door.woodType} • {door.style} • ${door.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {searchResults.length > 5 && (
                <Button
                  onClick={() => {
                    setLocation('/catalogue');
                    onOpenChange(false);
                  }}
                  variant="link"
                  className="mt-4 text-[#7D5A50] dark:text-amber-400 hover:text-[#5C4033] dark:hover:text-amber-300"
                >
                  View all {searchResults.length} results
                </Button>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;