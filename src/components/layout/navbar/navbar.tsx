import Link from "next/link";
import {  Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { DesktopNavigation } from "./desktop-navigation";
import { SearchBar } from "./search-bar";
import { NavIconButton } from "./nav-icon-button";
import MobileDisplay from "./MobileDisplay";
import { getAllMainCategories } from "@/app/data/main-categories-data";

export async function Navbar() {
  const mainCategories = await getAllMainCategories()
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-white transition-all duration-200"
      )}
    >
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight relative z-10 flex items-center"
          >
            <span className="text-[#FF7B7B]">m</span>odz
            <span className="text-[#FF7B7B]">.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <DesktopNavigation mainCategories={mainCategories} />
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <SearchBar desktop />
            <NavIconButton
              icon={<Heart className="h-5 w-5" />}
              label="Favoris"
            />
          </div>

          <MobileDisplay mainCategories={mainCategories} />
        </div>
      </div>
    </header>
  );
}
