"use client"

import * as motion from "motion/react-m"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from 'lucide-react'

const categories = [
  {
    title: "LES BLAZERS",
    image: "/product1.webp",
    link: "/product1.webp",
    fallbackImage: "/placeholder.svg?height=600&width=400",
  },
  {
    title: "LES VESTES EN CUIR ET SIMILI-CUIR",
    image: "/product2.webp",
    link: "/product2.webp",
    fallbackImage: "/placeholder.svg?height=600&width=400",
  },
  {
    title: "LES TRENCHS",
    image: "/product1.webp",
    link: "/product1.webp",
    fallbackImage: "/placeholder.svg?height=600&width=400",
  },
  {
    title: "LES VESTES EN JEAN",
    image: "/product2.webp",
    link: "/product2.webp",
    fallbackImage: "/placeholder.svg?height=600&width=400",
  },
]

export function SeasonalCategories() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Les incontournables de mi-saison
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Multiple gradient overlays for better text protection */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
              
              {/* Image with fallback */}
              <div className="absolute inset-0 bg-gray-100">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = category.fallbackImage;
                  }}
                />
              </div>

              {/* Content overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-start gap-4">
                <h3 className="text-xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                  {category.title}
                </h3>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative overflow-hidden rounded-full"
                >
                  <Link
                    href={category.link}
                    className="relative inline-flex items-center gap-2 px-6 py-2.5 
                             bg-white text-black rounded-full
                             text-sm font-medium shadow-[0_4px_14px_rgba(0,0,0,0.25)]
                             transition duration-300 ease-out
                             hover:bg-black hover:text-white
                             group/button"
                  >
                    <span className="relative z-10">DÉCOUVRIR</span>
                    <ArrowRight 
                      className="w-4 h-4 transition-transform duration-300 
                                group-hover/button:translate-x-1" 
                    />
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover/button:translate-x-full
                                  bg-gradient-to-r from-transparent via-white/20 to-transparent
                                  transition-transform duration-1000" 
                    />
                  </Link>
                </motion.div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
