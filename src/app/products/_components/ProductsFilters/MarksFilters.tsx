"use client";

import { getProductMarks } from "@/app/data/products-data";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React from "react";
import ProductFilterSection from "./ProductFilterSection";
import CheckboxFilterItem from "./CheckboxFilterItem";
import { Button } from "@/components/ui/button";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const MarksFilters = ({
  marks,
}: {
  marks: Awaited<ReturnType<typeof getProductMarks>>;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { categories } = useParams() as { categories: string[] };
  const mainCategory = categories[0];
  const subCategory = categories[1];

  const selectedMarks = searchParams.get("mark")?.split(",") || [];

  const handleMarkChange = (mark: string) => {
    const newSelectedMarks = selectedMarks.includes(mark)
      ? selectedMarks.filter((m) => m !== mark)
      : [...selectedMarks, mark];

    // Update URL without pushing a new history entry
    const params = new URLSearchParams(searchParams);
    if (newSelectedMarks.length > 0) {
      params.set("mark", newSelectedMarks.join(","));
      params.set("page","1")
    } else {
      params.delete("mark");
    }
    router.replace(`/products/${mainCategory}/${subCategory}?${params.toString()}`);
  };

  const handleApplyFilters = () => {
    // Force a refresh or update the product list
    router.refresh();
  };

  return (
    <Card className="mt-6">
      <CardHeader className="pb-2">
        <h3 className="font-bold text-lg">Filtrer par</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <ProductFilterSection title="Marques">
            <div className="pl-2 space-y-2">
              {marks.map((mark) => (
                <CheckboxFilterItem
                  onChange={handleMarkChange}
                  key={mark.mark}
                  slug={mark.markSlug}
                  label={mark.mark}
                  count={mark.count}
                  checked={selectedMarks.includes(mark.markSlug)}
                />
              ))}
            </div>
          </ProductFilterSection>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-black text-white hover:bg-gray-800"
          onClick={handleApplyFilters}
        >
          Appliquer les filtres
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MarksFilters;