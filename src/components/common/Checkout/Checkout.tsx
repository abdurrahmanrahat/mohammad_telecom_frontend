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

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
}

export default function Checkout() {
  const [shippingOption, setShippingOption] = useState("outside");
  const [formData, setFormData] = useState({
    fullName: "",
    fullAddress: "",
    phoneNo: "",
    email: "",
    orderNotes: "",
  });

  const orderItems: OrderItem[] = [
    {
      id: "1",
      name: "Premium Leather Loffer For Men",
      price: 1590,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
      size: "42",
    },
  ];

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
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
      shippingOption,
      orderItems,
    });
    // Redirect to confirmation page
    window.location.href = "/confirmation";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
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
                <span className="ml-2 text-sm font-medium text-red-600">
                  Shipping and Checkout
                </span>
              </div>
              <div className="h-px w-16 bg-gray-300"></div>
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
      <div className="max-w-6xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Billing & Shipping Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
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
                      className="mt-2"
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
                      className="mt-2"
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
                      className="mt-2"
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
                      className="mt-2"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label className="text-base font-medium">
                      Country / Region <span className="text-red-500">*</span>
                    </Label>
                    <div className="mt-2 p-3 bg-gray-50 rounded-md">
                      <span className="font-medium">Bangladesh</span>
                    </div>
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
            <div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6">Your order</h3>

                  {/* Order Items */}
                  <div className="space-y-4 mb-6">
                    {orderItems.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded-md object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm leading-tight">
                            {item.name}
                          </h4>
                          {item.size && (
                            <p className="text-sm text-gray-600">
                              - {item.size}
                            </p>
                          )}
                          <p className="text-sm text-gray-600">
                            × {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            ৳ {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <hr className="mb-4" />

                  {/* Pricing */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold">
                        ৳ {subtotal.toFixed(2)}
                      </span>
                    </div>

                    <div>
                      <p className="font-medium mb-3">Shipping</p>
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

                    <hr />

                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>৳ {total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-6">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-red-600 rounded-full"></div>
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
                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-semibold"
                  >
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
