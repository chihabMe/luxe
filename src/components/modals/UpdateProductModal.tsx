import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import UpdateProductForm from "@/app/admin/dashboard/products/_components/UpdateProductForm";
import { getAllCategories } from "@/app/data/categories-data";
import { getProducts } from "@/app/data/products-data";

interface Props {
  product: Awaited<ReturnType<typeof getProducts>>["data"][0];
  open: boolean;
  closeModal: () => void;
  categories: Awaited<ReturnType<typeof getAllCategories>>;
}

const UpdateProductModal = ({
  product,
  categories,
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
            initialData={{
              ...product,
              discount: product.discount ?? undefined,
              showInCarousel:product.showInCarousel??undefined,
              category: {
                id: product.category?.id ?? "",
                name: product.category?.name ?? "",
              },
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateProductModal;
