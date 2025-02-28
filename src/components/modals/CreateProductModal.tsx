"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import AddNewProductForm from "@/app/admin/dashboard/products/_components/AddNewProductForm";
import { getAllCategories } from "@/app/data/categories-data";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { getAllMainCategories } from "@/app/data/main-categories-data";

const CreateProductModal = ({
  categories,
  mainCategories
}: {
  categories: Awaited<ReturnType<typeof getAllCategories>>;
  mainCategories:Awaited<ReturnType<typeof getAllMainCategories>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);

  return (
    <>
      <Button onClick={openModal} className="  rounded-sm hidden lg:block  ">
        <PlusIcon />
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl  h-[95vh] overflow-y-scroll     outline-none ring-none ">
          <DialogHeader>
            <DialogTitle> Create a new product </DialogTitle>
            {/* <DialogDescription>
              this admin product will be able to manage the admin page
            </DialogDescription> */}
            <AddNewProductForm mainCategories={mainCategories} categories={categories} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateProductModal;
