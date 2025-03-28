"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import AddNewMainCategoryForm from "@/app/admin/dashboard/main-categories/_components/AddNewMainCategoryForm";

const CreateMainCategoryModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);

  return (
    <>
      <Button onClick={openModal} className="  rounded-sm hidden lg:block  ">
        <PlusIcon />
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl  min-h-[60vh]   overflow-y-scroll     outline-none ring-none ">
          <DialogHeader>
            <DialogTitle> Create a new category </DialogTitle>
            {/* <DialogDescription>
              this admin category will be able to manage the admin page
            </DialogDescription> */}
            <AddNewMainCategoryForm   />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateMainCategoryModal;
