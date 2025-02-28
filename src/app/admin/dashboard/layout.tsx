import SideBar from "@/components/SideBar";
import Header from "@/components/layout/AdminHeader/AdminHeader";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";
import {
  ShoppingBasket,
  ALargeSmall,
  Home,
  Users,
  DollarSign,
  BookAIcon
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { ComponentProps, ReactNode } from "react";

interface IPath {
  name: string;
  icon: ReactNode;
  href: ComponentProps<typeof Link>["href"];
}
const paths: IPath[] = [
  {
    name: "Home",
    icon: <Home className="h-5 w-5" />,
    href: "/admin/dashboard",
  },
  {
    name: "users",
    icon: <Users className="h-5 w-5" />,
    href: "/admin/dashboard/users",
  },

  {
    name: "Main Categories",
    icon: <BookAIcon className="h-5 w-5" />,
    href: "/admin/dashboard/main-categories",
  },

  {
    name: "Categories",
    icon: <ALargeSmall className="h-5 w-5" />,
    href: "/admin/dashboard/categories",
  },
  {
    name: "products",
    icon: <ShoppingBasket className="h-5 w-5" />,
    href: "/admin/dashboard/products",
  },

  {
    name: "Orders",
    icon: <DollarSign className="h-5 w-5" />,
    href: "/admin/dashboard/orders",
  },
];
const checkIfAdmin = (role: string) => {
  return role == "admin" || role == "superAdmin";
};
const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session || !session.user || !checkIfAdmin(session.user.role))
    redirect("/admin/auth/signin");
  return (
    <SessionProvider>
      <div className="flex">
        <SideBar paths={paths} />
        <div className="container mx-auto">
          <Header paths={paths} />
          {children}
        </div>
      </div>
    </SessionProvider>
  );
};

export default Layout;
