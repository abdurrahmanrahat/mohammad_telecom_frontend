"use client";

import {
  ArrowRight,
  Calendar,
  CheckCircle,
  Download,
  MapPin,
  Package,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { MyLoader } from "@/components/shared/Ui/MyLoader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetSingleOrderQuery } from "@/redux/api/orderApi";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
}

interface OrderConfirmationProps {
  orderNumber?: string;
  orderDate?: string;
  estimatedDelivery?: string;
  customerEmail?: string;
  shippingAddress?: {
    name: string;
    address: string;
    city: string;
    country: string;
    phone: string;
  };
  orderItems?: OrderItem[];
  subtotal?: number;
  shipping?: number;
  total?: number;
  orderId: string;
}

export default function OrderConfirmation({
  orderNumber = "UF-2024-001234",
  orderDate = "May 26, 2025",
  estimatedDelivery = "May 29-31, 2025",
  customerEmail = "customer@example.com",
  shippingAddress = {
    name: "John Doe",
    address: "House 123, Road 456, Dhanmondi",
    city: "Dhaka",
    country: "Bangladesh",
    phone: "+880 1234567890",
  },
  orderItems = [
    {
      id: "1",
      name: "Premium Leather Loffer For Men",
      price: 1590,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
      size: "42",
    },
  ],
  subtotal = 1590,
  shipping = 100,
  total = 1690,
  orderId,
}: OrderConfirmationProps) {
  // redux api
  const { data: order, isLoading: isOrderLoading } =
    useGetSingleOrderQuery(orderId);

  if (isOrderLoading) {
    return <MyLoader />;
  }

  console.log("order data", order);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Order Confirmed!
              </h1>
              <p className="text-gray-600">
                Thank you for your purchase. Your order has been confirmed and
                will be shipped soon.
              </p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <span className="ml-2 text-sm font-medium text-gray-900">
                  Shopping Cart
                </span>
              </div>
              <div className="h-px w-16 bg-red-600"></div>
              <div className="flex items-center">
                <div className="h-8 w-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <span className="ml-2 text-sm font-medium text-gray-900">
                  Shipping and Checkout
                </span>
              </div>
              <div className="h-px w-16 bg-red-600"></div>
              <div className="flex items-center">
                <div className="h-8 w-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <span className="ml-2 text-sm font-medium text-red-600">
                  Confirmation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
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
                    <p className="font-semibold">{orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Order Date</p>
                    <p className="font-semibold">{orderDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold">{customerEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Method</p>
                    <p className="font-semibold">Cash on Delivery</p>
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
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-semibold">{shippingAddress.name}</p>
                    <p className="text-gray-600">{shippingAddress.address}</p>
                    <p className="text-gray-600">
                      {shippingAddress.city}, {shippingAddress.country}
                    </p>
                    <p className="text-gray-600">{shippingAddress.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">
                      Estimated Delivery
                    </p>
                    <p className="text-sm text-blue-700">{estimatedDelivery}</p>
                  </div>
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
                  {orderItems.map((item, index) => (
                    <div key={item.id}>
                      <div className="flex gap-4">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          {item.size && (
                            <p className="text-sm text-gray-600 mt-1">
                              Size: {item.size}
                            </p>
                          )}
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-gray-600">
                              Qty: {item.quantity}
                            </span>
                            <span className="font-semibold">
                              ৳ {(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                      {index < orderItems.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
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
                  <span>Subtotal</span>
                  <span>৳ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>৳ {shipping.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>৳ {total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button className="w-full" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Invoice
              </Button>
              <Button className="w-full bg-red-600 hover:bg-red-700" asChild>
                <Link href="/">
                  Continue Shopping
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Support */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="font-semibold mb-2">Need Help?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Contact our customer support team for any questions about
                    your order.
                  </p>
                  <Button variant="outline" size="sm">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
