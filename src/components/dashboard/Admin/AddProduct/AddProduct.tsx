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
import { useAddProductMutation } from "@/redux/api/productApi";
import { TCategory } from "@/types/category.type";
import { createSlug } from "@/utils/createSlug";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const addProductSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  image: z.custom<File>((file) => file instanceof File, {
    message: "Image is required",
  }),
  images: z.array(
    z.custom<File>((file) => file instanceof File, {
      message: "Image required",
    })
  ),
  category: z.string().min(1, "Please select a category"),
  price: z.coerce.number().min(0, "Price cannot be negative"),
  stock: z.coerce.number().min(0, "Stock cannot be negative"),
  discount: z.string(), // Expecting ObjectId as string (validated at backend)
  tags: z.array(z.string()).min(1, "At least one tag is required"),
});

export const addProductDefaultValues = {
  name: "",
  description: "", // HTML string, typically from rich text editor
  image: "",
  images: [], // Product gallery
  category: "",
  price: 0,
  stock: 0,
  discount: "", // optional ObjectId string
  tags: [],
};

const img_hosting_token = process.env.NEXT_PUBLIC_imgBB_token;
const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

const AddProduct = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // RTK Query hook
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery({});
  const [addProduct] = useAddProductMutation();

  if (isCategoriesLoading) {
    return <MyLoader />;
  }

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

  // handle add product
  const handleAddProduct = async (values: FieldValues) => {
    setIsLoading(true);

    const productData: { [key: string]: any } = {};

    const { image, images, discount, ...rest } = values;

    if (image instanceof File) {
      const uploadedURL = await handleImageUpload(image);
      if (uploadedURL) productData.image = uploadedURL;
    }

    if (images[0] instanceof File) {
      const urls = [];

      for (let i = 0; i < images.length; i++) {
        const uploadedURL = await handleImageUpload(images[i]);
        if (uploadedURL) urls.push(uploadedURL);
      }

      productData.images = urls;
    }

    const newProduct = {
      ...rest,
      ...productData,
      slug: createSlug(values.name),
      discount: discount === "n/a" ? null : discount,
    };

    // send to db
    try {
      const res = await addProduct(newProduct).unwrap();

      if (res.success) {
        toast.success(res.message);
      }

      router.push("/dashboard/admin/manage-products");
      setIsLoading(false);
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

  return (
    <div className="py-6">
      <div className="flex justify-center items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Add Product</h1>
      </div>

      {/* form */}
      <MTForm
        onSubmit={handleAddProduct}
        schema={addProductSchema}
        defaultValues={addProductDefaultValues}
      >
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-1">
              <label htmlFor="name" className="text-sm font-medium">
                Product Name <span className="text-red-500 font-medium">*</span>
              </label>

              <MTInput name="name" type="text" placeholder="" />
            </div>

            <div className="grid gap-1">
              <label htmlFor="category" className="text-sm font-medium">
                Select Category{" "}
                <span className="text-red-500 font-medium">*</span>
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
                Product Price{" "}
                <span className="text-red-500 font-medium">*</span>
              </label>

              <MTInput name="price" type="number" placeholder="" />
            </div>

            <div className="grid gap-1">
              <label htmlFor="image" className="text-sm font-medium">
                Product Image{" "}
                <span className="text-red-500 font-medium">*</span>
              </label>

              <MTImageUploader name="image" />
            </div>

            <div className="grid gap-1">
              <label htmlFor="images" className="text-sm font-medium">
                Product Gallery{" "}
                <span className="text-red-500 font-medium">*</span>
              </label>

              <MTMultiImageUploader name="images" />
            </div>

            <div className="grid gap-1">
              <label htmlFor="stock" className="text-sm font-medium">
                Product Stock Quantity{" "}
                <span className="text-red-500 font-medium">*</span>
              </label>

              <MTInput name="stock" type="number" placeholder="" />
            </div>

            <div className="grid gap-1">
              <label htmlFor="discount" className="text-sm font-medium">
                Select Discount{" "}
                <span className="text-red-500 font-medium">*</span>
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
                Product Description{" "}
                <span className="text-red-500 font-medium">*</span>
              </label>

              <MTTextEditor name="description" className="" />
            </div>

            <div className="grid gap-1">
              <label htmlFor="tags" className="text-sm font-medium">
                Product Tags <span className="text-red-500 font-medium">*</span>
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
                  <LoaderSpinner /> <span>Uploading...</span>
                </span>
              ) : (
                "Add Product"
              )}
            </Button>
          </div>
        </div>
      </MTForm>
    </div>
  );
};

export default AddProduct;
