"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const products = [
  { name: "Veste Classic", price: "129,99 €", image: "/placeholder.svg" },
  { name: "Trench Coat", price: "199,99 €", image: "/placeholder.svg" },
  { name: "Robe d'été", price: "89,99 €", image: "/placeholder.svg" },
  { name: "Veste en jean", price: "79,99 €", image: "/placeholder.svg" },
]

export function SeasonalCollection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Les incontournables de mi-saison</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-lg">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-[#FF7B7B]">{product.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

