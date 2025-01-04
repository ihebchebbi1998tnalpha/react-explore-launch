import React from 'react';
import { Product } from '@/types/product';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface GiftPackContainerProps {
  title: string;
  item?: Product;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onItemClick?: (product: Product) => void;
  onRemoveItem?: (index: number) => void;
  containerIndex: number;
  className?: string;
}

const GiftPackContainer = ({
  title,
  item,
  onDrop,
  onItemClick,
  onRemoveItem,
  containerIndex,
  className = '',
}: GiftPackContainerProps) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.borderColor = '#700100';
    e.currentTarget.style.backgroundColor = 'rgba(112, 1, 0, 0.05)';
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.borderColor = '';
    e.currentTarget.style.backgroundColor = '';
  };

  return (
    <div
      onDrop={onDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`relative ${className}`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
        <h3 className="text-lg font-medium text-[#700100] mb-2">{title}</h3>
        {!item && (
          <p className="text-sm text-gray-500 text-center">
            Glissez et déposez un article ici
          </p>
        )}
        {item && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full h-full group"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-4/5 h-4/5 object-contain cursor-pointer transition-all duration-300 group-hover:scale-105 filter drop-shadow-lg"
                onClick={() => onItemClick?.(item)}
              />
            </div>
            {onRemoveItem && (
              <button
                onClick={() => onRemoveItem(containerIndex)}
                className="absolute top-0 right-0 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 transform hover:scale-110 shadow-lg"
                aria-label="Remove item"
              >
                <X size={16} />
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GiftPackContainer;