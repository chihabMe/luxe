// ProductInfo.tsx (Client Component)
"use client";
import React, { useState } from "react";
import * as motion from "motion/react-m";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Truck, Clock, Info, Check } from "lucide-react";
import { toast } from "sonner";
import { siteInfos } from "@/constants";

interface SpecValue {
  id: string;
  value: string;
}

interface Specification {
  name: string;
  values: SpecValue[];
}

interface ProductInfoProps {
  product: any;
  availableSizes: string[];
  color: string;
  restSpects: Specification[];
}


const colorMap: Record<string, string> = {
  // French color names (lowercase)
  "noir": "#000000",
  "blanc": "#FFFFFF",
  "rouge": "#FF0000",
  "bleu": "#0000FF",
  "vert": "#008000",
  "jaune": "#FFFF00",
  "orange": "#FFA500",
  "violet": "#800080",
  "rose": "#FFC0CB",
  "gris": "#808080",
  "marron": "#8B4513",
  "beige": "#F5F5DC",
  "turquoise": "#40E0D0",
  "bordeaux": "#800020",
  "marine": "#000080",
  "lavande": "#E6E6FA",
  "corail": "#FF7F50",
  "or": "#FFD700",
  "argent": "#C0C0C0",
  "chocolat": "#D2691E",
  "crème": "#FFFDD0",
  "écru": "#F5F5DC",
  "fuchsia": "#FF00FF",
  "indigo": "#4B0082",
  "kaki": "#C3B091",
  "olive": "#808000",
  "taupe": "#483C32",
  
  // English color names (lowercase)
  "black": "#000000",
  "white": "#FFFFFF",
  "red": "#FF0000",
  "blue": "#0000FF",
  "green": "#008000",
  "yellow": "#FFFF00",
  "purple": "#800080",
  "pink": "#FFC0CB",
  "gray": "#808080",
  "brown": "#8B4513",
  "teal": "#008080",
  "navy": "#000080",
  "gold": "#FFD700",
  "silver": "#C0C0C0",
  "ivory": "#FFFFF0",
};

// Map common color names to hex codes
const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  availableSizes,
  color,
  restSpects,
}) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>(color.split(", ")[0] || color);
  
  // Parse color options if they are available
  const colorOptions = color.split(", ").filter(c => c.trim() !== "");

  // Helper function to get specification values as a string
  const getSpecValues = (spec: Specification): string => {
    return spec.values.map(val => val.value).join(", ");
  };
  
  // Helper function to get color hex code from color name
  const getColorHex = (colorName: string): string => {
    // Convert to lowercase for case-insensitive matching
    const lowerColor = colorName.toLowerCase();
    
    // Check if any part of the color name matches our color map
    for (const [key, value] of Object.entries(colorMap)) {
      if (lowerColor.includes(key)) {
        return value;
      }
    }
    
    // Default color if no match found
    return "#CCCCCC";
  };

  // Create WhatsApp message and redirect
  const handleBuyNowClick = () => {
    if (!selectedSize) {
      toast("Veuillez sélectionner une taille");
      return;
    }
    
    // Create the message text
    const message = `Bonjour, je souhaite commander ce produit:\n\n*${product.mark} - ${product.name}*\n\nTaille: ${selectedSize}\nCouleur: ${selectedColor}\n\nMerci!`;
    
    // Encode the message for the URL
    const encodedMessage = encodeURIComponent(message);
    
    // WhatsApp phone number from site info
    const phoneNumber = siteInfos.commandPhone;
    
    // Create the WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold mb-1">{product.mark}</h1>
      <p className="text-gray-600 mb-4">{product.name}</p>

      {/* Color Selection */}
      {colorOptions.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium mb-2">Couleurs disponibles</h3>
          <div className="flex flex-wrap gap-3">
            {colorOptions.map((c) => {
              const isSelected = selectedColor === c;
              const colorHex = getColorHex(c);
              
              return (
                <div 
                  key={c} 
                  className="flex flex-col items-center gap-1 cursor-pointer" 
                  onClick={() => setSelectedColor(c)}
                >
                  <div 
                    className={`h-10 w-10 rounded-xl ring-2 ring-primary/10 relative ${isSelected ? 'ring-2 ring-offset-2 ring-black' : ''}`}
                    style={{ backgroundColor: colorHex }}
                  >
                    {isSelected && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Check className={`h-5 w-5 ${colorHex === '#FFFFFF' || colorHex === '#FFFFF0' || colorHex === '#F5F5DC' || colorHex === '#FFFDD0' ? 'text-black' : 'text-white'}`} />
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-center font-medium">{c}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Size Selection */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Tailles disponibles</h3>
        <div className="flex flex-wrap gap-2">
          {availableSizes.map((s) => (
            <Button
              key={s}
              variant={selectedSize === s ? "default" : "outline"}
              className="h-10 w-10 p-0"
              onClick={() => setSelectedSize(s)}
            >
              {s}
            </Button>
          ))}
        </div>
      </div>

      {/* Buy Now Button */}
      <Button 
        className="w-full py-6 bg-[#FF7B7B]/90 hover:bg-[#FF7B7B] mb-6 text-lg font-medium"
        onClick={handleBuyNowClick}
      >
        ACHETER MAINTENANT
      </Button>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-start gap-3 py-2 border-b">
            <Info className="h-5 w-5 mt-0.5 text-gray-500" />
            <div>
            <p className="text-sm">nous garantissons la livraison la plus rapide possible</p>
            </div>
          </div>
          <div className="flex items-start gap-3 py-2 border-b">
            <Truck className="h-5 w-5 mt-0.5 text-gray-500" />
            <div>
              <p className="text-sm">Livraison gratuite</p>
            </div>
          </div>
          <div className="flex items-start gap-3 py-2">
            <Clock className="h-5 w-5 mt-0.5 text-gray-500" />
            <div>
              <p className="text-sm">Paiement à la livraison disponible</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="mb-6">
        <AccordionItem value="description">
          <AccordionTrigger>Description</AccordionTrigger>
          <AccordionContent>
            <p className="mb-2">{product.description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p>
                  <strong>Référence:</strong> {product.reference || "-"}
                </p>
                <p>
                  <strong>Catégorie:</strong> {product.category.name}
                </p>
                {color && (
                  <p>
                    <strong>Couleur:</strong> {color}
                  </p>
                )}
              </div>
              <div>
                <p>
                  <strong>Marque:</strong> {product.mark}
                </p>
                {/* Display other specifications */}
                {restSpects.map((spec) => (
                  <p key={spec.name}>
                    <strong>{spec.name}:</strong> {getSpecValues(spec)}
                  </p>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        {/* <AccordionItem value="materials">
          <AccordionTrigger>Matières et entretien</AccordionTrigger>
          <AccordionContent>
            <p>Tissage: Satiné</p>
            <p>Semelle extérieure: Autres matières</p>
            <p>Hauteur de talon: {product.heelHeight || "-"}cm</p>
          </AccordionContent>
        </AccordionItem> */}
        <AccordionItem value="delivery">
          <AccordionTrigger>Livraison</AccordionTrigger>
          <AccordionContent>
            <p>Livraison gratuite</p>
            <p>Expédition sous 24h à 48h ouvrées</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="payment">
          <AccordionTrigger>Paiement à la livraison</AccordionTrigger>
          <AccordionContent>
            <p>Paiement à la livraison uniquement</p>
            <p>OMSE</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
};

export default ProductInfo;