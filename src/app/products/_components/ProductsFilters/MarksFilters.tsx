"use client";

import { getProductMarks } from "@/app/data/products-data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useCallback, useMemo } from "react";
import ProductFilterSection from "./ProductFilterSection";
import CheckboxFilterItem from "./CheckboxFilterItem";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const MarksFilters = ({
  marks,
}: {
  marks: Awaited<ReturnType<typeof getProductMarks>>;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { categories } = useParams() as { categories: string[] };

  // Ensure categories are defined
  const mainCategory = categories?.[0] || "";
  const subCategory = categories?.[1] || "";

  // Get selected marks from URL
  const selectedMarks = useMemo(
    () => searchParams.get("mark")?.split(",") || [],
    [searchParams]
  );

  // Handle mark selection changes
  const handleMarkChange = useCallback(
    (markSlug: string) => {
      const newSelectedMarks = selectedMarks.includes(markSlug)
        ? selectedMarks.filter((m) => m !== markSlug)
        : [...selectedMarks, markSlug];

      // Update URL with new selected marks
      const params = new URLSearchParams(searchParams);
      if (newSelectedMarks.length > 0) {
        params.set("mark", newSelectedMarks.join(","));
      } else {
        params.delete("mark");
      }
      // Reset pagination to page 1 when filters change
      params.set("page", "1");

      // Update URL without pushing a new history entry
      router.replace(
        `/products/${mainCategory}/${subCategory}?${params.toString()}`
      );
    },
    [selectedMarks, searchParams, mainCategory, subCategory, router]
  );

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
                  key={mark.markSlug}
                  slug={mark.markSlug}
                  label={mark.mark}
                  count={mark.count}
                  checked={selectedMarks.includes(mark.markSlug)}
                  onChange={handleMarkChange}
                />
              ))}
            </div>
          </ProductFilterSection>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarksFilters;
