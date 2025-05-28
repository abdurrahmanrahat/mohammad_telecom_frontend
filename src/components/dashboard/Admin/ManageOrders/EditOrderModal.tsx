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
import { useUpdateOrderMutation } from "@/redux/api/orderApi";
import { Edit, Package } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

type TOrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

type TUpdateOrderModalProps = {
  orderId: string;
  currentStatus: TOrderStatus;
};

const EditOrderModal = ({ orderId, currentStatus }: TUpdateOrderModalProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedStatus, setSelectedStatus] =
    useState<TOrderStatus>(currentStatus);

  // rtk api
  const [updateOrder, { isLoading }] = useUpdateOrderMutation();

  const statusOptions: { value: TOrderStatus; label: string; color: string }[] =
    [
      { value: "PENDING", label: "PENDING", color: "text-yellow-600" },
      { value: "PROCESSING", label: "PROCESSING", color: "text-blue-600" },
      { value: "SHIPPED", label: "SHIPPED", color: "text-purple-600" },
      { value: "DELIVERED", label: "DELIVERED", color: "text-green-600" },
      { value: "CANCELLED", label: "CANCELLED", color: "text-red-600" },
    ];

  const handleUpdateStatus = async () => {
    if (selectedStatus === currentStatus) {
      toast.info("No changes made to the order status.");
      setIsOpenModal(false);
      return;
    }

    try {
      const payload = {
        orderId,
        updatedData: {
          status: selectedStatus,
        },
      };
      const res = await updateOrder(payload).unwrap();

      if (res.success) {
        toast.success(res.message || "Order status updated successfully!");
        setIsOpenModal(false);
      }
    } catch (error: any) {
      toast.error(
        error?.data?.errorSources?.[0]?.message || "Something went wrong!"
      );
    }
  };

  const getCurrentStatusColor = () => {
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
            Update Order Status
          </DialogTitle>
        </DialogHeader>

        <div className="py-6">
          <div className="mb-6">
            <p className="text-gray-700 mb-2 text-center">
              Update the status of this order
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
                onValueChange={(value: TOrderStatus) =>
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
                onClick={handleUpdateStatus}
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Status"}
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditOrderModal;
