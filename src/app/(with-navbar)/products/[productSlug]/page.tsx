"use client";

import ProductDetails from "@/components/common/ProductDetails/ProductDetails";
import Container from "@/components/shared/Ui/Container";
import { useParams } from "next/navigation";

const ProductDetailsPage = () => {
  const params = useParams();
  const productSlug = params.productSlug as string;
  return (
    <Container>
      <ProductDetails productSlug={productSlug} />
    </Container>
  );
};

export default ProductDetailsPage;
