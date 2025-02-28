"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ComponentProps } from "react";

interface Props {
  name: string;
  icon: React.ReactNode;
  href: ComponentProps<typeof Link>["href"];
}
const HeaderSheetItem = ({ name, icon, href }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
        isActive && "text-foreground",
      )}
    >
      {icon}
      {name}
    </Link>
  );
};

export default HeaderSheetItem;
