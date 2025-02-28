import Link from "next/link";
import React, { ComponentProps } from "react";

import HeaderSheet from "./AdminHeaderSheet";
import HeaderUserAvatar from "./AdminHeaderUserAvatar";

interface Props {
  paths: {
    name: string;
    icon: React.ReactNode;
    href: ComponentProps<typeof Link>["href"];
  }[];
}
const AdminHeader = ({ paths }: Props) => {
  return (
    <header className="container sticky top-0 z-30 mx-auto flex h-14 items-center justify-between gap-4 px-4 py-4 sm:static sm:h-auto sm:justify-end sm:border-0 sm:bg-transparent sm:px-6">
      <HeaderSheet items={paths} />
      <div className="flex items-center gap-4">
        <HeaderUserAvatar />
      </div>
    </header>
  );
};

export default AdminHeader;
