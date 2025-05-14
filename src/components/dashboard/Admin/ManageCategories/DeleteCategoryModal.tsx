import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteCategoryMutation } from "@/redux/api/categoryApi";
import { AlertTriangle, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const DeleteCategoryModal = ({ categoryId }: { categoryId: string }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  // rtk api
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDeleteCategory = async () => {
    setIsOpenModal(false);

    try {
      const res = await deleteCategory(categoryId).unwrap();

      if (res.success) {
        toast.success(res.message);
      }
    } catch (error: any) {
      console.log("error", error);

      toast.error(
        error?.data?.errorSources[0].message || "Something went wrong!"
      );
    }
  };

  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Delete Category
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this category? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 sm:justify-end pt-4">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => setIsOpenModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="cursor-pointer"
            onClick={handleDeleteCategory}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCategoryModal;
