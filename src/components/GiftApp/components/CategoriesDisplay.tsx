import React from 'react';
import { Badge } from "@/components/ui/badge";

interface Category {
  label: string;
  type: string;
  value: string;
}

interface CategoriesDisplayProps {
  categories: Category[];
}

const CategoriesDisplay = ({ categories }: CategoriesDisplayProps) => {
  return (
    <div className="flex flex-wrap gap-3 py-4 px-2 bg-[#F1F0FB]/40 rounded-lg">
      <span className="text-sm font-medium text-[#403E43] w-full mb-2">
        Catégories disponibles:
      </span>
      {categories.map((category, index) => (
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
  );
};

export default CategoriesDisplay;