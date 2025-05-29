"use client";

import SingleProductEdit from "@/components/dashboard/Admin/ManageProducts/SingleProductEdit";
import { useParams } from "next/navigation";

const SingleProductEditPage = () => {
  const params = useParams();
  const productSlug = params.productSlug as string;

  return (
    <div className="w-full py-10">
      <SingleProductEdit productSlug={productSlug} />
    </div>
  );
};

export default SingleProductEditPage;
