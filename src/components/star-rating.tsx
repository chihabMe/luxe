"use client"

import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md"
}

export function StarRating({ rating, maxRating = 5, size = "md" }: StarRatingProps) {
  return (
    <div className="flex">
      {[...Array(maxRating)].map((_, index) => (
        <Star
          key={index}
          className={`
            ${size === "sm" ? "w-4 h-4" : "w-5 h-5"}
            ${index < rating ? "fill-blue-500 text-blue-500" : "fill-gray-200 text-gray-200"}
          `}
        />
      ))}
    </div>
  )
}

