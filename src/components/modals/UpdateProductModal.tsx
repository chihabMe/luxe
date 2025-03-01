import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import UpdateProductForm from "@/app/admin/dashboard/products/_components/UpdateProductForm";
import { getAllCategories } from "@/app/data/categories-data";
import { getAllMainCategories } from "@/app/data/main-categories-data";
import { getProducts } from "@/app/data/products-data";

interface Props {
  product: Awaited<ReturnType<typeof getProducts>>["data"][0];
  open: boolean;
  closeModal: () => void;
  categories: Awaited<ReturnType<typeof getAllCategories>>;
  mainCategories: Awaited<ReturnType<typeof getAllMainCategories>>;
}

const UpdateProductModal = ({
  product,
  categories,
  mainCategories,
  closeModal,
  open,
}: Props) => {
  return (
    <>
      <Dialog open={open} onOpenChange={closeModal}>
        <DialogContent className="max-w-2xl h-[95vh] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Update Product</DialogTitle>
          </DialogHeader>
          <UpdateProductForm
            categories={categories}
            mainCategories={mainCategories}
            initialData={{
              ...product,
              category: {
                id: product.category.id,
                name: product.category.name,
              },
              mainCategory: {
                id: product.category.mainCategory.id,
                name: product.category.mainCategory.name,
              },
              specifications: product.specifications.map((spec) => ({
                name: spec.name,
                values: spec.values.map((v) => v.value),
              })),
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateProductModal;
