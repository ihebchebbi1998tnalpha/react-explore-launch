import React, { useState } from 'react';
import { Product } from '@/types/product';
import { playTickSound } from '@/utils/audio';
import { toast } from '@/components/ui/use-toast';
import GiftPackContainer from './containers/GiftPackContainer';
import AddItemDialog from './dialogs/AddItemDialog';
import ProductDetailsDialog from './dialogs/ProductDetailsDialog';
import AddItemParticles from '../effects/AddItemParticles';

interface GiftBasket3DProps {
  items: Product[];
  onItemDrop: (item: Product, size: string, personalization: string) => void;
  onRemoveItem?: (index: number) => void;
}

const GiftBasket3D = ({ items, onItemDrop, onRemoveItem }: GiftBasket3DProps) => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [personalization, setPersonalization] = useState('');
  const [droppedItem, setDroppedItem] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [targetContainer, setTargetContainer] = useState<number>(0);
  const [particlePosition, setParticlePosition] = useState<{ x: number; y: number } | null>(null);

  const handleDrop = (containerId: number) => (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const item = JSON.parse(e.dataTransfer.getData('product'));
    setDroppedItem(item);
    setTargetContainer(containerId);
    setShowAddDialog(true);
    playTickSound();
    
    const rect = e.currentTarget.getBoundingClientRect();
    setParticlePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    setTimeout(() => {
      setParticlePosition(null);
    }, 1000);
  };

  const handleConfirm = () => {
    if (droppedItem && selectedSize && onItemDrop) {
      onItemDrop(droppedItem, selectedSize, personalization);
      setShowAddDialog(false);
      setSelectedSize('');
      setPersonalization('');
      setDroppedItem(null);
      toast({
        title: "Article ajouté au pack",
        description: "L'article a été ajouté avec succès à votre pack cadeau",
        style: {
          backgroundColor: '#700100',
          color: 'white',
          border: '1px solid #590000',
        },
        duration: 3000,
      });
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleRemoveItem = (index: number) => {
    if (onRemoveItem) {
      onRemoveItem(index);
      toast({
        title: "Article retiré",
        description: "L'article a été retiré de votre pack cadeau",
        style: {
          backgroundColor: '#700100',
          color: 'white',
          border: '1px solid #590000',
        },
      });
    }
  };

  const packContainers = [
    { title: "Grand Format", item: items[0], className: "col-span-full mb-4" },
    { title: "Format Standard", item: items[1], className: "col-span-1" },
    { title: "Format Standard", item: items[2], className: "col-span-1" }
  ];

  return (
    <div className="space-y-4">
      {/* Main container with custom red background and black border */}
      <div className="p-6 bg-[#ab2a3a]/10 border-2 border-black rounded-xl shadow-xl">
        <div className="grid grid-cols-1 gap-4">
          <div className="relative">
            <GiftPackContainer
              key={0}
              title={packContainers[0].title}
              item={packContainers[0].item}
              onDrop={handleDrop(0)}
              onItemClick={handleProductClick}
              onRemoveItem={() => handleRemoveItem(0)}
              containerIndex={0}
              className="h-[250px] bg-white/95 backdrop-blur-sm shadow-xl rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:border-[#ab2a3a]/20"
            />
            {particlePosition && targetContainer === 0 && (
              <AddItemParticles position={particlePosition} />
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {packContainers.slice(1).map((pack, index) => (
            <div key={index + 1} className="relative">
              <GiftPackContainer
                title={pack.title}
                item={pack.item}
                onDrop={handleDrop(index + 1)}
                onItemClick={handleProductClick}
                onRemoveItem={() => handleRemoveItem(index + 1)}
                containerIndex={index + 1}
                className="h-[200px] bg-white/95 backdrop-blur-sm shadow-xl rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:border-[#ab2a3a]/20"
              />
              {particlePosition && targetContainer === index + 1 && (
                <AddItemParticles position={particlePosition} />
              )}
            </div>
          ))}
        </div>
      </div>

      <AddItemDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        droppedItem={droppedItem}
        selectedSize={selectedSize}
        personalization={personalization}
        onSizeSelect={setSelectedSize}
        onPersonalizationChange={setPersonalization}
        onConfirm={handleConfirm}
      />

      <ProductDetailsDialog
        open={showProductModal}
        onOpenChange={setShowProductModal}
        product={selectedProduct}
      />
    </div>
  );
};

export default GiftBasket3D;