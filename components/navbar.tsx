"use client"

import Link from "next/link"
import { Search, User, Heart, ShoppingBag, Menu } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Input } from "./ui/input"

const brands = [
  ["Benetton", "Daniel Hechter", "Kiliwatch", "Maxmara", "Scotch & Soda"],
  ["Betty Barclay", "Desigual", "La Fée Maraboutée", "Miss Captain", "Street One"],
  ["Cecil", "Esprit", "Lee Cooper", "Molly Bracken", "Teddy Smith"],
  ["Chantelle", "Harris Wilson", "Les P'tites Bombes", "Nice Things", "Vero Moda"],
  ["Christine Laure", "I.Code (By IKKS)", "Lou", "One Step", "Vila"],
  ["Cop Copine", "Ikks", "Mado et les autres", "Only", "Yaya"],
]

const categories = {
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
}

export function Navbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-2xl font-bold">
            modz.
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium hover:text-[#FF7B7B] data-[state=open]:text-[#FF7B7B]">
                  FEMME
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[800px] grid-cols-5 p-6">
                    {categories.homme.map((category) => (
                      <div key={category.title} className="space-y-2">
                        <h3 className="font-medium">{category.title}</h3>
                        {category.items.map((item) => (
                          <Link
                            key={item}
                            href="#"
                            className="block text-sm text-muted-foreground hover:text-[#FF7B7B]"
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium hover:text-[#FF7B7B] data-[state=open]:text-[#FF7B7B]">
                  HOMME
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[800px] grid-cols-5 p-6">
                    {categories.homme.map((category) => (
                      <div key={category.title} className="space-y-2">
                        <h3 className="font-medium">{category.title}</h3>
                        {category.items.map((item) => (
                          <Link
                            key={item}
                            href="#"
                            className="block text-sm text-muted-foreground hover:text-[#FF7B7B]"
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium hover:text-[#FF7B7B] data-[state=open]:text-[#FF7B7B]">
                  ENFANT
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[800px] grid-cols-5 p-6">
                    {categories.homme.map((category) => (
                      <div key={category.title} className="space-y-2">
                        <h3 className="font-medium">{category.title}</h3>
                        {category.items.map((item) => (
                          <Link
                            key={item}
                            href="#"
                            className="block text-sm text-muted-foreground hover:text-[#FF7B7B]"
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium hover:text-[#FF7B7B] data-[state=open]:text-[#FF7B7B]">
                  MARQUES
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[800px] p-6">
                    <div className="grid grid-cols-5 gap-x-6 gap-y-2">
                      {brands.map((column, index) => (
                        <div key={index} className="space-y-2">
                          {column.map((brand) => (
                            <Link
                              key={brand}
                              href="#"
                              className="block text-sm text-muted-foreground hover:text-[#FF7B7B]"
                            >
                              {brand}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                    <Link href="#" className="mt-6 inline-block text-sm text-muted-foreground hover:text-[#FF7B7B]">
                      Toutes les marques
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input  type="search" placeholder="Rechercher sur le site..." className="pl-9" />
            </div>
            <button className="p-2 hover:text-[#FF7B7B] transition-colors">
              <User className="h-5 w-5" />
            </button>
            <button className="p-2 hover:text-[#FF7B7B] transition-colors">
              <Menu className="h-5 w-5" />
            </button>
            <button className="p-2 hover:text-[#FF7B7B] transition-colors">
              <Heart className="h-5 w-5" />
            </button>
            <button className="p-2 hover:text-[#FF7B7B] transition-colors">
              <ShoppingBag className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

