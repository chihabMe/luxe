"use client";
import * as motion from "motion/react-m";
import { ChevronDown,  ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { getAllMainCategories } from "@/app/data/main-categories-data";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import { getProductMarks } from "@/app/data/products-data";
import MarksFilters from "./MarksFilters";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

export default function ProductFilters({
  mainCategories,
  marks,
}: {
  mainCategories: Awaited<ReturnType<typeof getAllMainCategories>>;
  marks: Awaited<ReturnType<typeof getProductMarks>>;
}) {
  const [expandedCategories, setExpandedCategories] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <h3 className="font-bold text-lg">Catégories</h3>
        </CardHeader>
        <CardContent>
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-2"
          >
            {mainCategories.map((mainCategory) => (
              <motion.li
                key={mainCategory.id}
                variants={itemVariants}
                className="border-b border-gray-100 pb-2 last:border-0 last:pb-0"
              >
                <Collapsible
                  open={expandedCategories[mainCategory.id]}
                  onOpenChange={() => toggleCategory(mainCategory.id)}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start hover:bg-gray-100 font-medium"
                    >
                      {mainCategory.name}
                      {expandedCategories[mainCategory.id] ? (
                        <ChevronUp size={16} className="ml-auto" />
                      ) : (
                        <ChevronDown size={16} className="ml-auto" />
                      )}
                    </Button>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="pl-4 mt-1 space-y-1"
                    >
                      {mainCategory.categories &&
                        mainCategory.categories.map((subCategory) => (
                          <motion.li key={subCategory.id}>
                            <Button
                              variant="ghost"
                              asChild
                              className="w-full justify-start text-sm py-1 h-auto hover:bg-gray-100 text-gray-700"
                            >
                              <Link
                                href={`/products/${mainCategory.slug}/${subCategory.slug}`}
                              >
                                {subCategory.name}
                                {/* <ChevronRight size={14} className="ml-auto" /> */}
                              </Link>
                            </Button>
                          </motion.li>
                        ))}
                    </motion.ul>
                  </CollapsibleContent>
                </Collapsible>
              </motion.li>
            ))}
          </motion.ul>
          <Button variant="link" className="mt-4 text-sm text-gray-600">
            Voir toutes les catégories
          </Button>
        </CardContent>
      </Card>
      <MarksFilters marks={marks} />

    </>
  );
}

