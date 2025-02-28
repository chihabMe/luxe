"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { navData } from "./navbar"

export function MobileMenuCategory({ title }: { title: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const { brands, categories } = navData

  return (
    <div className="border-b">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between w-full p-4 text-left">
        <span className="font-medium">{title}</span>
        <ChevronDown
          className={cn("h-5 w-5 text-muted-foreground transition-transform duration-200", isOpen && "rotate-180")}
        />
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300 px-4",
          isOpen ? "max-h-[500px] opacity-100 pb-4" : "max-h-0 opacity-0",
        )}
      >
        {title === "MARQUES" ? (
          <div className="grid grid-cols-2 gap-2">
            {brands
              .flat()
              .slice(0, 10)
              .map((brand) => (
                <Link
                  key={brand}
                  href={`/products/marques/${brand}`}
                  className="text-sm py-1 text-muted-foreground hover:text-[#FF7B7B] transition-colors"
                >
                  {brand}
                </Link>
              ))}
            <Link href="/marques" className="col-span-2 mt-2 text-sm font-medium text-[#FF7B7B] hover:underline">
              Voir toutes les marques
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {categories.homme.slice(0, 5).map((category) => (
              <div key={category.title} className="space-y-2">
                <h3 className="text-sm font-medium">{category.title}</h3>
                <div className="grid grid-cols-2 gap-1">
                  {category.items.map((item) => (
                    <Link
                      key={item}
                      href={`/products/${title.toLowerCase()}/${category.title}/${item}`}
                      className="text-sm py-1 text-muted-foreground hover:text-[#FF7B7B] transition-colors"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <Link
              href={`/products/${title.toLowerCase()}`}
              className="block text-sm font-medium text-[#FF7B7B] hover:underline"
            >
              Voir toutes les catégories
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

