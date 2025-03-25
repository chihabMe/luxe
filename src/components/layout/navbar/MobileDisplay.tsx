"use client";
import { Search, X } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/navigation';
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
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (showSearch) {
      searchInputRef.current?.focus();
    }
  }, [showSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    setSearchQuery('');
  };

  return (
    <>
      <div className="flex lg:hidden items-center justify-end gap-2">
        <button
          onClick={toggleSearch}
          className={cn(
            "p-2 rounded-full hover:bg-gray-100 transition-colors",
            showSearch && "bg-gray-100"
          )}
          aria-label={showSearch ? "Close search" : "Open search"}
        >
          {showSearch ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
        </button>
        <MobileNavigation mainCategories={mainCategories} />
      </div>
      
      {/* Mobile Search Bar */}
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-50 bg-white shadow-sm transition-all duration-300 ease-in-out",
          showSearch 
            ? "translate-y-0 opacity-100 visible" 
            : "-translate-y-full opacity-0 invisible"
        )}
      >
        <div className="container mx-auto px-4 py-3">
          <form onSubmit={handleSearch} className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              ref={searchInputRef}
              type="search"
              placeholder="Rechercher sur le site..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 w-full h-10"
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
            >
              Rechercher
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default MobileDisplay;