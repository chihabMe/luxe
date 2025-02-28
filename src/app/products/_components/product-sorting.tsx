"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProductSorting() {
  const [sortBy, setSortBy] = useState("newest")

  return (
    <Select value={sortBy} onValueChange={setSortBy}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Trier par" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">Nouveautés</SelectItem>
        <SelectItem value="price-asc">Prix croissant</SelectItem>
        <SelectItem value="price-desc">Prix décroissant</SelectItem>
        <SelectItem value="discount">Remises</SelectItem>
      </SelectContent>
    </Select>
  )
}

