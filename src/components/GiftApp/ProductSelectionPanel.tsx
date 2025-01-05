import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { fetchAllProducts } from '@/services/productsApi';
import { Input } from "@/components/ui/input";
import { Product } from '@/types/product';
import { Search, GripVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface ProductSelectionPanelProps {
  onItemDrop: (item: Product) => void;
  packType: string;
  selectedContainerIndex: number;
}

const ProductSelectionPanel = ({ onItemDrop, packType, selectedContainerIndex }: ProductSelectionPanelProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Get available categories based on pack type and container index
  const getAvailableCategories = () => {
    switch (packType) {
      case 'Pack Prestige':
        return selectedContainerIndex === 0 
          ? [{ label: 'Chemises', type: 'itemgroup', value: 'chemises' }]
          : [{ label: 'Accessoires', type: 'type', value: 'Accessoires' }];
      
      case 'Pack Premium':
        return selectedContainerIndex === 0
          ? [{ label: 'Cravates', type: 'itemgroup', value: 'Cravates' }]
          : [{ label: 'Accessoires', type: 'type', value: 'Accessoires' }];
      
      case 'Pack Trio':
        if (selectedContainerIndex === 0) {
          return [{ label: 'Portefeuilles', type: 'itemgroup', value: 'Portefeuilles' }];
        } else if (selectedContainerIndex === 1) {
          return [{ label: 'Ceintures', type: 'itemgroup', value: 'Ceintures' }];
        } else {
          return [{ label: 'Accessoires', type: 'type', value: 'Accessoires' }];
        }
      
      case 'Pack Duo':
        return selectedContainerIndex === 0
          ? [{ label: 'Portefeuilles', type: 'itemgroup', value: 'Portefeuilles' }]
          : [{ label: 'Ceintures', type: 'itemgroup', value: 'Ceintures' }];
      
      case 'Pack Mini Duo':
        return selectedContainerIndex === 0
          ? [{ label: 'Porte-cartes', type: 'itemgroup', value: 'Porte-cartes' }]
          : [{ label: 'Porte-clés', type: 'itemgroup', value: 'Porte-clés' }];
      
      default:
        return [];
    }
  };

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', packType, selectedContainerIndex],
    queryFn: fetchAllProducts,
    select: (data) => {
      let filteredProducts = data;
      const categories = getAvailableCategories();
      
      if (categories.length > 0) {
        filteredProducts = data.filter(product => {
          return categories.some(category => {
            if (category.type === 'itemgroup') {
              return product.itemgroup_product === category.value;
            } else if (category.type === 'type') {
              return product.type_product === category.value;
            }
            return false;
          });
        });
      }

      return filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  });

  const totalPages = Math.ceil((products?.length || 0) / itemsPerPage);
  const paginatedProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, product: Product) => {
    // Check for Pack Prestige chemise restriction
    if (packType === 'Pack Prestige' && product.itemgroup_product === 'chemises') {
      const existingChemises = document.querySelectorAll('[data-product-type="chemises"]').length;
      if (existingChemises >= 1) {
        toast({
          title: "Limite atteinte",
          description: "Le Pack Prestige ne peut contenir qu'une seule chemise",
          variant: "destructive",
        });
        event.preventDefault();
        return;
      }
    }

    // Check for Pack Premium cravate restriction
    if (packType === 'Pack Premium' && product.itemgroup_product === 'Cravates') {
      const existingCravates = document.querySelectorAll('[data-product-type="Cravates"]').length;
      if (existingCravates >= 1) {
        toast({
          title: "Limite atteinte",
          description: "Le Pack Premium ne peut contenir qu'une seule cravate",
          variant: "destructive",
        });
        event.preventDefault();
        return;
      }
    }

    event.dataTransfer.setData('product', JSON.stringify(product));
  };

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-white/20 h-full flex flex-col">
      <div className="space-y-6 flex-1 flex flex-col">
        <div className="relative flex-shrink-0">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Rechercher des produits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/50 border-white/30"
          />
        </div>

        {/* Categories display with improved styling */}
        <div className="flex flex-wrap gap-3 py-4 px-2 bg-[#F1F0FB]/40 rounded-lg">
          <span className="text-sm font-medium text-[#403E43] w-full mb-2">
            Catégories disponibles:
          </span>
          {getAvailableCategories().map((category, index) => (
            <Badge
              key={index}
              variant="outline"
              className="bg-white hover:bg-[#E5DEFF] text-[#403E43] border border-[#D3E4FD] 
                         px-4 py-1.5 rounded-md shadow-sm transition-all duration-300
                         font-medium text-sm tracking-wide"
            >
              {category.label}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 overflow-y-auto flex-1 min-h-0">
          {paginatedProducts.map((product) => (
            <motion.div
              key={product.id}
              draggable
              onDragStart={(e) => handleDragStart(e, product)}
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

        {/* Pagination controls */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="bg-[#700100] hover:bg-[#590000] text-white border-none"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage} sur {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
            className="bg-[#700100] hover:bg-[#590000] text-white border-none"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductSelectionPanel;
