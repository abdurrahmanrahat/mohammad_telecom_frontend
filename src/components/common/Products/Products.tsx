"use client";

import { MyLoader } from "@/components/shared/Ui/MyLoader";
import { useGetProductsQuery } from "@/redux/api/productApi";
import { TProduct } from "@/types";
import { ProductCard } from "./ProductCard";

const Products = () => {
  // RTK Query hook
  const { data: productsData, isLoading: isProductsLoading } =
    useGetProductsQuery({});

  if (isProductsLoading) {
    return <MyLoader />;
  }

  return (
    <div className="py-16">
      {/* title something */}
      <div></div>

      {productsData.data.data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {productsData.data.data.map((product: TProduct) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center py-24">
          <h4 className="text-xl md:text-2xl font-medium">No Product Found!</h4>
        </div>
      )}
    </div>
  );
};

export default Products;
