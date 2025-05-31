"use client";

import Products from "@/components/common/Products/Products";
import Container from "@/components/shared/Ui/Container";
import { useSearchParams } from "next/navigation";

const ProductsPage = () => {
  const params = useSearchParams();
  const category = params.get("category") || undefined;
  const searchTerm = params.get("searchTerm") || undefined;

  return (
    <Container>
      <Products categoryParam={category} searchTermParam={searchTerm} />
    </Container>
  );
};

export default ProductsPage;
