import { Button } from "@/components/ui/button";
import { TProduct } from "@/types";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

type TCartCardProps = {
  item: { product: TProduct; quantity: number };
  onCartQuantityUpdate: (productId: string, quantity: number) => void;
  onCartRemove: (id: string) => void;
};

const CartDesktopCard = ({
  item,
  onCartQuantityUpdate,
  onCartRemove,
}: TCartCardProps) => {
  return (
    <div className="flex justify-between items-center gap-3">
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 hover:text-red-600"
          onClick={() => onCartRemove(item.product._id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>

        <Image
          src={item.product.image || "/placeholder.svg"}
          alt={item.product.name.slice(0, 6)}
          width={100}
          height={100}
          className="rounded-lg object-cover"
        />
      </div>

      <div className="flex justify-between gap-2">
        <h3 className=" lg:text-lg line-clamp-2">{item.product.name}</h3>
      </div>

      <div className="flex items-center">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() =>
            onCartQuantityUpdate(item.product._id, item.quantity - 1)
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
            onCartQuantityUpdate(item.product._id, item.quantity + 1)
          }
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <p className="min-w-[74px]">
        ৳ {(item.product.price * item.quantity).toFixed(2)}
      </p>
    </div>
  );
};

export default CartDesktopCard;
