import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  insideDhakaShippingCost,
  outsideDhakaShippingCost,
} from "@/constants/productKey";
import { TOrder, TProduct } from "@/types";
import { Info, MapPin, Package, Truck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type TOrderItem = {
  _id: string;
  product: TProduct;
  quantity: number;
};

const statusVariant = {
  PENDING: "destructive",
  PROCESSING: "outline",
  SHIPPED: "outline",
  DELIVERED: "default",
  CANCELLED: "destructive",
};

const OrderDetailsModal = ({ order }: { order: TOrder }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const subtotal = order?.orderItems?.reduce(
    (acc: number, item: TOrderItem) => {
      return acc + item.product.price * item.quantity;
    },
    0
  );

  const shipping = order?.insideDhaka
    ? insideDhakaShippingCost
    : outsideDhakaShippingCost;

  const total = subtotal + shipping;

  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogTrigger asChild>
        <button className="cursor-pointer hover:text-primary">
          <Info className="h-5 w-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="w-full !max-w-[880px] max-h-[80%] overflow-auto bg-white">
        <div>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {order.fullName}
            </DialogTitle>
            <DialogDescription>
              <Badge
                variant={
                  statusVariant[order.status] as
                    | "destructive"
                    | "outline"
                    | "default"
                    | "secondary"
                }
                className="capitalize"
              >
                {order.status.toLowerCase()}
              </Badge>
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Order Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Order Number</p>
                      <p className="font-semibold">{order.orderNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Order Date</p>
                      <p className="font-semibold">
                        {order.createdAt.slice(0, 10)}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold ">{order.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Payment Method</p>
                      <p className="font-semibold">
                        {order.paymentMethod || "N/A"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="md:flex justify-between gap-3 space-y-4 ">
                    <div className="w-full md:w-1/2 flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-gray-600">{order.fullAddress}</p>
                        <p className="text-gray-600">{order.country}</p>
                        <p className="text-gray-600">{order.phoneNo}</p>
                      </div>
                    </div>
                    {order?.orderNotes && (
                      <div className="w-full md:w-1/2 flex items-start gap-3">
                        <Info className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="font-semibold">Additional Notes:</p>
                          <p className="text-gray-600">{order.orderNotes}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.orderItems?.map(
                      (item: TOrderItem, index: number) => (
                        <div key={item._id}>
                          <div className="flex gap-4">
                            <Image
                              src={item.product.image || "/placeholder.svg"}
                              alt={item.product.name.slice(0, 5)}
                              width={80}
                              height={80}
                              className="rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-medium">
                                {item.product.name}
                              </h3>

                              <div className="flex items-center justify-between mt-2">
                                <span className="text-sm text-gray-600">
                                  Qty: {item.quantity}
                                </span>
                                <span className="font-semibold">
                                  ৳{" "}
                                  {(item.product.price * item.quantity).toFixed(
                                    2
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                          {index < order.orderItems.length - 1 && (
                            <Separator className="mt-4" />
                          )}
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>৳ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>৳ {shipping.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>৳ {total.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsModal;
