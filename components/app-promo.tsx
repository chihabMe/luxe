"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function AppPromo() {
  return (
    <section className="bg-[#FF7B7B] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold">Votre assistant shopping personnalisé</h2>
            <p className="text-lg opacity-90">
              Téléchargez notre application pour une expérience shopping unique et personnalisée
            </p>
            <button className="bg-white text-[#FF7B7B] px-8 py-3 rounded-full font-medium">Télécharger</button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px]"
          >
            <Image src="/placeholder.svg" alt="Mobile app preview" fill className="object-contain" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

