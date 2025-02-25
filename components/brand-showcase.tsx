"use client"

import { useState, useEffect } from "react"
import * as motion from "motion/react-m"
import { AnimatePresence } from "motion/react"
// Each position in the grid will cycle through these brands
const brandGroups = [
  [
    { name: "AUBADE", position: "1 / 1 / 3 / 2" },
    { name: "DELAHAYE", position: "1 / 1 / 3 / 2" },
    { name: "NAME IT", position: "1 / 1 / 3 / 2" },
  ],
  [
    { name: "AGATHE & LOUISE", position: "1 / 2 / 2 / 3" },
    { name: "TOMMY HILFIGER", position: "1 / 2 / 2 / 3" },
    { name: "GARCIA", position: "1 / 2 / 2 / 3" },
  ],
  [
    { name: "C'EST BEAU LA VIE", position: "1 / 3 / 2 / 4" },
    { name: "NAME IT", position: "1 / 3 / 2 / 4" },
    { name: "AUBADE", position: "1 / 3 / 2 / 4" },
  ],
  [
    { name: "CREAM", position: "1 / 4 / 2 / 5" },
    { name: "GARCIA", position: "1 / 4 / 2 / 5" },
    { name: "DELAHAYE", position: "1 / 4 / 2 / 5" },
  ],
]

export function BrandShowcase() {
  const [currentIndices, setCurrentIndices] = useState(brandGroups.map(() => 0))

  useEffect(() => {
    const intervals = brandGroups.map((_, index) => {
      return setInterval(
        () => {
          setCurrentIndices((prev) => {
            const next = [...prev]
            next[index] = (next[index] + 1) % brandGroups[index].length
            return next
          })
        },
        5000 + index * 1000,
      ) // Stagger the animations
    })

    return () => intervals.forEach(clearInterval)
  }, [])

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-12 text-center">Les marques du moment</h2>

        <div className="grid grid-cols-4 gap-4 auto-rows-[200px] max-w-7xl mx-auto">
          {brandGroups.map((group, groupIndex) => (
            <div
              key={groupIndex}
              style={{ gridArea: group[0].position }}
              className="relative overflow-hidden rounded-2xl"
            >
              {/* Yellow border that stays fixed */}
              <div className="absolute inset-0 border-4 border-[#FFD700] rounded-2xl z-20" />

              <AnimatePresence mode="popLayout">
                <motion.div
                  key={currentIndices[groupIndex]}
                  className="absolute inset-0"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{
                    type: "tween",
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                >
                  {/* Placeholder for image */}
                  <div className="absolute inset-0 bg-gray-100" />

                  {/* Brand name overlay */}
                  <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/50 to-transparent">
                    <h3 className="text-white text-xl font-bold">{group[currentIndices[groupIndex]].name}</h3>
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

