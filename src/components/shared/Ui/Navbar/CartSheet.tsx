"use client";

import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
}

interface CartSheetProps {
  cartItems?: CartItem[];
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
}

export default function CartSheet({
  cartItems = [
    {
      id: "1",
      name: "Premium Leather Loffer For Men",
      price: 1590,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
      size: "42",
    },
  ],
  onUpdateQuantity,
  onRemoveItem,
}: CartSheetProps) {
  const [isOpen, setIsOpen] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = 100;
  const freeShippingThreshold = 2000;
  const remainingForFreeShipping = Math.max(
    0,
    freeShippingThreshold - subtotal
  );
  const total =
    subtotal + (subtotal >= freeShippingThreshold ? 0 : shippingCost);

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      onRemoveItem?.(id);
    } else {
      onUpdateQuantity?.(id, newQuantity);
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* Free shipping progress */}
          {remainingForFreeShipping > 0 && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-green-700">
                  You are ৳ {remainingForFreeShipping.toFixed(2)} away from free
                  shipping
                </span>
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

          {/* Cart items */}
          <div className="flex-1 overflow-y-auto mt-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingCart className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
                <Button className="mt-4" onClick={() => setIsOpen(false)}>
                  Continue Shopping
                </Button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 border rounded-lg">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-sm leading-tight">
                      {item.name}
                    </h3>
                    {item.size && (
                      <p className="text-sm text-gray-500 mt-1">
                        Size: {item.size}
                      </p>
                    )}
                    <p className="font-semibold mt-2">
                      ৳ {item.price.toFixed(2)}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-700"
                        onClick={() => onRemoveItem?.(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart summary */}
          {cartItems.length > 0 && (
            <div className="border-t pt-4 mt-4 space-y-3">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold">৳ {subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="font-semibold">
                  {subtotal >= freeShippingThreshold
                    ? "Free"
                    : `৳ ${shippingCost.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between text-lg font-bold border-t pt-3">
                <span>Total:</span>
                <span>৳ {total.toFixed(2)}</span>
              </div>

              <div className="space-y-2">
                <Button
                  className="w-full bg-red-600 hover:bg-red-700"
                  onClick={() => {
                    setIsOpen(false);
                    // Navigate to checkout
                  }}
                >
                  Checkout
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setIsOpen(false);
                    // Navigate to cart page
                  }}
                >
                  View Cart
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
