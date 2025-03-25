import Link from "next/link";
// import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { DesktopNavigation } from "./desktop-navigation";
import { SearchBar } from "./search-bar";
// import { NavIconButton } from "./nav-icon-button";
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
        <div className="flex h-20 items-center px-4">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight relative z-10 flex items-center mr-8"
          >
            <span className="text-[#FF7B7B]">m</span>odz
            <span className="text-[#FF7B7B]">.</span>
          </Link>
          
          {/* Desktop Navigation - centered */}
          <div className="hidden lg:flex flex-1 justify-center">
            <DesktopNavigation mainCategories={mainCategories} />
          </div>
          
          {/* Desktop Actions - right aligned */}
          <div className="hidden   lg:flex items-center gap-6">
            <SearchBar desktop />
            {/* <NavIconButton
              icon={<Heart className="h-5 w-5" />}
              label="Favoris"
            /> */}
          </div>
          
          {/* Mobile Display */}
          <div className="ml-auto lg:hidden">
            <MobileDisplay mainCategories={mainCategories} />
          </div>
        </div>
      </div>
    </header>
  );
}