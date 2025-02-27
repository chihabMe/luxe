"use client";
import React, { useState, useEffect } from "react";
import * as motion from "motion/react-m";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  ChevronDown,
  ChevronRight,
  Link,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Product data based on the screenshots
const products = [
  {
    id: 1,
    name: "LA FEE MARABOUTEE",
    price: 72.5,
    originalPrice: 145.0,
    discount: 50,
    image: "/api/placeholder/280/350",
    category: "Vestes",
    isNew: true,
    isSecondHand: true,
  },
  {
    id: 2,
    name: "KAREN RITZI",
    price: 339.5,
    originalPrice: 679.0,
    discount: 50,
    image: "/api/placeholder/280/350",
    category: "Vestes",
    isNew: true,
    isSecondHand: false,
  },
  {
    id: 3,
    name: "EXZ BY EXISTENZ",
    price: 94.5,
    originalPrice: 189.0,
    discount: 50,
    image: "/api/placeholder/280/350",
    category: "Vestes",
    isNew: true,
    isSecondHand: false,
  },
  {
    id: 4,
    name: "GOMMA",
    price: 87.5,
    originalPrice: 175.0,
    discount: 50,
    image: "/api/placeholder/280/350",
    category: "Vestes",
    isNew: true,
    isSecondHand: false,
  },
  {
    id: 5,
    name: "Veste en Cuir Noir",
    price: 120.0,
    originalPrice: 240.0,
    discount: 50,
    image: "/api/placeholder/280/350",
    category: "Vestes en Cuir",
    isNew: false,
    isSecondHand: true,
  },
  {
    id: 6,
    name: "Veste Bleue",
    price: 110.0,
    originalPrice: 220.0,
    discount: 50,
    image: "/api/placeholder/280/350",
    category: "Vestes",
    isNew: false,
    isSecondHand: true,
  },
  {
    id: 7,
    name: "CATERPILLAR",
    price: 99.75,
    originalPrice: 199.5,
    discount: 50,
    image: "/api/placeholder/280/350",
    category: "Chaussures",
    isNew: false,
    isSecondHand: false,
  },
  {
    id: 8,
    name: "Blazer Beige",
    price: 85.0,
    originalPrice: 170.0,
    discount: 50,
    image: "/api/placeholder/280/350",
    category: "Blazers",
    isNew: false,
    isSecondHand: false,
  },
];

// Categories based on the screenshots
const categories = [
  "Nouveautés",
  "Vêtements",
  "Chaussures",
  "Lingerie, Nuit & Bain",
  "Accessoires & Bijoux",
  "Beauté",
  "Top marques",
  "Outlet",
  "Seconde main",
  "Collection",
];

const subCategories = [
  "Chaussures",
  "Robes",
  "Vestes",
  "Chemises et blouses",
  "Accessoires",
  "Sélection Luxe",
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const ProductCard = ({ product }: { product: (typeof products)[0] }) => {
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
            <img
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

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [visibleProducts, setVisibleProducts] = useState<typeof products>([]);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    // Simulate products loading
    const timer = setTimeout(() => {
      setVisibleProducts(products);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Categories navigation */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex overflow-x-auto py-4 no-scrollbar"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            {categories.map((category, index) => (
              <Button
                key={index}
                variant="ghost"
                className="text-sm whitespace-nowrap mr-6 last:mr-0"
              >
                {category}
              </Button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Banner */}
      {showBanner && (
        <motion.div
          className="bg-pink-100 text-center py-16 mb-8 relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            onClick={() => setShowBanner(false)}
          >
            ×
          </button>
          <h2 className="text-4xl font-bold mb-2">
            Les bonnes affaires de la seconde main
          </h2>
          <p className="text-xl mb-6">jusqu'à</p>
          <p className="text-5xl font-bold text-pink-600 mb-2">-80%</p>
          <p className="mb-6">du prix boutique d'origine</p>
          <Button className="bg-black text-white hover:bg-gray-800">
            Découvrir
          </Button>
        </motion.div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Page title and filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Seconde Main</h1>
            <p className="text-gray-600">{products.length} produits</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Nouveautés</SelectItem>
                <SelectItem value="price-asc">Prix croissant</SelectItem>
                <SelectItem value="price-desc">Prix décroissant</SelectItem>
                <SelectItem value="discount">Remises</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Sidebar and Products */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="pb-2">
                <h3 className="font-bold text-lg">Catégories</h3>
              </CardHeader>
              <CardContent>
                <motion.ul
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-2"
                >
                  {subCategories.map((category, index) => (
                    <motion.li key={index} variants={itemVariants}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start hover:bg-gray-100"
                      >
                        {category}
                        <ChevronRight size={16} className="ml-auto" />
                      </Button>
                    </motion.li>
                  ))}
                </motion.ul>
                <Button variant="link" className="mt-4 text-sm text-gray-600">
                  En savoir plus
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader className="pb-2">
                <h3 className="font-bold text-lg">Filtrer par</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex justify-between">
                      <span>Prix</span>
                      <ChevronDown size={16} />
                    </h4>
                    <div className="pl-2 space-y-1">
                      <div className="flex items-center">
                        <input type="checkbox" id="price1" className="mr-2" />
                        <label htmlFor="price1" className="text-sm">
                          Moins de 50€
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="price2" className="mr-2" />
                        <label htmlFor="price2" className="text-sm">
                          50€ - 100€
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="price3" className="mr-2" />
                        <label htmlFor="price3" className="text-sm">
                          100€ - 200€
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="price4" className="mr-2" />
                        <label htmlFor="price4" className="text-sm">
                          Plus de 200€
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2 flex justify-between">
                      <span>Marques</span>
                      <ChevronDown size={16} />
                    </h4>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2 flex justify-between">
                      <span>Couleurs</span>
                      <ChevronDown size={16} />
                    </h4>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2 flex justify-between">
                      <span>Tailles</span>
                      <ChevronDown size={16} />
                    </h4>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-black text-white hover:bg-gray-800">
                  Appliquer les filtres
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex space-x-2">
                <Button variant="outline" className="w-10 h-10 p-0">
                  1
                </Button>
                <Button variant="outline" className="w-10 h-10 p-0">
                  2
                </Button>
                <Button variant="outline" className="w-10 h-10 p-0">
                  3
                </Button>
                <Button variant="outline" className="w-10 h-10 p-0">
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
