import React from 'react';
import { useLocation } from 'wouter';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Door } from '@shared/schema';
import { Trash2, X, ArrowRight } from 'lucide-react';

interface FavoritesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  favorites: Door[];
  onRemoveFavorite: (doorId: number) => void;
}

const FavoritesDialog: React.FC<FavoritesDialogProps> = ({ 
  open, 
  onOpenChange, 
  favorites, 
  onRemoveFavorite 
}) => {
  const [, setLocation] = useLocation();
  
  const handleDoorClick = (id: number) => {
    setLocation(`/product/${id}`);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-[#F7F3E9] dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-[#5C4033] dark:text-amber-200">Your Favorite Doors</DialogTitle>
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
        
        {favorites.length > 0 ? (
          <div className="max-h-[400px] overflow-y-auto">
            <div className="space-y-2 mt-2">
              {favorites.map(door => (
                <div 
                  key={door.id} 
                  className="flex items-center gap-4 p-3 rounded-sm hover:bg-[#E8E4DA] dark:hover:bg-gray-700 group"
                >
                  <img 
                    src={door.imageUrl} 
                    alt={door.name} 
                    className="w-16 h-16 object-cover rounded-sm"
                  />
                  <div 
                    className="flex-1 cursor-pointer" 
                    onClick={() => handleDoorClick(door.id)}
                  >
                    <h4 className="font-medium text-[#5C4033] dark:text-amber-200">{door.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">${door.price ? door.price.toLocaleString() : '0'}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-gray-400 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                      onClick={() => onRemoveFavorite(door.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-[#7D5A50] dark:text-gray-400"
                      onClick={() => handleDoorClick(door.id)}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <DialogDescription className="text-center py-8 text-gray-500 dark:text-gray-400">
            You haven't added any favorites yet.
            <br />
            Browse our collection and click the heart icon to save your favorite doors.
          </DialogDescription>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FavoritesDialog;