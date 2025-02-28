"use client";
import { LazyMotion, domAnimation } from "motion/react";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner"

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <LazyMotion features={domAnimation}>

        {children}
        <Toaster/>
        </LazyMotion>
    </>
  );
};

export default Providers;
