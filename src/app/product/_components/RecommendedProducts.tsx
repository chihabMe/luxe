// RecommendedProducts.tsx (Client Component)
"use client";
import React, { useState } from "react";
import * as motion from "motion/react-m";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ChevronLeft, Heart } from "lucide-react";
import Image from "next/image";
import { getRecommendedProducts } from "@/app/data/products-data";
import Link from "next/link";

interface RecommendedProductsProps {
  products: Awaited<ReturnType<typeof getRecommendedProducts>>
}

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({ products }) => {
  const [recommendedScrollPosition, setRecommendedScrollPosition] = useState(0);
  const maxScroll = Math.max(0, products.length - 4); // Show 4 items at a time on desktop
  
  const scrollRecommended = (direction: "left" | "right") => {
    if (direction === "left" && recommendedScrollPosition > 0) {
      setRecommendedScrollPosition(recommendedScrollPosition - 1);
    } else if (direction === "right" && recommendedScrollPosition < maxScroll) {
      setRecommendedScrollPosition(recommendedScrollPosition + 1);
    }
  };
  
  return (
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
          {products.map((product) => {
            // Find main image or use first image
            const mainImage = product.images.find(img => img.isMain) || product.images[0];
            
            return (
              <motion.div
                key={product.id}
                className="min-w-[240px] border rounded-md overflow-hidden"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Link href={`/product/${product.slug}`}>
                  <div className="relative">
                    {mainImage ? (
                      <Image
                        width={650}
                        height={650}
                        src={mainImage.url}
                        alt={product.name}
                        className="w-full h-64 object-cover"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                        No image
                      </div>
                    )}
                    
                    {product.isFeatured && (
                      <Badge className="absolute top-2 left-2 bg-gray-900 text-white">
                        FEATURED
                      </Badge>
                    )}
                    
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute bottom-2 right-2 rounded-full bg-white"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </Link>
                <div className="p-3">
                  <div className="text-xs text-gray-500 mb-1">
                    {product.category?.name || ""}
                  </div>
                  <h3 className="font-medium truncate">{product.name}</h3>
                  <div className="text-xs text-gray-600 mt-1">{product.mark}</div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default RecommendedProducts;