"use client";
import { getProductMarks } from "@/app/data/products-data";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React, { useEffect } from "react";
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
  const mark = searchParams.get("mark");
  const [selectedMarks, setSelectedMarks] = React.useState<string[]>(
    mark ? [mark] : []
  );
  const router = useRouter();
  const { categories } = useParams() as {
    categories: string[];
  };
  const mainCategory = categories[0];
  const subCategory = categories[1];
  const handleMarkChange = (mark: string) => {
    console.log("add or no add", mark);
    if (selectedMarks.includes(mark)) {
      setSelectedMarks(selectedMarks.filter((m) => m !== mark));
    } else {
      setSelectedMarks([...selectedMarks, mark]);
    }
  };
  useEffect(() => {
    console.log(mainCategory, subCategory, selectedMarks);
    if (mainCategory && subCategory && selectedMarks.length > 0) {
      router.push(
        `/products/${mainCategory}/${subCategory}?mark=${selectedMarks.join(
          ","
        )}`
      );
    }
  }, [selectedMarks, searchParams]);

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
                  id={mark.mark}
                  label={mark.mark}
                  count={mark.count}
                />
              ))}
            </div>
          </ProductFilterSection>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-black text-white hover:bg-gray-800">
          Appliquer les filtres
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MarksFilters;
