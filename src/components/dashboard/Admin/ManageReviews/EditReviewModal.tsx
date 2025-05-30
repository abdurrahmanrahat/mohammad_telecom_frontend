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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useApprovedReviewMutation } from "@/redux/api/productReviewApi";
import { Edit, Package } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

type TReviewStatus = "PENDING" | "APPROVED";

type TUpdateOrderModalProps = {
  productId: string;
  reviewId: string;
  currentStatus: TReviewStatus;
};

const EditReviewModal = ({
  productId,
  reviewId,
  currentStatus,
}: TUpdateOrderModalProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedStatus, setSelectedStatus] =
    useState<TReviewStatus>(currentStatus);

  // rtk api
  const [approvedReview, { isLoading }] = useApprovedReviewMutation();

  const statusOptions: {
    value: TReviewStatus;
    label: string;
    color: string;
  }[] = [
    { value: "PENDING", label: "PENDING", color: "text-yellow-600" },
    { value: "APPROVED", label: "APPROVED", color: "text-green-600" },
  ];

  const handleApprovedReview = async () => {
    if (selectedStatus === currentStatus) {
      toast.info("No changes made to the review status.");
      setIsOpenModal(false);
      return;
    }

    try {
      const res = await approvedReview({ productId, reviewId }).unwrap();

      if (res.success) {
        toast.success(res.message || "Review approved successfully!");
        setIsOpenModal(false);
      }
    } catch (error: any) {
      toast.error(
        error?.data?.errorSources?.[0]?.message || "Something went wrong!"
      );
    }
  };

  const getCurrentStatusColor = (): string => {
    return (
      statusOptions.find((option) => option.value === currentStatus)?.color ||
      "text-gray-600"
    );
  };

  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogTrigger asChild>
        <button className="cursor-pointer">
          <Edit className="h-5 w-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="w-full !max-w-[480px] max-h-[80%] overflow-auto bg-white">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-bold flex items-center justify-center gap-2">
            <Package className="h-6 w-6" />
            Approve Review
          </DialogTitle>
        </DialogHeader>

        <div className="py-6">
          <div className="mb-6">
            <p className="text-gray-700 mb-2 text-center">
              Update the status of this review
            </p>
            <p className="text-sm text-gray-500 text-center">
              Current status:{" "}
              <span className={`font-medium ${getCurrentStatusColor()}`}>
                {
                  statusOptions.find((option) => option.value === currentStatus)
                    ?.label
                }
              </span>
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-medium">
                New Status
              </Label>
              <Select
                value={selectedStatus}
                onValueChange={(value: TReviewStatus) =>
                  setSelectedStatus(value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select order status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <span className={option.color}>{option.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              onClick={() => setIsOpenModal(false)}
              className="min-w-[100px] cursor-pointer"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <DialogClose asChild>
              <Button
                className="min-w-[100px] cursor-pointer"
                onClick={handleApprovedReview}
                disabled={isLoading}
              >
                {isLoading ? "Approving..." : "Approved"}
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditReviewModal;
