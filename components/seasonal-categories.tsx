"use client"

import * as motion from "motion/react-m"
import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    title: "LES BLAZERS",
    image: "/placeholder.svg",
    link: "/categories/blazers",
  },
  {
    title: "LES VESTES EN CUIR ET SIMILI-CUIR",
    image: "/placeholder.svg",
    link: "/categories/leather-jackets",
  },
  {
    title: "LES TRENCHS",
    image: "/placeholder.svg",
    link: "/categories/trench-coats",
  },
  {
    title: "LES VESTES EN JEAN",
    image: "/placeholder.svg",
    link: "/categories/denim-jackets",
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
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/60" />

              <div className="absolute inset-0">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">{category.title}</h3>
                  <Link
                    href={category.link}
                    className="inline-block px-6 py-2 border border-white rounded-full
                             text-sm font-medium hover:bg-white hover:text-black
                             transition-colors duration-300"
                  >
                    DÉCOUVRIR
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

