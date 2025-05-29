"use client";

import MTForm from "@/components/shared/Forms/MTForm";
import MTImageUploader from "@/components/shared/Forms/MTImageUploader";
import MTInput from "@/components/shared/Forms/MTInput";
import MTMultiImageUploader from "@/components/shared/Forms/MTMultiImageUploader";
import MTMultiSelectWithExtra from "@/components/shared/Forms/MTMultiSelectWithExtra";
import MTSelect from "@/components/shared/Forms/MTSelect";
import MTTextEditor from "@/components/shared/Forms/MTTextEditor";
import { LoaderSpinner } from "@/components/shared/Ui/LoaderSpinner";
import { MyLoader } from "@/components/shared/Ui/MyLoader";
import { Button } from "@/components/ui/button";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "@/redux/api/productApi";
import { TCategory } from "@/types";
import { createSlug } from "@/utils/createSlug";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";

const img_hosting_token = process.env.NEXT_PUBLIC_imgBB_token;
const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

const SingleProductEdit = ({ productSlug }: { productSlug: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // rtk api
  const { data: singleProduct, isLoading: isSingleProductLoading } =
    useGetSingleProductQuery(productSlug);
  const [updateProduct] = useUpdateProductMutation();
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery({});

  if (isSingleProductLoading || isCategoriesLoading) {
    return <MyLoader />;
  }

  const product = singleProduct.data;

  // categories list for dropdown
  const categoriesList =
    categoriesData?.data?.flatMap((parentCategory: TCategory) => {
      const subCategories = parentCategory.subCategories || [];

      if (subCategories.length > 0) {
        return subCategories.map((sub) => ({
          label: sub.title,
          value: sub.slug,
        }));
      } else {
        return [
          {
            label: parentCategory.title,
            value: parentCategory.slug,
          },
        ];
      }
    }) || [];

  // get slug from all categories
  const allCategorySlugs: string[] =
    categoriesData?.data?.flatMap((parentCategory: TCategory) => {
      const parentSlug = parentCategory.slug;
      const subSlugs = Array.isArray(parentCategory.subCategories)
        ? parentCategory.subCategories.map((sub) => sub.slug)
        : [];
      return [parentSlug, ...subSlugs];
    }) || [];

  // handle update product
  const handleUpdateProduct = async (values: FieldValues) => {
    setIsLoading(true);

    const updatedData: { [key: string]: any } = {};

    if (values.name) {
      updatedData.name = values.name;
      updatedData.slug = createSlug(values.name);
    }
    if (values.description) {
      updatedData.description = values.description;
    }

    if (values.image instanceof File) {
      const uploadedURL = await handleImageUpload(values.image);
      if (uploadedURL) updatedData.image = uploadedURL;
    }

    if (values.images[0] instanceof File) {
      const urls = [];

      for (let i = 0; i < values.images.length; i++) {
        const uploadedURL = await handleImageUpload(values.images[i]);
        if (uploadedURL) urls.push(uploadedURL);
      }

      updatedData.images = urls;
    }

    if (values.category) {
      updatedData.category = values.category;
    }
    if (values.price) {
      updatedData.price = values.price;
    }
    if (values.stock) {
      updatedData.stock = values.stock;
    }
    if (values.discount) {
      updatedData.discount = values.discount === "n/a" ? null : values.discount;
    }
    if (values.tags) {
      updatedData.tags = values.tags;
    }

    // send to db
    try {
      const payload = {
        productId: product._id,
        updatedData,
      };
      const res = await updateProduct(payload).unwrap();

      setIsLoading(false);

      if (res.success) {
        toast.success(res.message);
      }

      router.push("/dashboard/admin/manage-products");
    } catch (error: any) {
      toast.error(
        error?.data?.errorSources[0].message || "Something went wrong!"
      );

      setIsLoading(false);
    }
  };

  const handleImageUpload = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(img_hosting_url, {
        method: "POST",
        body: formData,
      });
      const imgRes = await res.json();

      if (imgRes.success) {
        return imgRes.data.display_url;
      } else {
        toast.error("Image upload failed");
        return null;
      }
    } catch (err) {
      console.log(err);
      toast.error("Image upload error");
      return null;
    }
  };

  const updateProductDefaultValues = {
    name: product.name || "",
    description: product.description || "",
    image: product.image || "",
    images: product.images || [], // Product gallery
    category: product.category || "",
    price: product.price || 0,
    stock: product.stock || 0,
    discount: product.discount === null ? "n/a" : "", // optional ObjectId string
    tags: product.tags || [],
  };

  return (
    <div className="py-6">
      <MTForm
        onSubmit={handleUpdateProduct}
        defaultValues={updateProductDefaultValues}
      >
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-1">
              <label htmlFor="name" className="text-sm font-medium">
                Product Name
              </label>

              <MTInput name="name" type="text" placeholder="" />
            </div>

            <div className="grid gap-1">
              <label htmlFor="category" className="text-sm font-medium">
                Select Category
              </label>

              <MTSelect
                name="category"
                options={categoriesList}
                placeholder=""
                className=""
              />
            </div>

            <div className="grid gap-1">
              <label htmlFor="price" className="text-sm font-medium">
                Product Price
              </label>

              <MTInput name="price" type="number" placeholder="" />
            </div>

            <div className="grid gap-1">
              <label htmlFor="image" className="text-sm font-medium">
                Product Image
              </label>

              <MTImageUploader name="image" />
            </div>

            <div className="grid gap-1">
              <label htmlFor="images" className="text-sm font-medium">
                Product Gallery
              </label>

              <MTMultiImageUploader name="images" />
            </div>

            <div className="grid gap-1">
              <label htmlFor="stock" className="text-sm font-medium">
                Product Stock Quantity
              </label>

              <MTInput name="stock" type="number" placeholder="" />
            </div>

            <div className="grid gap-1">
              <label htmlFor="discount" className="text-sm font-medium">
                Select Discount
              </label>

              <MTSelect
                name="discount"
                options={[
                  {
                    label: "N/A",
                    value: "n/a",
                  },
                ]}
                placeholder=""
                className=""
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="grid gap-1">
              <label htmlFor="tags" className="text-sm font-medium">
                Product Description
              </label>

              <MTTextEditor name="description" className="" />
            </div>

            <div className="grid gap-1">
              <label htmlFor="tags" className="text-sm font-medium">
                Product Tags
              </label>

              <MTMultiSelectWithExtra
                name="tags"
                className=""
                initialTags={allCategorySlugs}
              />
            </div>
          </div>

          <div className="mt-2 w-full flex justify-end">
            <Button className="h-11 cursor-pointer w-full" type="submit">
              {isLoading ? (
                <span className="flex gap-2">
                  <LoaderSpinner /> <span>Updating...</span>
                </span>
              ) : (
                "Update Product"
              )}
            </Button>
          </div>
        </div>
      </MTForm>
    </div>
  );
};

export default SingleProductEdit;
