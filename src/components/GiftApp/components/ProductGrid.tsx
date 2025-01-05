import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/types/product';
import { GripVertical } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onDragStart: (event: React.DragEvent<HTMLDivElement>, product: Product) => void;
}

const ProductGrid = ({ products, onDragStart }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 overflow-y-auto flex-1 min-h-0">
      {products.map((product) => (
        <motion.div
          key={product.id}
          draggable
          onDragStart={(e: React.DragEvent<HTMLDivElement>) => onDragStart(e, product)}
          data-product-type={product.itemgroup_product}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white rounded-lg shadow-sm p-4 cursor-grab active:cursor-grabbing border border-gray-100/50 hover:shadow-md transition-all"
        >
          <div className="relative">
            <GripVertical className="absolute top-0 right-0 text-gray-400" size={16} />
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-24 object-contain mb-2"
            />
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {product.name}
            </h3>
            <p className="text-sm text-[#700100] font-medium mt-1">{product.price} TND</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductGrid;