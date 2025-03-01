"use client";
import { Heart, Search } from "lucide-react";
import React, { useState } from "react";
import { NavIconButton } from "./nav-icon-button";
import { MobileNavigation } from "./mobile-navigation";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { getAllMainCategories } from "@/app/data/main-categories-data";

const MobileDisplay = ({
  mainCategories,
}: {
  mainCategories: Awaited<ReturnType<typeof getAllMainCategories>>;
}) => {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <>
      <div className="flex lg:hidden items-center gap-2">
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Toggle search"
        >
          <Search className="h-5 w-5" />
        </button>
        <NavIconButton icon={<Heart className="h-5 w-5" />} label="Favoris" />
        <MobileNavigation mainCategories={mainCategories} />
      </div>

      {/* Mobile Search Bar */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 px-4 pb-3",
          showSearch ? "max-h-16 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher sur le site..."
            className="pl-9 pr-4 w-full"
          />
        </div>
      </div>
    </>
  );
};

export default MobileDisplay;
