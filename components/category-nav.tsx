"use client"

import * as motion from "motion/react-m"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const categories = [
  {
    name: "Robes",
    description: "Élégantes & Casual",
    image: "/category.webp",
    itemCount: 248,
    gradient: "from-[#FF7B7B] to-[#FFB6C1]",
  },
  {
    name: "Manteaux",
    description: "Pour Toutes Saisons",
    image: "/category.webp",
    itemCount: 186,
    gradient: "from-[#4A90E2] to-[#357ABD]",
  },
  {
    name: "Chaussures",
    description: "Confort & Style",
    image: "/category.webp",
    itemCount: 312,
    gradient: "from-[#50C878] to-[#3CB371]",
  },
  {
    name: "Accessoires",
    description: "Détails Parfaits",
    image: "/category.webp",
    itemCount: 425,
  },
  {
    name: "Sport",
    description: "Performance & Mode",
    image: "/category.webp",
    itemCount: 167,
  },
  {
    name: "Beauté",
    description: "Soins & Bien-être",
    image: "/category.webp",
    itemCount: 193,
  },
]

export function CategoryNav() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-3xl font-bold mb-3">Nos Catégories</h2>
          <p className="text-muted-foreground max-w-lg">
            Découvrez notre sélection de vêtements et accessoires pour tous les styles
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link href={`/categories/${category.name.toLowerCase()}`} key={category.name}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative flex flex-col items-center"
              >
                {/* Main card with gradient overlay */}
                <motion.div whileHover={{ y: -5 }} className="relative w-full pt-[125%] rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Gradient Overlay */}

                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-between text-white">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm font-medium opacity-0 group-hover:opacity-100"
                    >
                      {category.description}
                    </motion.div>

                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold tracking-wide">{category.name}</h3>
                      <p className="text-sm font-medium opacity-90">{category.itemCount} articles</p>
                    </div>
                  </div>

                  {/* Hover Effect Circle */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 
                             backdrop-blur-sm opacity-0 group-hover:opacity-100 
                             flex items-center justify-center"
                  >
                    <ArrowRight className="w-4 h-4 text-white" />
                  </motion.div>
                </motion.div>

                {/* Bottom shine effect */}
                <motion.div
                  initial={{ width: "0%", opacity: 0 }}
                  whileHover={{ width: "100%", opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-transparent 
                           via-white/50 to-transparent opacity-0"
                />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

