import { useGetProductsQuery } from "@/redux/api/productApi";
import { TProduct } from "@/types";
import BestSellerCard from "./BestSellerCard";
import { BestSellerCardSkeleton } from "./BestSellerCardSkeleton";

const BestSellers = () => {
  const { data: products, isLoading: isProductLoading } = useGetProductsQuery(
    {}
  );

  return (
    <div className="rounded-md overflow-hidden shadow-cardLightShadow">
      <div className="bg-primary text-white py-2 px-4 font-medium">
        Best Selling Products
      </div>
      <div>
        {isProductLoading ? (
          <div className="divide-y divide-gray-200">
            {[...Array(5)].map((_, index) => (
              <BestSellerCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {products.data.data.slice(0, 5).map((product: TProduct) => (
              <BestSellerCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BestSellers;
