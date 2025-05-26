"use client";

import { Lock, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Premium Leather Loffer For Men",
      price: 1590,
      quantity: 1,
      image: "/placeholder.svg?height=120&width=120",
      size: "42",
    },
  ]);

  const [shippingOption, setShippingOption] = useState("outside");

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = shippingOption === "inside" ? 50 : 100;
  const freeShippingThreshold = 2000;
  const remainingForFreeShipping = Math.max(
    0,
    freeShippingThreshold - subtotal
  );
  const total = subtotal + shippingCost;

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      setCartItems((items) =>
        items.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
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
                <span className="ml-2 text-sm font-medium text-red-600">
                  Shopping Cart
                </span>
              </div>
              <div className="h-px w-16 bg-gray-300"></div>
              <div className="flex items-center">
                <div className="h-8 w-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <span className="ml-2 text-sm font-medium text-gray-500">
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
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {cartItems.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-500 mb-4">Your cart is empty</p>
                  <Button asChild>
                    <Link href="/">Continue Shopping</Link>
                  </Button>
                </div>
              ) : (
                <div className="p-6">
                  {cartItems.map((item, index) => (
                    <div key={item.id}>
                      <div className="flex gap-4 items-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 hover:text-red-500"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>

                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={120}
                          height={120}
                          className="rounded-lg object-cover"
                        />

                        <div className="flex-1">
                          <h3 className="font-medium text-lg">{item.name}</h3>
                          {item.size && (
                            <p className="text-gray-600 mt-1">
                              Size: {item.size}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold text-lg">
                            ৳ {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      {index < cartItems.length - 1 && <hr className="my-6" />}
                    </div>
                  ))}

                  {/* Free shipping progress */}
                  {remainingForFreeShipping > 0 && (
                    <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-green-700">
                          You are ৳ {remainingForFreeShipping.toFixed(2)} away
                          from free shipping.
                        </span>
                        <Link
                          href="/"
                          className="text-sm text-green-700 underline font-medium"
                        >
                          Continue Shopping
                        </Link>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.min(
                              100,
                              (subtotal / freeShippingThreshold) * 100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex justify-center">
                    <Button variant="outline" className="px-8">
                      Update cart
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">৳ {subtotal.toFixed(2)}</span>
                </div>

                <div>
                  <p className="font-medium mb-3">Shipping</p>
                  <RadioGroup
                    value={shippingOption}
                    onValueChange={setShippingOption}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="outside" id="outside" />
                        <Label htmlFor="outside">
                          Outside Dhaka City (3-5 Days):
                        </Label>
                      </div>
                      <span className="font-semibold">৳ 100.00</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="inside" id="inside" />
                        <Label htmlFor="inside">
                          Inside Dhaka city (2-3 Days):
                        </Label>
                      </div>
                      <span className="font-semibold">৳ 50.00</span>
                    </div>
                  </RadioGroup>
                  <p className="text-sm text-gray-600 mt-2">
                    Shipping options will be updated during checkout.
                  </p>
                </div>

                <hr />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>৳ {total.toFixed(2)}</span>
                </div>

                <Button
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3"
                  asChild
                  disabled={cartItems.length === 0}
                >
                  <Link href="/checkout">
                    <Lock className="h-4 w-4 mr-2" />
                    Proceed to checkout
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
