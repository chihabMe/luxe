"use client"

import { useState } from "react"
import * as motion from "motion/react-m"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { StarRating } from "./star-rating"
import { AnimatePresence } from "motion/react"

const reviews = [
  {
    id: 1,
    author: "Carabin C",
    date: "25/02/2025",
    experience: "19/02/2025",
    rating: 5,
    comment: "Ravie de la qualité des articles reçus. Excellent rapport qualité",
    link: "voir plus",
  },
  {
    id: 2,
    author: "Anne Marie L",
    date: "25/02/2025",
    experience: "18/02/2025",
    rating: 5,
    comment: "Rapide et parfait.",
  },
  {
    id: 3,
    author: "Ariane B",
    date: "25/02/2025",
    experience: "18/02/2025",
    rating: 4,
    comment: "Je pense que les vêtements ne sont pas assez protégés. La livrais",
    link: "voir plus",
  },
  {
    id: 4,
    author: "Rachel R",
    date: "25/02/2025",
    experience: "19/02/2025",
    rating: 5,
    comment: "Rapide et efficace",
  },
]

export function ReviewCarousel() {
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 3
  const totalPages = Math.ceil(reviews.length / itemsPerPage)

  const nextPage = () => setCurrentPage((prev) => (prev + 1) % totalPages)
  const prevPage = () => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-4xl font-bold text-blue-500">4.6</span>
            <span className="text-2xl text-gray-400">/5</span>
          </div>
          <StarRating rating={4.6} />
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <img src="/placeholder.svg" alt="Avis vérifiés" className="h-6 w-6" />
            <span>Avis vérifiés</span>
          </div>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {reviews.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((review) => (
                <div key={review.id} className="p-6 rounded-lg border border-gray-100 shadow-sm">
                  <StarRating rating={review.rating} size="sm" />
                  <p className="mt-4 text-gray-600">{review.comment}</p>
                  {review.link && <button className="mt-2 text-blue-500 text-sm hover:underline">{review.link}</button>}
                  <div className="mt-4 text-sm text-gray-500">
                    <p>Avis du {review.date}</p>
                    <p>
                      suite à une expérience du {review.experience} par {review.author}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prevPage}
            className="absolute -left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:bg-gray-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextPage}
            className="absolute -right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:bg-gray-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentPage === index ? "bg-blue-500" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

