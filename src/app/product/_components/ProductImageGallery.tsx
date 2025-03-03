// ProductImageGallery.tsx (Client Component)
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import * as motion from "motion/react-m";

interface ProductImageGalleryProps {
  images: string[];
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images  }) => {
  const [mainImage, setMainImage] = useState(0);

  return (
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
  );
};

export default ProductImageGallery;