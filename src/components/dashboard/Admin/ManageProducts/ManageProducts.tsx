"use client";

import { MyLoader } from "@/components/shared/Ui/MyLoader";
import { Button } from "@/components/ui/button";
import { useGetProductsQuery } from "@/redux/api/productApi";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TProduct } from "@/types";
import ProductDetailsModal from "./ProductDetailsModal";

const ManageProducts = () => {
  // RTK Query hook
  const { data: productsData, isLoading: isProductsLoading } =
    useGetProductsQuery({});

  if (isProductsLoading) {
    return <MyLoader />;
  }

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Manage Products</h1>
          <p className="font-medium text-sm">
            Total: <span className="">{productsData.data.totalCount}</span>{" "}
            products
          </p>
        </div>

        <Link href={`/dashboard/admin/add-product`}>
          <Button className="cursor-pointer h-11">Add New Product</Button>
        </Link>
      </div>

      {/* table */}
      <div className="shadow-cardLightShadow rounded-xl">
        <Table className="w-full ">
          <TableHeader className="">
            <TableRow className="bg-primary text-white text-base py-3">
              <TableHead className="w-[80px] py-3">Image</TableHead>
              <TableHead className="max-w-[250px] py-3">Product Name</TableHead>
              <TableHead className="py-3">Category</TableHead>
              <TableHead className="py-3">Price</TableHead>
              <TableHead className="py-3">Stock</TableHead>
              <TableHead className="text-right py-3">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productsData.data.data.map((product: TProduct) => (
              <TableRow key={product._id} className="">
                <TableCell>
                  <div className="h-12 w-12 relative overflow-hidden rounded-md">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium max-w-[250px] truncate">
                  {product.name}
                </TableCell>
                <TableCell>
                  <Badge className="capitalize text-white">
                    {product.category.replace(/_/g, " ")}
                  </Badge>
                </TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge
                    variant={product.stock > 10 ? "default" : "destructive"}
                    className="font-medium text-white"
                  >
                    {product.stock}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <ProductDetailsModal product={product} />
                    <Button variant="outline" size="icon">
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageProducts;
