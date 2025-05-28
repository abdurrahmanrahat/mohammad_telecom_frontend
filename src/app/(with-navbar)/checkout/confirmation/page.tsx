"use client";

import OrderConfirmation from "@/components/common/Confirmation/OrderConfirmation";
import Container from "@/components/shared/Ui/Container";
import { useSearchParams } from "next/navigation";

const ConfirmationPage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") as string;

  console.log(orderId);

  return (
    <Container>
      <OrderConfirmation orderId={orderId} />
    </Container>
  );
};

export default ConfirmationPage;
