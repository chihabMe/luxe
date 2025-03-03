"use client";
import Image from "next/image";
import * as motion from "motion/react-m";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {  Heart   } from "lucide-react";
import { searchAndFilterInAllProducts } from "@/app/data/products-data";
import Link from "next/link";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

// Define type based on your DB schema to improve type safety
interface ProductCardProps {
  product: Awaited<ReturnType<typeof searchAndFilterInAllProducts>>["data"][0];
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get all product images
  const productImages =
    product.images.length > 0
      ? product.images.map((img) => img.url)
      : ["/placeholder-product.jpg"];

  // Get main image first, if it exists
  const mainImageIndex = product.images.findIndex((img) => img.isMain);
  if (mainImageIndex !== -1 && mainImageIndex !== 0) {
    const mainImg = productImages.splice(mainImageIndex, 1)[0];
    productImages.unshift(mainImg);
  }

  // Function to get specification value
  // const getSpecValue = (specName: string) => {
  //   const spec = product.specifications.find((s) => s.name === specName);
  //   if (!spec || !spec.values || spec.values.length === 0) return null;
  //   return spec.values[0].value;
  // };

  // // Extract specifications
  // const isNew = getSpecValue("isNew") === "true";
  // const isSecondHand = getSpecValue("isSecondHand") === "true";
  const colors =
    product.specifications
      .find((s) => s.name.toLowerCase().includes("color") || s.name.toLowerCase().includes("couleurs"))
      ?.values.map((v) => v.value) || [];
  const sizes =
    product.specifications
      .find((s) => s.name.toLowerCase().includes("size") || s.name.toLowerCase().includes("taille"))
      ?.values.map((v) => v.value) || [];

  // Handle image cycling on hover
  const cycleImage = () => {
    if (productImages.length > 1 && isHovered) {
      const timer = setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
      }, 1500);
      return () => clearTimeout(timer);
    }
  };

  // Set up image cycling
  useState(() => {
    return cycleImage();
  });


  return (
    <Link href={`/product/${product.slug}`}>
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-full"
    >
      <Card className="h-full overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="relative">
          {/* Status badges */}
          <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
            {/* {isNew && (
              <span className="bg-black text-white text-xs font-medium py-1 px-2 rounded-md">
                NEW
              </span>
            )} */}
            {/* {isSecondHand && (
              <span className="bg-teal-700 text-white text-xs font-medium py-1 px-2 rounded-md">
                SECONDE MAIN
              </span>
            )} */}
            {product.isFeatured && (
              <span className="bg-amber-500 text-white text-xs font-medium py-1 px-2 rounded-md">
                FEATURED
              </span>
            )}
          </div>

          {/* Product image with animation */}
          <div className="overflow-hidden h-64 bg-gray-50">
            <motion.div
              initial={false}
              animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <Image
                width={800}
                height={800}
                src={productImages[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
                priority={productImages[currentImageIndex] === productImages[0]}
              />
            </motion.div>
          </div>

          {/* Action buttons */}
          <motion.div
            className="absolute bottom-2 right-2 z-10 flex gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50">
              <Heart size={18} className="text-gray-700" />
            </button>
          </motion.div>

          {/* Image dots for multiple images */}
          {productImages.length > 1 && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
              {productImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-1.5 h-1.5 rounded-full ${
                    currentImageIndex === index ? "bg-black" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <CardContent className="p-4">
          {/* Brand name */}
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {product.mark}
          </p>

          {/* Product name */}
          <h3 className="text-sm font-medium mt-1 line-clamp-2 h-10">
            {product.name}
          </h3>

          {/* Category / Collection */}
          <p className="text-xs text-gray-500 mt-1">{product.category?.name}</p>

          {/* Colors & Sizes */}
          <div className="mt-3 flex flex-wrap gap-2">
            {colors.length > 0 && (
              <div className="flex items-center gap-1 flex-wrap">
                {colors.slice(0, 3).map((color, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
                {colors.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{colors.length - 3}
                  </span>
                )}
              </div>
            )}

            {sizes.length > 0 && (
              <div className="flex items-center gap-1 text-xs text-gray-600">
                {sizes.slice(0, 3).join(", ")}
                {sizes.length > 3 && ` +${sizes.length - 3}`}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
    </Link>
  );
};

export default ProductCard;
