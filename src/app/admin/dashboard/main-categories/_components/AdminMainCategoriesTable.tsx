"use client";
import { Button } from "@/components/ui/button";
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
import { MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { deleteMainCategory } from "../actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getMainCategories } from "@/app/data/main-categories-data";
import CreateMainCategoryModal from "@/components/modals/CreateMainCategoryModal";

interface Props {
  data: Awaited<ReturnType<typeof getMainCategories>>["data"];
  count: number;
  currentPage: number;
  searchTerm: string;
}

export default function AdminMainCategoryTable({
  data,
  count,
  currentPage,
  searchTerm,
}: Props) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(searchTerm || "");
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  // Handle search with debounce
  const handleSearch = (value: string) => {
    setSearchInput(value);

    // Clear previous timeout if category keeps typing
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new timeout to wait for 500ms before executing search
    const timeout = setTimeout(() => {
      router.push(
        `/admin/dashboard/categorys?search=${value}&page=${currentPage}`
      );
    }, 500);

    setDebounceTimeout(timeout);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between space-x-6">
          <CardTitle>Main Categorys Dashboard</CardTitle>
          <CreateMainCategoryModal />
        </div>
      </CardHeader>
      <CardContent className="min-h-[calc(100vh-328px)]">
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <Input
            placeholder="Search categorys..."
            value={searchInput}
            onChange={(e) => handleSearch(e.target.value)}
            className="md:w-1/3"
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableItem key={item.id} category={item} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex w-full justify-center">
        <span className="text-sm text-muted-foreground">{count} categorys</span>
      </CardFooter>
    </Card>
  );
}
interface TableItemProps {
  category: Awaited<ReturnType<typeof getMainCategories>>["data"][0];
}
const TableItem = ({ category }: TableItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <TableRow onClick={() => setIsOpen(true)} key={category.id}>
        <TableCell className=" md:min-w-32">
          {category.name.slice(0, 20)}
          {category.name.length > 20 && "..."}
        </TableCell>
        <TableCell>{category.createdAt?.toLocaleDateString()}</TableCell>
        <TableCell onClick={(e) => e.stopPropagation()}>
          <CategoryActionsMenu category={category} />
        </TableCell>
      </TableRow>
    </>
  );
};

interface CategoryActionsMenuProps {
  category: Awaited<ReturnType<typeof getMainCategories>>["data"][0];
}

export const CategoryActionsMenu = ({ category }: CategoryActionsMenuProps) => {
  const deleteCategoryHandler = async () => {
    const result = await deleteMainCategory({
      id: category.id,
    });
    if (result?.data?.success) {
      toast("Category deleted");
    } else {
      toast("Failed to delete category");
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
            onClick={deleteCategoryHandler}
          >
            Delete
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
