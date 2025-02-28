"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ComponentProps } from "react";

interface Props {
  paths: {
    name: string;
    icon: React.ReactNode;
    href: ComponentProps<typeof Link>["href"];
  }[];
}
const SideBar = ({ paths }: Props) => {
  const router = useRouter();
  return (
    <div className="hidden h-screen w-64 flex-col bg-background sm:flex">
      <nav className="flex-1 space-y-2 px-4 pt-16">
        {paths.map((path, index) => (
          <SideBarItem
            key={index}
            href={path.href}
            icon={path.icon}
            text={path.name}
          />
        ))}
      </nav>
      <div
        className="group p-4"
        onClick={async () => {
          await signOut({
            redirect: false,
          });
          router.push("/");
        }}
      >
        <SideBarItem
          href="/"
          onClick={() => {
            signOut({
              redirect: false,
            });
            router.push("/");
          }}
          icon={<LogOut className="h-5 w-5 hover:text-red-500" />}
          className="group-hover:text-red-500"
          text="Logout"
        />
      </div>
    </div>
  );
};

const SideBarItem = ({
  href,
  icon,
  text,
  className,
  onClick,
}: {
  href: ComponentProps<typeof Link>["href"];
  icon: React.ReactNode;
  text: string;
  className?: string;
  onClick?: () => void;
}) => (
  <Button variant="ghost" className="w-full justify-start" asChild>
    <Link
      href={href}
      className={cn("flex items-center", className)}
      onClick={onClick}
    >
      {icon}
      <span className="ml-2">{text}</span>
    </Link>
  </Button>
);

export default SideBar;
