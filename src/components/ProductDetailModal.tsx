import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Heart } from 'lucide-react';
import { useCart } from './cart/CartProvider';
import { useToast } from "@/hooks/use-toast";
import { playTickSound } from '../utils/audio';
import { motion } from 'framer-motion';
import ColorSelector from './product-detail/ColorSelector';
import SizeSelector from './product-detail/SizeSelector';
import QuantitySelector from './product-detail/QuantitySelector';
import PersonalizationButton from './product-detail/PersonalizationButton';
import { getPersonalizations } from '@/utils/personalizationStorage';
import ProductDetailHeader from './product-detail/ProductDetailHeader';
import ProductDetailContent from './product-detail/ProductDetailContent';
import ProductDetailActions from './product-detail/ProductDetailActions';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    name: string;
    material: string;
    color: string;
    price: number;
    image: string;
    description: string;
    status: string;
    itemgroup_product?: string;
  };
}

const ProductDetailModal = ({ isOpen, onClose, product }: ProductDetailModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [withBox, setWithBox] = useState<boolean | null>(null);
  const [personalization, setPersonalization] = useState(() => {
    const savedPersonalizations = getPersonalizations();
    return savedPersonalizations[product.id] || '';
  });
  
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Veuillez sélectionner une taille",
        description: "Une taille doit être sélectionnée avant d'ajouter au panier",
        variant: "destructive",
      });
      return;
    }

    if (product.itemgroup_product === 'chemises' && withBox === null) {
      toast({
        title: "Veuillez choisir une option de boîte",
        description: "Sélectionnez si vous souhaitez une boîte avec votre chemise",
        variant: "destructive",
      });
      return;
    }

    addItemToCart(withBox || false);
  };

  const addItemToCart = (withBox: boolean = false) => {
    const productName = withBox ? `${product.name} [Avec boîte]` : product.name;

    addToCart({
      id: product.id,
      name: productName,
      price: product.price,
      image: product.image,
      quantity: quantity,
      size: selectedSize,
      color: product.color,
      personalization: personalization,
      withBox: withBox
    });

    playTickSound();
    toast({
      title: "Produit ajouté au panier",
      description: `${quantity} x ${productName} (${selectedSize}) ajouté avec succès`,
      duration: 5000,
      style: {
        backgroundColor: '#700100',
        color: 'white',
        border: '1px solid #590000',
      },
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-[1000px] p-0 bg-white rounded-lg shadow-xl overflow-hidden mx-auto">
        <div className="flex flex-col lg:flex-row h-[90vh] lg:h-auto">
          {/* Left Column - Image */}
          <div className="w-full lg:w-1/2 relative bg-gray-50 p-6">
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="absolute right-4 top-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors z-10"
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-[#700100] text-[#700100]' : 'text-gray-400'}`} />
            </button>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="h-full flex items-center justify-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
              />
            </motion.div>
          </div>

          {/* Right Column - Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col overflow-hidden">
            <ProductDetailHeader
              onClose={onClose}
              name={product.name}
              price={product.price}
              status={product.status}
            />

            <div className="flex-1 overflow-y-auto">
              <ProductDetailContent
                description={product.description}
                material={product.material}
                color={product.color}
                id={product.id}
              />

              <div className="p-6 space-y-6">
                <SizeSelector
                  selectedSize={selectedSize}
                  sizes={['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']}
                  onSizeSelect={setSelectedSize}
                />

                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-900">Quantité</span>
                  <QuantitySelector
                    quantity={quantity}
                    onIncrement={() => setQuantity(q => q + 1)}
                    onDecrement={() => setQuantity(q => q > 1 ? q - 1 : 1)}
                  />
                </div>

                {product.itemgroup_product === 'chemises' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Souhaitez-vous une boîte avec votre chemise ?</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setWithBox(true)}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                          withBox === true 
                            ? 'border-[#700100] bg-[#700100]/10' 
                            : 'border-gray-200 hover:border-[#700100]'
                        }`}
                      >
                        <div className="aspect-square mb-2 bg-[#700100]/5 rounded-lg flex items-center justify-center">
                          <img 
                            src="/Menu/Sur musure .png" 
                            alt="Box" 
                            className="w-20 h-20 object-contain"
                          />
                        </div>
                        <p className="text-center font-medium">Avec boîte</p>
                      </button>
                      <button
                        onClick={() => setWithBox(false)}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                          withBox === false 
                            ? 'border-[#700100] bg-[#700100]/10' 
                            : 'border-gray-200 hover:border-[#700100]'
                        }`}
                      >
                        <div className="aspect-square mb-2 bg-[#700100]/5 rounded-lg flex items-center justify-center">
                          <span className="text-4xl text-gray-400">✕</span>
                        </div>
                        <p className="text-center font-medium">Sans boîte</p>
                      </button>
                    </div>
                  </div>
                )}

                <PersonalizationButton
                  productId={product.id}
                  onSave={setPersonalization}
                  initialText={personalization}
                />
              </div>
            </div>

            <ProductDetailActions
              onAddToCart={handleAddToCart}
              status={product.status}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;