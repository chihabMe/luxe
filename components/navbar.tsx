"use client";

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search,  Heart, ShoppingBag, Menu, X, ChevronDown } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

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
            <NavigationMenu>
              <NavigationMenuList>
                {["HOMME", "ENFANT", "MARQUES"].map((item) => (
                  <NavigationMenuItem key={item}>
                    <NavigationMenuTrigger className="text-sm font-medium transition-colors hover:text-[#FF7B7B] data-[state=open]:text-[#FF7B7B]">
                      {item}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      {item === "MARQUES" ? (
                        <div className="w-[800px] p-6">
                          <div className="grid grid-cols-5 gap-x-6 gap-y-2">
                            {brands.map((column, idx) => (
                              <div key={idx} className="space-y-2">
                                {column.map((brand) => (
                                  <Link
                                    key={brand}
                                    href="#"
                                    className="block text-sm text-muted-foreground transition-colors hover:text-[#FF7B7B]"
                                  >
                                    {brand}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                          <Link
                            href="#"
                            className="mt-6 inline-block text-sm font-medium text-[#FF7B7B] hover:underline"
                          >
                            Toutes les marques
                          </Link>
                        </div>
                      ) : (
                        <div className="grid w-[800px] grid-cols-5 p-6">
                          {categories.homme.map((category) => (
                            <div key={category.title} className="space-y-3">
                              <h3 className="font-medium">{category.title}</h3>
                              {category.items.map((item) => (
                                <Link
                                  key={item}
                                  href="#"
                                  className="block text-sm text-muted-foreground transition-colors hover:text-[#FF7B7B]"
                                >
                                  {item}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="relative w-64 transition-all duration-300">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher..."
                className="pl-9 pr-4 h-9 focus:ring-1 focus:ring-[#FF7B7B]"
              />
            </div>
            <NavIconButton icon={<Heart className="h-5 w-5" />} label="Favoris" />
            {/* <NavIconButton icon={<ShoppingBag className="h-5 w-5" />} label="Panier" /> */}
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
            {/* <NavIconButton icon={<User className="h-5 w-5" />} label="Compte" /> */}
            <NavIconButton icon={<Heart className="h-5 w-5" />} label="Favoris" />
            {/* <NavIconButton icon={<ShoppingBag className="h-5 w-5" />} label="Panier" /> */}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] sm:w-[350px] p-0">
                <MobileMenu />
              </SheetContent>
            </Sheet>
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

function NavIconButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative group" aria-label={label}>
      {icon}
      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#FF7B7B] transition-all duration-200 group-hover:w-full"></span>
    </button>
  )
}

function MobileMenu() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <Link href="/" className="text-xl font-bold">
          <span className="text-[#FF7B7B]">m</span>odz<span className="text-[#FF7B7B]">.</span>
        </Link>
        <SheetClose asChild>
          <Button variant="ghost" size="icon">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </SheetClose>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <MobileMenuCategory title="FEMME" />
        <MobileMenuCategory title="HOMME" />
        <MobileMenuCategory title="ENFANT" />
        <MobileMenuCategory title="MARQUES" />

        <div className="px-4 pt-6 space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground">MON COMPTE</h3>
          <nav className="space-y-3">
            <Link href="#" className="block text-base py-1 hover:text-[#FF7B7B] transition-colors">
              Se connecter
            </Link>
            <Link href="#" className="block text-base py-1 hover:text-[#FF7B7B] transition-colors">
              Créer un compte
            </Link>
            <Link href="#" className="block text-base py-1 hover:text-[#FF7B7B] transition-colors">
              Mes commandes
            </Link>
            <Link href="#" className="block text-base py-1 hover:text-[#FF7B7B] transition-colors">
              Mes favoris
            </Link>
          </nav>
        </div>
      </div>

      <div className="p-4 border-t mt-auto">
        <Button className="w-full bg-[#FF7B7B] hover:bg-[#ff6b6b] text-white">
          <ShoppingBag className="h-4 w-4 mr-2" />
          Mon panier
        </Button>
      </div>
    </div>
  )
}

function MobileMenuCategory({ title }: { title: string }) {
  const [isOpen, setIsOpen] = useState(false)

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
                  href="#"
                  className="text-sm py-1 text-muted-foreground hover:text-[#FF7B7B] transition-colors"
                >
                  {brand}
                </Link>
              ))}
            <Link href="#" className="col-span-2 mt-2 text-sm font-medium text-[#FF7B7B] hover:underline">
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
                      href="#"
                      className="text-sm py-1 text-muted-foreground hover:text-[#FF7B7B] transition-colors"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <Link href="#" className="block text-sm font-medium text-[#FF7B7B] hover:underline">
              Voir toutes les catégories
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

