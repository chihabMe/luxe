"use client"

import * as motion from "motion/react-m"
import Image from "next/image"

const categories = [
  { name: "Robes", image: "/placeholder.svg" },
  { name: "Manteaux", image: "/placeholder.svg" },
  { name: "Chaussures", image: "/placeholder.svg" },
  { name: "Accessoires", image: "/placeholder.svg" },
  { name: "Sport", image: "/placeholder.svg" },
  { name: "Beauté", image: "/placeholder.svg" },
]

export function CategoryNav() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col items-center space-y-2"
            >
              <div className="relative w-20 h-20 rounded-full overflow-hidden">
                <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
              </div>
              <span className="text-sm font-medium">{category.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

