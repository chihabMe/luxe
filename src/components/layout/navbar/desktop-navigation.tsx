"use client";
import Image from "next/image";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { getAllMainCategories } from "@/app/data/main-categories-data";
import { ChevronDown } from "lucide-react";

export function DesktopNavigation({
  mainCategories,
}: {
  mainCategories: Awaited<ReturnType<typeof getAllMainCategories>>;
}) {
  return (
    <NavigationMenu className="max-w-full">
      <NavigationMenuList className="flex items-center gap-4 md:gap-6">
        {mainCategories
          .filter(item => item.isActive && item.categories.length > 0)
          .map((item) => (
            <NavigationMenuItem key={item.id}>
              <NavigationMenuTrigger className="px-4 py-3 text-base font-medium transition-colors hover:text-[#FF7B7B] data-[state=open]:text-[#FF7B7B] flex items-center gap-2">
                {item.name}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <CategoriesMenuContent
                  mainCategorySlug={item.slug}
                  mainCategoryName={item.name}
                  categories={item.categories}
                />
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function CategoriesMenuContent({
  categories,
  mainCategorySlug,
  mainCategoryName,
}: {
  categories: Awaited<ReturnType<typeof getAllMainCategories>>[0]["categories"];
  mainCategorySlug: string;
  mainCategoryName: string;
}) {
  const featuredCategories = categories.filter(cat => cat.isFeatured);
  const regularCategories = categories.filter(cat => !cat.isFeatured);
  
  return (
    <div className="w-[1000px] p-8 bg-white rounded-lg shadow-xl">
      <div className="mb-6 pb-3 border-b">
        <h3 className="text-xl font-semibold text-[#FF7B7B]">{mainCategoryName}</h3>
      </div>
      
      {featuredCategories.length > 0 && (
        <div className="mb-8">
            <h4 className="text-base font-medium text-gray-600 mb-4">Catégories en Vedette</h4>
          <div className="grid grid-cols-5 gap-4">
            {featuredCategories.map((category) => (
              <Link
                key={category.id}
                href={`/products/${mainCategorySlug}/${category.slug}`}
                className="group flex flex-col items-center transition-all hover:scale-105"
              >
                <div className="relative w-20 h-20 overflow-hidden rounded-lg mb-3">
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400 text-lg font-medium">{category.name[0]}</span>
                    </div>
                  )}
                </div>
                <span className="text-base font-medium group-hover:text-[#FF7B7B] text-center">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-4 gap-x-8 gap-y-4">
        {regularCategories.map((category) => (
          <Link
            key={category.id}
            href={`/products/${mainCategorySlug}/${category.slug}`}
            className="py-2 text-base hover:text-[#FF7B7B] transition-colors flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-gray-200"></span>
            {category.name}
          </Link>
        ))}
      </div>
      
      <div className="mt-6 pt-3 border-t text-right">
        <Link 
          href={`/products/${mainCategorySlug}`}
          className="text-sm font-medium text-[#FF7B7B] hover:underline inline-flex items-center gap-1"
        >
          Voir tous les {mainCategoryName}
          <ChevronDown className="h-4 w-4 rotate-270 transform -rotate-90" />
        </Link>
      </div>
    </div>
  );
}