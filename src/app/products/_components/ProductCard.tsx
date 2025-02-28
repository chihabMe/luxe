"use client"
import Image from "next/image";
import *as motion from "motion/react-m"
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge, Heart } from "lucide-react";
import Product from "@/app/interfaces/Product";


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


const ProductCard = ({ product }: { product: Product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="h-full overflow-hidden border border-gray-200">
        <div className="relative">
          {product.discount > 0 && (
            <Badge className="absolute top-2 right-2 bg-pink-500 text-white">
              -{product.discount}%
            </Badge>
          )}
          {product.isNew && (
            <Badge className="absolute top-2 left-2 bg-black text-white">
              NEW
            </Badge>
          )}
          {product.isSecondHand && (
            <Badge className="absolute bottom-2 left-2 bg-teal-700 text-white">
              SECONDE MAIN
            </Badge>
          )}
          <motion.div
            className="overflow-hidden"
            initial={false}
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              width={800}
              height={800}
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
          </motion.div>
          <motion.div
            className="absolute right-2 top-10 bg-white rounded-full p-2 shadow-md cursor-pointer"
            initial={{ opacity: 0 }}
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Heart size={20} className="text-gray-600" />
          </motion.div>
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mt-2">
            <div>
              <p className="text-xl font-bold">{product.price.toFixed(2)}€</p>
              <p className="text-sm text-gray-500 line-through">
                Prix boutique: {product.originalPrice.toFixed(2)}€
              </p>
            </div>
          </div>
          <h3 className="text-sm font-medium mt-2">{product.name}</h3>
          <p className="text-xs text-gray-500 mt-1">{product.category}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;