"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllMainCategories } from "@/app/data/main-categories-data";

export function MobileMenuCategory({
  mainCategory,
}: {
  mainCategory: Awaited<ReturnType<typeof getAllMainCategories>>[0];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-4 text-left"
      >
        <span className="font-medium">{mainCategory.name.toUpperCase()}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300 px-4",
          isOpen ? "max-h-[500px] opacity-100 pb-4" : "max-h-0 opacity-0"
        )}
      >
        <div className="space-y-4">
          {mainCategory.categories.map((category) => (
            <div key={category.name} className="space-y-2">
              <div className="grid grid-cols-2 gap-1">
                  <Link
                    key={category.id}
                    id={category.id}
                    href={`/products/${mainCategory.slug}/${category.slug}`}
                    className="text-sm font-medium  py-1 text-muted-foreground hover:text-[#FF7B7B] transition-colors"
                  >
                    {category.name}
                  </Link>
              </div>
            </div>
          ))}
          <Link
            href={`/products/${mainCategory.slug}`}
            className="block text-sm font-medium text-[#FF7B7B] hover:underline"
          >
            Voir toutes les catégories
          </Link>
        </div>
      </div>
    </div>
  );
}
