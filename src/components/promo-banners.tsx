"use client"

import * as motion from "motion/react-m"
import Image from "next/image"
import Link from "next/link"

const categories = ["FEMME", "HOMME", "FILLE", "GARÇON"]

export function PromoBanners() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Banner */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-[#FFD700] rounded-3xl p-8 overflow-hidden"
        >
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif italic mb-1">Le coin</h2>
              <h3 className="text-3xl font-bold">des bonnes affaires</h3>
            </div>

            <div className="space-y-2">
              <p className="text-xl">Jusqu à</p>
              <p className="text-[#FF7B7B] text-7xl font-bold">-80%</p>
              <p className="text-lg">du prix boutique d origine</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-2 rounded-full border-2 border-black text-sm font-medium
                           hover:bg-black hover:text-white transition-colors"
                >
                  {category}
                </motion.button>
              ))}
            </div>

            <p className="text-sm mt-4">Du 13/02 au 13/03/2025</p>
          </div>

          {/* Floating Images */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="absolute top-10 right-8 rotate-12"
          >
            <div className="w-32 h-40 bg-white p-2 rounded shadow-lg transform -rotate-6">
              <div className="w-full h-full bg-gray-100 rounded" />
            </div>
            <div className="absolute -right-12 -bottom-8 w-32 h-40 bg-white p-2 rounded shadow-lg transform rotate-6">
              <div className="w-full h-full bg-gray-100 rounded" />
            </div>
          </motion.div>
        </motion.div>

        {/* Right Banner */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-[#064E40] text-white rounded-3xl overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-1/2 h-full">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-02-25%2015-27-28-VpbtbEoNXwQg6l8PI1dKWpdN10jXBU.png"
              alt="Fashion model"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative z-10 p-8 max-w-[50%] h-full flex flex-col justify-center space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h2 className="text-2xl font-serif italic mb-2">Faire preuve de</h2>
              <h3 className="text-4xl font-bold mb-2">bon sens</h3>
              <p className="text-xl font-serif italic mb-4">n a jamais été</p>
              <p className="text-4xl font-bold">aussi stylé</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Link
                href="/concept"
                className="inline-block mt-6 px-6 py-3 border border-white rounded-full
                         text-sm font-medium hover:bg-white hover:text-[#064E40] transition-colors"
              >
                DÉCOUVREZ NOTRE CONCEPT
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

