"use client"

import * as motion from "motion/react-m"
import Image from "next/image"

export function ShoppingAssistant() {
  return (
    <section className="relative overflow-hidden  bg-[#FF7B7B] ">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 items-center gap-12">
          {/* Text Content */}
          <motion.div
            className="p-8 lg:p-16 text-white"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Votre assistant shopping personnalisé</h2>
            <div className="space-y-4 mb-8">
              <p className="text-lg">
                Complétez notre quizz mode et vous découvrirez votre sélection 100% personnalisée.
              </p>
              <p className="text-lg italic">1 minute suffit pour accéder à vos futurs coups de coeur.</p>
            </div>
            <button
              className="px-8 py-3 border-2 border-white rounded-full
                           text-white font-medium hover:bg-white hover:text-[#FF7B7B]
                           transition-colors duration-300"
            >
              JE COMMENCE
            </button>
          </motion.div>

          {/* Phone Image */}
          <motion.div
            className="relative h-[600px]"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="absolute inset-y-0 right-0 w-full">
              <Image src="/hero-image-3.webp" alt="Shopping Assistant App" fill className="object-contain" />
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  )
}

