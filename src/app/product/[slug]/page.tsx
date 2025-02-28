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
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  Heart,
  Truck,
  Clock,
  Info, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar/navbar";
import Footer from "@/components/Footer";
const recommendedProducts = [
  {
    id: 1,
    name: "LA FEE MARABOUTEE",
    image: "/api/placeholder/240/300",
    price: 72.5,
    originalPrice: 145.0,
    discount: "-50%",
    category: "VESTE EN CUIR",
    isNew: true,
    isSecondHand: false,
  },
  {
    id: 2,
    name: "KAREN RITZI",
    image: "/api/placeholder/240/300",
    price: 339.5,
    originalPrice: 679.0,
    discount: "-50%",
    category: "TRENCH",
    isNew: true,
    isSecondHand: false,
  },
  {
    id: 3,
    name: "EXZ BY EXISTENZ",
    image: "/api/placeholder/240/300",
    price: 94.5,
    originalPrice: 189.0,
    discount: "-50%",
    category: "BLAZER",
    isNew: true,
    isSecondHand: false,
  },
  {
    id: 4,
    name: "GOMMA",
    image: "/api/placeholder/240/300",
    price: 87.5,
    originalPrice: 175.0,
    discount: "-50%",
    category: "VESTE EN JEAN",
    isNew: false,
    isSecondHand: true,
  },
];

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState(0);
  const [size, setSize] = useState<string | null>(null);

  const images = [
    "/api/placeholder/400/500",
    "/api/placeholder/400/500",
    "/api/placeholder/400/500",
  ];

  const productDetails = {
    brand: "CATERPILLAR",
    name: "Chaussures professionnelles - Tissage satiné - Outlet",
    price: 99.75,
    originalPrice: 199.5,
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
    delivery24h: true,
  };
  const [recommendedScrollPosition, setRecommendedScrollPosition] = useState(0);
  const maxScroll = recommendedProducts.length - 4; // Show 4 items at a time on desktop

  const scrollRecommended = (direction: "left" | "right") => {
    if (direction === "left" && recommendedScrollPosition > 0) {
      setRecommendedScrollPosition(recommendedScrollPosition - 1);
    } else if (direction === "right" && recommendedScrollPosition < maxScroll) {
      setRecommendedScrollPosition(recommendedScrollPosition + 1);
    }
  };

  return (
    <>
    <Navbar/>
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
              onClick={() => console.log("Added to wishlist")}
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Badge className="absolute top-4 left-4 bg-red-500">
              {productDetails.discount}
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {images.map((img, idx) => (
              <motion.div
                key={idx}
                className={`border rounded-md overflow-hidden cursor-pointer ${
                  mainImage === idx ? "ring-2 ring-black" : ""
                }`}
                whileHover={{ scale: 1.05 }}
                onClick={() => setMainImage(idx)}
              >
                <Image
                width={300}
                height={300}
                  src={img}
                  alt={`Product thumbnail ${idx + 1}`}
                  className="w-full h-24 object-cover"
                />
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
              <span className="text-3xl font-bold mr-3">
                {productDetails.price}€
              </span>
              <span className="text-gray-500 line-through mr-2">
                Prix boutique: {productDetails.originalPrice}€
              </span>
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
                  <p className="mb-2">
                    Chaussures Professionnelles Caterpillar Marron Bout Rond
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p>
                        <strong>Référence:</strong> {productDetails.reference}
                      </p>
                      <p>
                        <strong>Catégorie:</strong> {productDetails.category}
                      </p>
                      <p>
                        <strong>Bout:</strong> Rond
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Marque:</strong> Caterpillar
                      </p>
                      <p>
                        <strong>Couleur:</strong> {productDetails.color}
                      </p>
                      <p>
                        <strong>Fermeture:</strong> {productDetails.closure}
                      </p>
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
      <div className="mt-16 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Vous aimerez aussi</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollRecommended("left")}
              disabled={recommendedScrollPosition === 0}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollRecommended("right")}
              disabled={recommendedScrollPosition >= maxScroll}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-4"
            initial={{ x: 0 }}
            animate={{ x: `-${recommendedScrollPosition * 260}px` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {recommendedProducts.map((product) => (
              <motion.div
                key={product.id}
                className="min-w-[240px] border rounded-md overflow-hidden"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="relative">
                  <Image
                  width={650}
                  height={650}
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  {product.isNew && (
                    <Badge className="absolute top-2 left-2 bg-gray-900 text-white">
                      NEW
                    </Badge>
                  )}
                  {product.isSecondHand && (
                    <Badge className="absolute top-2 left-2 bg-teal-700 text-white">
                      SECONDE MAIN
                    </Badge>
                  )}
                  <Badge className="absolute top-2 right-2 bg-red-500">
                    {product.discount}
                  </Badge>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute bottom-2 right-2 rounded-full bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-3">
                  <div className="text-xs text-gray-500 mb-1">
                    {product.category}
                  </div>
                  <h3 className="font-medium">{product.name}</h3>
                  <div className="flex items-center mt-2">
                    <span className="font-bold">{product.price}€</span>
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      {product.originalPrice}€
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Recently Viewed Section */}
      <div className="mt-16 mb-8">
        <h2 className="text-2xl font-bold mb-6">Dernièrement consultés</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recommendedProducts.slice(0, 4).map((product) => (
            <motion.div
              key={`recent-${product.id}`}
              className="border rounded-md overflow-hidden"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="relative">
                <Image
                width={500}
                height={500}
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-red-500">
                  {product.discount}
                </Badge>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm truncate">{product.name}</h3>
                <div className="flex items-center mt-1">
                  <span className="font-bold text-sm">{product.price}€</span>
                  <span className="ml-2 text-xs text-gray-500 line-through">
                    {product.originalPrice}€
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ProductDetails;
