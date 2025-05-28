"use client";

import { Lock, ShoppingCart } from "lucide-react";
import { useState } from "react";

import CartMobileCard from "@/components/common/Cart/CartMobileCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  insideDhakaShippingCost,
  outsideDhakaShippingCost,
} from "@/constants/productKey";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  removeFromCart,
  updateQuantity,
  updateShippingOption,
} from "@/redux/reducers/cartSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartSheet() {
  const [isOpen, setIsOpen] = useState(false);

  // const subtotal = cartItems.reduce(
  //   (sum, item) => sum + item.price * item.quantity,
  //   0
  // );
  // const shippingCost = 100;
  // const freeShippingThreshold = 2000;
  // const remainingForFreeShipping = Math.max(
  //   0,
  //   freeShippingThreshold - subtotal
  // );
  // const total =
  //   subtotal + (subtotal >= freeShippingThreshold ? 0 : shippingCost);

  // const handleUpdateQuantity = (id: string, newQuantity: number) => {
  //   if (newQuantity <= 0) {
  //     onRemoveItem?.(id);
  //   } else {
  //     onUpdateQuantity?.(id, newQuantity);
  //   }
  // };

  // const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [shippingOption, setShippingOption] = useState("outside");

  const router = useRouter();

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shippingCost =
    shippingOption === "inside"
      ? insideDhakaShippingCost
      : outsideDhakaShippingCost;
  // const freeShippingThreshold = 2000;
  // const remainingForFreeShipping = Math.max(
  //   0,
  //   freeShippingThreshold - subtotal
  // );
  const total = subtotal + shippingCost;

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  const removeItem = (productId: string) => {
    // setCartItems((items) => items.filter((item) => item.id !== id));
    dispatch(removeFromCart(productId));
  };

  // handle checkout
  const handleCheckout = () => {
    setIsOpen(false);
    dispatch(updateShippingOption(shippingOption));

    router.push("/checkout");
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />

          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
          >
            {cartItems.length}
          </Badge>
        </Button>
      </SheetTrigger>
      <SheetContent hideClose={false} className="w-full sm:max-w-[400px]">
        <SheetHeader className="-mb-4">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full overflow-auto">
          {/* Header */}
          <div className="border-b border-primary/10">
            <div className="w-full max-w-4xl mx-auto py-6">
              <div className="flex items-center justify-center">
                <div className="flex items-center space-x-1">
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                      1
                    </div>
                    <span className="ml-2 text-sm font-medium text-primary">
                      Cart
                    </span>
                  </div>
                  <div className="h-px w-6 bg-gray-300"></div>
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                      2
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-500">
                      Checkout
                    </span>
                  </div>
                  <div className="h-px w-6 bg-gray-300"></div>
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
          <div className="w-full py-12 px-4">
            <div>
              <div>
                <div className="">
                  {cartItems.length === 0 ? (
                    <div className="h-full w-full mx-auto text-center py-12">
                      <h4 className="text-lg lg:text-xl font-medium mb-4">
                        Your cart is empty!
                      </h4>
                      <Button asChild>
                        <Link href="/products">Continue Shopping</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="py-6">
                      {cartItems.map((item, index) => (
                        <div key={item.product._id}>
                          <div className="">
                            <CartMobileCard
                              item={item}
                              onCartQuantityUpdate={handleUpdateQuantity}
                              onCartRemove={removeItem}
                            />
                          </div>
                          {index < cartItems.length - 1 && (
                            <hr className="my-4 border border-primary/10" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <Card className="">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between">
                      <span className="font-medium text-lg">Subtotal:</span>
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
                            <RadioGroupItem value="outside" id="outside" />
                            <Label htmlFor="outside">
                              Outside Dhaka City (3-5 Days):
                            </Label>
                          </div>
                          <span className="font-medium">৳ 100.00</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="inside" id="inside" />
                            <Label htmlFor="inside">
                              Inside Dhaka city (2-3 Days):
                            </Label>
                          </div>
                          <span className="font-medium">৳ 50.00</span>
                        </div>
                      </RadioGroup>
                      <p className="text-sm text-gray-600 mt-2">
                        Shipping options will be updated during checkout.
                      </p>
                    </div>

                    <hr className="border border-primary/20" />

                    <div className="flex justify-between items-center text-lg font-bold">
                      <span className="text-xl">Total</span>
                      <span>৳ {total.toFixed(2)}</span>
                    </div>

                    <Button
                      className="w-full py-5"
                      asChild
                      disabled={cartItems.length === 0}
                      onClick={handleCheckout}
                    >
                      <Link href="/checkout">
                        <Lock className="h-4 w-4 mr-2" />
                        Proceed to checkout
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setIsOpen(false);
                        // Navigate to cart page
                        router.push("/cart");
                      }}
                      disabled={cartItems.length === 0}
                    >
                      View Cart
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
