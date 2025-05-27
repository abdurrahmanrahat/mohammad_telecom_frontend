"use client";

import type React from "react";

import { Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
}

export default function Checkout() {
  const shipOption = useAppSelector((state) => state.cart.shippingOption);

  const [shippingOption, setShippingOption] = useState(shipOption || "outside");
  const [formData, setFormData] = useState({
    fullName: "",
    fullAddress: "",
    phoneNo: "",
    email: "",
    country: "Bangladesh",
    orderNotes: "",
  });

  const cartItems = useAppSelector((state) => state.cart.items);

  const router = useRouter();

  const dispatch = useAppDispatch();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const orderItems = cartItems.map((item) => item.product._id);
  console.log("orderItem", orderItems);

  const shippingCost = shippingOption === "inside" ? 50 : 100;
  const total = subtotal + shippingCost;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Order submitted:", {
      ...formData,
      insideDhaka: shippingOption === "inside" ? true : false,
      orderItems,
      totalPrice: total,
    });
    // Redirect to confirmation page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-primary/10">
        <div className="w-full max-w-4xl mx-auto py-4 mt-6">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-1 lg:space-x-4">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <span className="ml-2 text-sm font-medium">Cart</span>
              </div>
              <div className="h-px w-6 md:w-10 lg:w-16 bg-primary"></div>
              <div className="flex items-center">
                <div className="h-8 w-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <span className="ml-2 text-sm font-medium text-primary">
                  Checkout
                </span>
              </div>
              <div className="h-px w-6 md:w-10 lg:w-16 bg-gray-300"></div>
              <div className="flex items-center">
                <div className="h-8 w-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <span className="ml-2 text-sm font-medium text-gray-500">
                  Confirmation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 lg:pb-16">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Billing & Shipping Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Billing & Shipping</h2>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="fullName" className="text-base font-medium">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      required
                      className="mt-2 h-11"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="fullAddress"
                      className="text-base font-medium"
                    >
                      Full Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullAddress"
                      type="text"
                      placeholder="House number and street name"
                      required
                      className="mt-2 h-11"
                      value={formData.fullAddress}
                      onChange={(e) =>
                        handleInputChange("fullAddress", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="phoneNo" className="text-base font-medium">
                      Phone No <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phoneNo"
                      type="tel"
                      placeholder="5"
                      required
                      className="mt-2 h-11"
                      value={formData.phoneNo}
                      onChange={(e) =>
                        handleInputChange("phoneNo", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-base font-medium">
                      Email address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      className="mt-2 h-11"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="country" className="text-base font-medium">
                      Country / Region <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="country"
                      type="text"
                      placeholder="Bangladesh"
                      required
                      className="mt-2 h-11"
                      value={formData.country}
                      onChange={(e) =>
                        handleInputChange("country", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">
                    Additional information
                  </h3>
                  <div>
                    <Label
                      htmlFor="orderNotes"
                      className="text-base font-medium"
                    >
                      Order notes (optional)
                    </Label>
                    <Textarea
                      id="orderNotes"
                      placeholder="Notes about your order, e.g. special notes for delivery."
                      className="mt-2 min-h-[120px]"
                      value={formData.orderNotes}
                      onChange={(e) =>
                        handleInputChange("orderNotes", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="mb-8 lg:mb-0">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6">Your order</h3>

                  {/* Order Items */}
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.product._id} className="flex gap-3">
                        <Image
                          src={item.product.image || "/placeholder.svg"}
                          alt={`photo`}
                          width={60}
                          height={60}
                          className="rounded-md object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm leading-tight">
                            {item.product.name}
                          </h4>

                          <p className="text-sm text-gray-600">
                            × {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            ৳ {(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <hr className="mb-4 border border-primary/10" />

                  {/* Pricing */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="font-medium">Subtotal:</span>
                      <span className="font-semibold">
                        ৳ {subtotal.toFixed(2)}
                      </span>
                    </div>

                    <div>
                      <p className="font-medium mb-3 text-lg">Shipping</p>
                      <RadioGroup
                        value={shippingOption}
                        onValueChange={setShippingOption}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="outside"
                              id="outside-checkout"
                            />
                            <Label
                              htmlFor="outside-checkout"
                              className="text-sm"
                            >
                              Outside Dhaka City (3-5 Days):
                            </Label>
                          </div>
                          <span className="font-semibold">৳ 100.00</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="inside"
                              id="inside-checkout"
                            />
                            <Label
                              htmlFor="inside-checkout"
                              className="text-sm"
                            >
                              Inside Dhaka city (2-3 Days):
                            </Label>
                          </div>
                          <span className="font-semibold">৳ 50.00</span>
                        </div>
                      </RadioGroup>
                    </div>

                    <hr className="border border-primary/10" />

                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-xl">Total</span>
                      <span>৳ {total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-6">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span className="font-medium">Cash on delivery</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Pay with cash upon delivery.
                      </p>
                    </div>
                  </div>

                  {/* Privacy Policy */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-600">
                      Your personal data will be used to process your order,
                      support your experience throughout this website, and for
                      other purposes described in our{" "}
                      <Link
                        href="/privacy-policy"
                        className="text-blue-600 underline"
                      >
                        privacy policy
                      </Link>
                      .
                    </p>
                  </div>

                  {/* Place Order Button */}
                  <Button type="submit" className="w-full text-lg py-5">
                    <Lock className="h-5 w-5 mr-2" />
                    Place order
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
