import ProductGallery from "@/components/common/ProductDetails/ProductGallery";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TProduct } from "@/types";
import { Info } from "lucide-react";
import { useState } from "react";

const ProductDetailsModal = ({ product }: { product: TProduct }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogTrigger asChild>
        <button className="cursor-pointer">
          <Info className="h-5 w-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="w-full !max-w-[880px] max-h-[80%] overflow-auto bg-white">
        <div>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {product.name}
            </DialogTitle>
            <DialogDescription>
              <Badge className="capitalize text-white">
                {product.category.replace(/_/g, " ")}
              </Badge>
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-4">
              {/* <div className="aspect-square relative rounded-lg overflow-hidden border">
                <Image
                  src={product.image || "/placeholder.svg?height=400&width=400"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.images.slice(0, 3).map((img, idx) => (
                  <div
                    key={idx}
                    className="aspect-square relative rounded-md overflow-hidden border"
                  >
                    <Image
                      src={img || "/placeholder.svg?height=100&width=100"}
                      alt={`${product.name} ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div> */}
              <ProductGallery singleProduct={product} />
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">
                  Category
                </h3>
                <p className="capitalize">
                  {product.category.replace(/_/g, " ")}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">
                  Price
                </h3>
                <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">
                  Stock
                </h3>
                <p>{product.stock} units</p>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {product.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="capitalize text-white"
                    >
                      {tag.replace(/_/g, " ")}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-xl text-muted-foreground">
                  Description
                </h3>
                <div
                  className="prose prose-sm max-w-none mt-4"
                  dangerouslySetInnerHTML={{
                    __html: product.description,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsModal;
