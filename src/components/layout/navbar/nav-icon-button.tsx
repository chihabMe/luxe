"use client"

import type React from "react"

export function NavIconButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative group" aria-label={label}>
      {icon}
      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#FF7B7B] transition-all duration-200 group-hover:w-full"></span>
    </button>
  )
}

