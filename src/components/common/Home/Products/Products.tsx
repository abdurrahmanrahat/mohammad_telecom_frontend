"use client";

import Container from "@/components/shared/Ui/Container";
import SectionTitle from "@/components/shared/Ui/SectionTitle";
import { useGetProductsQuery } from "@/redux/api/productApi";
import { TProduct } from "@/types";
import { ProductCard } from "../../Products/ProductCard";
import ProductCardSkeleton from "../../Products/ProductCardSkeleton";

const Products = () => {
  // RTK Query hook
  const { data: productsData, isLoading: isProductsLoading } =
    useGetProductsQuery({});

  return (
    <Container className="py-16">
      <div className="flex items-center mb-6">
        <SectionTitle text="Popular Products" />
      </div>

      <div>
        {isProductsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div>
            {productsData.data.data.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {productsData.data.data.slice(0, 4).map((product: TProduct) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center py-10">
                <h4 className="text-xl md:text-2xl font-medium">
                  No Product Found!
                </h4>
              </div>
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Products;
