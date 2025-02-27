'use client';
import React, { useState } from 'react';
import * as motion from "motion/react-m"
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Heart,  Truck, Clock, Info } from "lucide-react";

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState(0);
const [size, setSize] = useState<string | null>(null);
  
  const images = [
    "/api/placeholder/400/500",
    "/api/placeholder/400/500",
    "/api/placeholder/400/500"
  ];
  
  const productDetails = {
    brand: "CATERPILLAR",
    name: "Chaussures professionnelles - Tissage satiné - Outlet",
    price: 99.75,
    originalPrice: 199.50,
    discount: "-50%",
    reference: "2459306PX",
    color: "marron",
    closure: "Lacets",
    material: "Satiné",
    heelHeight: "2",
    category: "Chaussures professionnelles homme",
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    inStock: true,
    freeShipping: true,
    delivery24h: true
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left - Product Images */}
        <div>
          <div className="relative aspect-square mb-4 overflow-hidden rounded-md border">
            <motion.img
              key={mainImage}
              src={images[mainImage]}
              alt="Product image"
              className="object-cover w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 rounded-full bg-white"
              onClick={() => console.log('Added to wishlist')}
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Badge className="absolute top-4 left-4 bg-red-500">{productDetails.discount}</Badge>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {images.map((img, idx) => (
              <motion.div
                key={idx}
                className={`border rounded-md overflow-hidden cursor-pointer ${mainImage === idx ? 'ring-2 ring-black' : ''}`}
                whileHover={{ scale: 1.05 }}
                onClick={() => setMainImage(idx)}
              >
                <img src={img} alt={`Product thumbnail ${idx + 1}`} className="w-full h-24 object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Right - Product Info */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold mb-1">{productDetails.brand}</h1>
            <p className="text-gray-600 mb-4">{productDetails.name}</p>
            
            <div className="flex items-baseline mb-6">
              <span className="text-3xl font-bold mr-3">{productDetails.price}€</span>
              <span className="text-gray-500 line-through mr-2">Prix boutique: {productDetails.originalPrice}€</span>
              <Badge className="bg-red-500">{productDetails.discount}</Badge>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Tailles disponibles</h3>
              <div className="flex flex-wrap gap-2">
                {productDetails.sizes.map((s) => (
                  <Button
                    key={s}
                    variant={size === s ? "default" : "outline"}
                    className="h-10 w-10 p-0"
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </Button>
                ))}
              </div>
            </div>
            
            <Button className="w-full py-6 bg-[#FF7B7B]/90 hover:bg-[#FF7B7B]  mb-6 text-lg font-medium">
              ACHETER MAINTENANT
            </Button>
            
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 py-2 border-b">
                  <Info className="h-5 w-5 mt-0.5 text-gray-500" />
                  <div>
                    <p className="text-sm">En stock et expédié par Modz</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 py-2 border-b">
                  <Truck className="h-5 w-5 mt-0.5 text-gray-500" />
                  <div>
                    <p className="text-sm">Livraison offerte dès 100€</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 py-2">
                  <Clock className="h-5 w-5 mt-0.5 text-gray-500" />
                  <div>
                    <p className="text-sm">Article expédié en 24h</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Accordion type="single" collapsible className="mb-6">
              <AccordionItem value="description">
                <AccordionTrigger>Description</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">Chaussures Professionnelles Caterpillar Marron Bout Rond</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Référence:</strong> {productDetails.reference}</p>
                      <p><strong>Catégorie:</strong> {productDetails.category}</p>
                      <p><strong>Bout:</strong> Rond</p>
                    </div>
                    <div>
                      <p><strong>Marque:</strong> Caterpillar</p>
                      <p><strong>Couleur:</strong> {productDetails.color}</p>
                      <p><strong>Fermeture:</strong> {productDetails.closure}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="materials">
                <AccordionTrigger>Matières et entretien</AccordionTrigger>
                <AccordionContent>
                  <p>Tissage: Satiné</p>
                  <p>Semelle extérieure: Autres matières</p>
                  <p>Hauteur de talon: {productDetails.heelHeight}cm</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="delivery">
                <AccordionTrigger>Livraison</AccordionTrigger>
                <AccordionContent>
                  <p>Livraison offerte à partir de 100€</p>
                  <p>Expédition sous 24h</p>
                  <p>Livraison à domicile ou en point relais</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="payment">
                <AccordionTrigger>Paiement</AccordionTrigger>
                <AccordionContent>
                  <p>Paiement sécurisé</p>
                  <p>Carte bancaire, PayPal</p>
                  <p>Paiement en 3x sans frais disponible</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;