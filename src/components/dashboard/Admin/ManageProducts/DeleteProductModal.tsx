"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteProductMutation } from "@/redux/api/productApi";
import { AlertTriangle, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const DeleteProductModal = ({ productId }: { productId: string }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  // rtk api
  const [deleteProduct] = useDeleteProductMutation();

  const handleDeleteProduct = async () => {
    try {
      const res = await deleteProduct(productId).unwrap();

      if (res.success) {
        toast.success(res.message);
      }
    } catch (error: any) {
      toast.error(
        error?.data?.errorSources[0].message || "Something went wrong!"
      );
    }
  };

  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogTrigger asChild>
        <button className="cursor-pointer">
          <Trash2 className="h-5 w-5 text-red-600" />
        </button>
      </DialogTrigger>
      <DialogContent className="w-full !max-w-[480px] max-h-[80%] overflow-auto bg-white">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-bold text-red-600 flex items-center justify-center gap-2">
            <AlertTriangle className="h-6 w-6" />
            Confirm Deletion
          </DialogTitle>
        </DialogHeader>

        <div className="py-6 text-center">
          <p className="text-gray-700 mb-2">
            Are you sure you want to delete this product?
          </p>
          <p className="text-sm text-gray-500 mb-6">
            This action cannot be undone. All data associated with this product
            will be permanently removed.
          </p>

          <div className="flex items-center justify-center gap-4 mt-6">
            <Button
              variant="outline"
              onClick={() => setIsOpenModal(false)}
              className="min-w-[100px] cursor-pointer"
            >
              Cancel
            </Button>
            <DialogClose asChild>
              <Button
                variant="destructive"
                className="min-w-[100px] bg-red-600 hover:bg-red-700 cursor-pointer"
                onClick={handleDeleteProduct}
              >
                Delete
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProductModal;
