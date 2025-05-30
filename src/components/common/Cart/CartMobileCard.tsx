import { Button } from "@/components/ui/button";
import { TProduct } from "@/types";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

type TCartCardProps = {
  item: { product: TProduct; quantity: number };
  onCartQuantityUpdate: (
    currStock: number,
    productId: string,
    quantity: number
  ) => void;
  onCartRemove: (id: string) => void;
};

const CartMobileCard = ({
  item,
  onCartQuantityUpdate,
  onCartRemove,
}: TCartCardProps) => {
  return (
    <div className="grid grid-cols-12 gap-2 items-center">
      <div className="col-span-3">
        <Image
          src={item.product.image || "/placeholder.svg"}
          alt={item.product.name.slice(0, 6)}
          width={100}
          height={100}
          className="rounded-md object-cover"
        />
      </div>

      <div className="col-span-9 space-y-2">
        <div className="flex justify-between gap-2">
          <h3 className="text-sm line-clamp-2">{item.product.name}</h3>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-600"
            onClick={() => onCartRemove(item.product._id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-between border-b border-primary/10 pb-2">
          <h4 className="font-medium">Quantity:</h4>
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() =>
                onCartQuantityUpdate(
                  item.product.stock,
                  item.product._id,
                  item.quantity - 1
                )
              }
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-medium block">
              {item.quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() =>
                onCartQuantityUpdate(
                  item.product.stock,
                  item.product._id,
                  item.quantity + 1
                )
              }
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex justify-between">
          <p className="font-medium">Subtotal:</p>
          <p className="">
            ৳ {(item.product.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartMobileCard;
