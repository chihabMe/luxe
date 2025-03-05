"use client";
import React, { useState, useRef, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Touch scrolling state
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Responsive design and touch scrolling logic
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate max scroll with precise product and gap widths
  const calculateMaxScroll = () => {
    // const productWidth = 260; // Desktop width
    // const productGap = 16; // Tailwind gap-4 is 1rem = 16px
    const visibleProducts = isMobile ? 2 : 4;
    
    // Total width of all products and gaps
    // const totalWidth = products.length * productWidth + (products.length - 1) * productGap;
    
    // // Visible area width (approximate container width)
    // const visibleAreaWidth = visibleProducts * productWidth + (visibleProducts - 1) * productGap;
    
    // Calculate max scroll position to ensure last product is fully visible
    const maxScrollPosition = Math.max(0, products.length - visibleProducts);
    
    return maxScrollPosition;
  };

  const maxScroll = calculateMaxScroll();
  
  const scrollRecommended = (direction: "left" | "right") => {
    if (direction === "left" && recommendedScrollPosition > 0) {
      setRecommendedScrollPosition(recommendedScrollPosition - 1);
    } else if (direction === "right" && recommendedScrollPosition < maxScroll) {
      setRecommendedScrollPosition(recommendedScrollPosition + 1);
    }
  };

  // Touch event handlers for mobile scrolling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      scrollRecommended("right");
    }

    if (touchStart - touchEnd < -75) {
      // Swipe right
      scrollRecommended("left");
    }
  };
  
  // Calculate translation based on precise widths
  const calculateTranslation = () => {
    const productWidth = 260; // Desktop width
    const productGap = 16; // Tailwind gap-4 is 1rem = 16px
    return recommendedScrollPosition * (productWidth + productGap);
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
            className="hidden md:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scrollRecommended("right")}
            disabled={recommendedScrollPosition >= maxScroll}
            className="hidden md:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div 
        className="relative overflow-hidden"
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          className="flex gap-4 will-change-transform"
          initial={{ x: 0 }}
          animate={{ 
            x: `-${calculateTranslation()}px` 
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {products.map((product) => {
            // Find main image or use first image
            const mainImage = product.images.find(img => img.isMain) || product.images[0];
            
            return (
              <motion.div
                key={product.id}
                className={`
                  min-w-[240px] md:min-w-[260px] 
                  border rounded-md overflow-hidden 
                  flex-shrink-0
                `}
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