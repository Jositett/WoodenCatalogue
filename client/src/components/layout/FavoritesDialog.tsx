import React from 'react';
import { Link } from 'wouter';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Heart } from 'lucide-react';
import { Door } from '@shared/schema';

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
  onRemoveFavorite,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair text-[#5C4033] dark:text-amber-200 flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Favorites
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            Your saved door selections
          </DialogDescription>
        </DialogHeader>
        
        {favorites.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">Your favorites list is empty</p>
            <Link href="/catalogue">
              <Button 
                onClick={() => onOpenChange(false)}
                className="bg-[#7D5A50] hover:bg-[#5C4033] dark:bg-amber-600 dark:hover:bg-amber-700 text-white"
              >
                Explore Catalogue
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {favorites.map((door) => (
              <div 
                key={door.id} 
                className="border border-gray-200 dark:border-gray-700 rounded-sm p-3 flex gap-3 items-center group relative"
              >
                <div className="h-20 w-20 overflow-hidden rounded-sm flex-shrink-0">
                  <img 
                    src={door.imageUrl} 
                    alt={door.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-[#5C4033] dark:text-amber-200 font-medium">{door.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {door.woodType} | ${door.price.toLocaleString()}
                  </p>
                  <Link href={`/product/${door.id}`}>
                    <Button
                      size="sm"
                      variant="link"
                      onClick={() => onOpenChange(false)}
                      className="p-0 h-auto text-[#7D5A50] dark:text-amber-400 hover:text-[#5C4033] dark:hover:text-amber-300"
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onRemoveFavorite(door.id)}
                  className="h-8 w-8 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500"
                  aria-label="Remove from favorites"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
        
        <DialogClose asChild>
          <Button 
            type="button" 
            variant="outline" 
            className="mt-4 border-[#7D5A50] text-[#7D5A50] hover:bg-[#7D5A50] hover:text-white dark:border-amber-600 dark:text-amber-500 dark:hover:bg-amber-600"
          >
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default FavoritesDialog;