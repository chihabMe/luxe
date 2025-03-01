"use client";
import { getProducts } from "@/app/data/products-data";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  // TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { useToast } from "@/hooks/use-toast";
import { Check, MoreHorizontalIcon, X } from "lucide-react";
import { useState } from "react";
import { deleteProduct } from "../actions";
import CreateProductModal from "@/components/modals/CreateProductModal";
import { useRouter } from "next/navigation";
import UpdateProductModal from "@/components/modals/UpdateProductModal";
import { getAllCategories } from "@/app/data/categories-data";
import { getAllMainCategories } from "@/app/data/main-categories-data";

interface Props {
  data: Awaited<ReturnType<typeof getProducts>>["data"];
  count: number;
  currentPage: number;
  searchTerm: string;
  categories: Awaited<ReturnType<typeof getAllCategories>>;
  mainCategories: Awaited<ReturnType<typeof getAllMainCategories>>;
}

export default function AdminProductsTable({
  data,
  count,
  currentPage,
  searchTerm,
  categories,
  mainCategories,
}: Props) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(searchTerm || "");
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  // Handle search with debounce
  const handleSearch = (value: string) => {
    setSearchInput(value);

    // Clear previous timeout if product keeps typing
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new timeout to wait for 500ms before executing search
    const timeout = setTimeout(() => {
      router.push(
        `/admin/dashboard/products?search=${value}&page=${currentPage}`
      );
    }, 500);

    setDebounceTimeout(timeout);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between space-x-6">
          <CardTitle>Products Dashboard</CardTitle>
          <CreateProductModal
            mainCategories={mainCategories}
            categories={categories}
          />
        </div>
      </CardHeader>
      <CardContent className="min-h-[calc(100vh-328px)]">
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <Input
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => handleSearch(e.target.value)}
            className="md:w-1/3"
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Main Category</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Mark</TableHead>
              <TableHead>featured</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableItem
                mainCategories={mainCategories}
                categories={categories}
                key={item.id}
                product={item}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex w-full justify-center">
        <span className="text-sm text-muted-foreground">{count} products</span>
      </CardFooter>
    </Card>
  );
}
interface TableItemProps {
  product: Awaited<ReturnType<typeof getProducts>>["data"][0];
  categories: Awaited<ReturnType<typeof getAllCategories>>;
  mainCategories: Awaited<ReturnType<typeof getAllMainCategories>>;
}
const TableItem = ({ product, mainCategories, categories }: TableItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <UpdateProductModal
        mainCategories={mainCategories}
        categories={categories}
        closeModal={() => setIsOpen(false)}
        open={isOpen}
        product={product}
      />
      <TableRow onClick={() => setIsOpen(true)} key={product.id}>
        <TableCell className=" md:min-w-32">
          {product.name.slice(0, 20)}
          {product.name.length > 20 && "..."}
        </TableCell>

        <TableCell>{product.category.mainCategory.name}</TableCell>

        <TableCell>{product.category.name}</TableCell>
        <TableCell>{product.mark}</TableCell>
        <TableCell>
          {product.isFeatured ? (
            <Check className="w-5 h-5" />
          ) : (
            <X className="w-5 h-5" />
          )}
        </TableCell>
        <TableCell>{product.createdAt?.toLocaleDateString()}</TableCell>
        <TableCell onClick={(e) => e.stopPropagation()}>
          <ProductActionsMenu product={product} />
        </TableCell>
      </TableRow>
    </>
  );
};

interface ProductActionsMenuProps {
  product: Awaited<ReturnType<typeof getProducts>>["data"][0];
}

export const ProductActionsMenu = ({ product }: ProductActionsMenuProps) => {
  const deleteProductHandler = async () => {
    const result = await deleteProduct({
      id: product.id,
    });
    if (result?.data?.success) {
      toast("Product deleted");
    } else {
      toast("Failed to delete product", {});
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-8 p-0">
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuItem>
          <Button
            className="w-full"
            variant="destructive"
            size="sm"
            onClick={deleteProductHandler}
          >
            Delete
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
