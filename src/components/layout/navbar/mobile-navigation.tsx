"use client"
import Link from "next/link"
import { Menu, X, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MobileMenuCategory } from "./mobile-menu-categories"

export function MobileNavigation() {
  return (
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

