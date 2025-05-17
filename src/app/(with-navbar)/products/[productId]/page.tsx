"use client";

import ProductDetails from "@/components/common/ProductDetails/ProductDetails";
import Container from "@/components/shared/Ui/Container";
import { useParams } from "next/navigation";

const ProductDetailsPage = () => {
  const params = useParams();
  const productId = params.productId as string;
  return (
    <Container>
      <ProductDetails productId={productId} />
    </Container>
  );
};

export default ProductDetailsPage;
