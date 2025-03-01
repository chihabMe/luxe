"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllMainCategories } from "@/app/data/main-categories-data";

export function MobileMenuCategory({
  title,
  mainCategories,
}: {
  title: string;
  mainCategories: Awaited<ReturnType<typeof getAllMainCategories>>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-4 text-left"
      >
        <span className="font-medium">{title}</span>
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
          {mainCategories.map((category) => (
            <div key={category.name} className="space-y-2">
              <h3 className="text-sm font-medium">{category.name}</h3>
              <div className="grid grid-cols-2 gap-1">
                {category.categories.map((item) => (
                  <Link
                    id={item.id}
                    href={`/products/${category.slug}/${item.slug}`}
                    className="text-sm py-1 text-muted-foreground hover:text-[#FF7B7B] transition-colors"
                  >
                    {item.name}
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
      </div>
    </div>
  );
}
