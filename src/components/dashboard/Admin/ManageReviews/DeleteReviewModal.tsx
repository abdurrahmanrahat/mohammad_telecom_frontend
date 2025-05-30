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
import { useDeleteReviewMutation } from "@/redux/api/productReviewApi";
import { AlertTriangle, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const DeleteReviewModal = ({
  productId,
  reviewId,
}: {
  productId: string;
  reviewId: string;
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  // RTK mutation hook
  const [deleteReview] = useDeleteReviewMutation();

  const handleDeleteReview = async () => {
    try {
      const res = await deleteReview({ productId, reviewId }).unwrap();

      if (res.success) {
        toast.success(res.message || "Review deleted successfully.");
      }
    } catch (error: any) {
      toast.error(
        error?.data?.errorSources?.[0]?.message ||
          "Failed to delete the review."
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
            Are you sure you want to delete this review?
          </p>
          <p className="text-sm text-gray-500 mb-6">
            This action cannot be undone. The review will be permanently
            removed.
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
                onClick={handleDeleteReview}
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

export default DeleteReviewModal;
