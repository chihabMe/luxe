"use client";

import { Button } from "@/components/ui/button";
import * as motion from "motion/react-m";
import Link from "next/link";
const categories = ["tout", "homme", "enfants", "filles"];

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

export default function CategoriesNavigation() {
  return (
    <motion.div
      className="flex justify-center overflow-x-auto py-4 no-scrollbar"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      {categories.map((category, index) => (
        <Button
          key={index}
          asChild
          variant="ghost"
          className="text-sm uppercase whitespace-nowrap mr-6 last:mr-0"
        >
          <Link href={`/products/${category}`}>{category}</Link>
        </Button>
      ))}
    </motion.div>
  );
}
