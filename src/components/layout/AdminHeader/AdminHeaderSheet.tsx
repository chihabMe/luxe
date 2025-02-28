"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import React, { ComponentProps } from "react";

import HeaderSheetItem from "./AdminHeaderSheetItem";

interface Props {
  items: {
    name: string;
    icon: React.ReactNode;
    href: ComponentProps<typeof Link>["href"];
  }[];
}
const HeaderSheet = ({ items }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 pt-10 text-lg font-medium">
          {items.map((item, index) => (
            <HeaderSheetItem key={index} {...item} />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
export default HeaderSheet;
