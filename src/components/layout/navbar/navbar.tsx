"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Heart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { DesktopNavigation } from "./desktop-navigation"
import { SearchBar } from "./search-bar"
import { NavIconButton } from "./nav-icon-button"
import { MobileNavigation } from "./mobile-navigation"

export const navData = {
  brands: [
    ["Benetton", "Daniel Hechter", "Kiliwatch", "Maxmara", "Scotch & Soda"],
    ["Betty Barclay", "Desigual", "La Fée Maraboutée", "Miss Captain", "Street One"],
    ["Cecil", "Esprit", "Lee Cooper", "Molly Bracken", "Teddy Smith"],
    ["Chantelle", "Harris Wilson", "Les P'tites Bombes", "Nice Things", "Vero Moda"],
    ["Christine Laure", "I.Code (By IKKS)", "Lou", "One Step", "Vila"],
    ["Cop Copine", "Ikks", "Mado et les autres", "Only", "Yaya"],
  ],

  categories: {
    homme: [
      { title: "Nouveautés", items: [] },
      { title: "Vêtements", items: ["T-shirts", "Chemises", "Pantalons", "Jeans", "Vestes"] },
      { title: "Chaussures", items: ["Sneakers", "Boots", "Chaussures ville"] },
      { title: "Lingerie, Nuit & Bain", items: ["Sous-vêtements", "Pyjamas", "Maillots de bain"] },
      { title: "Accessoires", items: ["Ceintures", "Montres", "Lunettes"] },
      { title: "Beauté", items: [] },
      { title: "Top marques", items: [] },
      { title: "Outlet", items: [] },
      { title: "Seconde main", items: [] },
      { title: "Collection", items: [] },
    ],
    femme: [
      { title: "Nouveautés", items: [] },
      { title: "Vêtements", items: ["Robes", "Tops", "Jupes", "Pantalons", "Vestes"] },
      { title: "Chaussures", items: ["Escarpins", "Bottes", "Baskets"] },
      { title: "Lingerie, Nuit & Bain", items: ["Soutiens-gorge", "Culottes", "Pyjamas"] },
      { title: "Accessoires", items: ["Sacs", "Bijoux", "Écharpes"] },
      { title: "Beauté", items: [] },
      { title: "Top marques", items: [] },
      { title: "Outlet", items: [] },
      { title: "Seconde main", items: [] },
      { title: "Collection", items: [] },
    ],
    enfant: [
      { title: "Nouveautés", items: [] },
      { title: "Vêtements", items: ["T-shirts", "Pantalons", "Robes", "Pyjamas"] },
      { title: "Chaussures", items: ["Baskets", "Bottes", "Sandales"] },
      { title: "Accessoires", items: ["Sacs", "Bonnets", "Écharpes"] },
      { title: "Top marques", items: [] },
      { title: "Outlet", items: [] },
      { title: "Collection", items: [] },
    ],
  },
}



export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-white transition-all duration-200",
        isScrolled && "shadow-sm",
      )}
    >
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tight relative z-10 flex items-center">
            <span className="text-[#FF7B7B]">m</span>odz<span className="text-[#FF7B7B]">.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <DesktopNavigation />
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <SearchBar desktop />
            <NavIconButton icon={<Heart className="h-5 w-5" />} label="Favoris" />
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Toggle search"
            >
              <Search className="h-5 w-5" />
            </button>
            <NavIconButton icon={<Heart className="h-5 w-5" />} label="Favoris" />
            <MobileNavigation  />
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 px-4 pb-3",
            showSearch ? "max-h-16 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Rechercher sur le site..." className="pl-9 pr-4 w-full" />
          </div>
        </div>
      </div>
    </header>
  )
}

