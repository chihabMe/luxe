import { getAllMainCategories } from "@/app/data/main-categories-data";
import { Button } from "@/components/ui/button";
import * as motion from "motion/react-m";
import Link from "next/link";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

export default async function CategoriesNavigation() {
  const mainCategories = await getAllMainCategories();
  return (
    <motion.div
      className="flex justify-center overflow-x-auto py-4 no-scrollbar"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      {mainCategories.map((category) => (
        <Button
          key={category.id}
          asChild
          variant="ghost"
          className="text-sm uppercase whitespace-nowrap mr-6 last:mr-0"
        >
          <Link href={`/products/${category.slug}`}>{category.name}</Link>
        </Button>
      ))}
    </motion.div>
  );
}
