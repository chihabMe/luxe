"use client";
import UpdateCategoryForm from "@/app/admin/dashboard/categories/_components/UpdateCategoryForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { getCategories } from "@/app/data/categories-data";

interface Props {
  category: Awaited<ReturnType<typeof getCategories>>["data"][0];
  open: boolean;
  closeModal: () => void;
}

const UpdateCategoryModal = ({ category, closeModal, open }: Props) => {
  return (
    <>
      <Dialog open={open} onOpenChange={closeModal}>
        <DialogContent className="max-w-2xl h-[95vh] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Update Product</DialogTitle>
          </DialogHeader>
          <UpdateCategoryForm
            initialData={{
              ...category,
              isFeatured: category.isFeatured ?? false,
              imageUrl: category.image ?? "",
              image: null,
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateCategoryModal;
