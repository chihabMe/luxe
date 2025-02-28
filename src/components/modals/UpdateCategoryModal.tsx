"use client";
import UpdateCategoryForm from "@/app/admin/dashboard/categories/_components/UpdateCategoryForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { getCategories } from "@/app/data/categories-data";
import { getAllMainCategories } from "@/app/data/main-categories-data";

interface Props {
  category: Awaited<ReturnType<typeof getCategories>>["data"][0];
  mainCategories: Awaited<ReturnType<typeof getAllMainCategories>>;
  open: boolean;
  closeModal: () => void;
}

const UpdateCategoryModal = ({
  category,
  closeModal,
  open,
  mainCategories,
}: Props) => {
  return (
    <>
      <Dialog open={open} onOpenChange={closeModal}>
        <DialogContent className="max-w-2xl h-[95vh] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Update Product</DialogTitle>
          </DialogHeader>
          <UpdateCategoryForm
            mainCategories={mainCategories}
            initialData={{
              ...category,
              isFeatured: category.isFeatured ?? false,
              image: category.image ?? "",
              name: category.name,
              mainCategoryId: category.mainCategoryId,
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateCategoryModal;
