"use client"

import * as motion from "motion/react-m"
import Link from "next/link"

const featuredCategories = [
  { title: "L'occasion offerte dès 50€", discount: "-80%" },
  { title: "Livraison offerte dès 50€", text: "Expédition sous 48 points" },
  { title: "Bon sens", text: "aussi stylé" },
]

export function Hero() {
  return (
    <section className="relative bg-[#FFF1F1] overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Curved shape background */}
        <div className="absolute inset-0 right-0">
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0 L100 0 L100 100 Q50 80 0 100 Z" fill="#FF7B7B" opacity="0.1" />
          </svg>
        </div>

        {/* Main content */}
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Faites place
              <br />
              aux nouveautés
            </h1>
            <p className="text-lg text-gray-600 max-w-lg">
              Découvrez notre nouvelle collection et profitez de réductions exclusives
            </p>
            <Link
              href="/collection"
              className="inline-block bg-[#FF7B7B] text-white px-8 py-3 rounded-full hover:bg-[#ff6b6b] transition-colors"
            >
              Découvrir
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/3] bg-white/50 rounded-2xl backdrop-blur-sm"
          >
            {/* Placeholder for main product image */}
          </motion.div>
        </div>

        {/* Featured categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative grid md:grid-cols-3 gap-4 mt-8"
        >
          {featuredCategories.map((category, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
              {category.discount ? (
                <span className="text-[#FF7B7B] text-2xl font-bold">{category.discount}</span>
              ) : (
                <p className="text-gray-600">{category.text}</p>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

