"use client"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { navData } from "./navbar"

export function DesktopNavigation() {
  const { brands, categories } = navData

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {["HOMME", "ENFANT", "MARQUES"].map((item) => (
          <NavigationMenuItem key={item}>
            <NavigationMenuTrigger className="text-sm font-medium transition-colors hover:text-[#FF7B7B] data-[state=open]:text-[#FF7B7B]">
              {item}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              {item === "MARQUES" ? (
                <BrandsMenuContent brands={brands} />
              ) : (
                <CategoriesMenuContent categories={categories.homme} />
              )}
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function BrandsMenuContent({ brands }: { brands: string[][] }) {
  return (
    <div className="w-[800px] p-6">
      <div className="grid grid-cols-5 gap-x-6 gap-y-2">
        {brands.map((column, idx) => (
          <div key={idx} className="space-y-2">
            {column.map((brand) => (
              <Link
                key={brand}
                href={`/products/MARQUES/${brand}`}
                className="block text-sm text-muted-foreground transition-colors hover:text-[#FF7B7B]"
              >
                {brand}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <Link href="/marques" className="mt-6 inline-block text-sm font-medium text-[#FF7B7B] hover:underline">
        Toutes les marques
      </Link>
    </div>
  )
}

function CategoriesMenuContent({ categories }: { categories: Array<{ title: string; items: string[] }> }) {
  return (
    <div className="grid w-[800px] grid-cols-5 p-6">
      {categories.map((category) => (
        <div key={category.title} className="space-y-3">
          <h3 className="font-medium">{category.title}</h3>
          {category.items.map((item) => (
            <Link
              key={item}
              href={`/products/homme/${category.title}`}
              className="block text-sm text-muted-foreground transition-colors hover:text-[#FF7B7B]"
            >
              {item}
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
}

