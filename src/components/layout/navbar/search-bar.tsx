"use client"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  desktop?: boolean
}

export function SearchBar({ desktop = false }: SearchBarProps) {
  return (
    <div className={`relative ${desktop ? "w-64" : "w-full"} transition-all duration-300`}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder={desktop ? "Rechercher..." : "Rechercher sur le site..."}
        className="pl-9 pr-4 h-9 focus:ring-1 focus:ring-[#FF7B7B]"
      />
    </div>
  )
}

