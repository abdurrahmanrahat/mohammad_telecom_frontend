"use client";

import MTForm from "@/components/shared/Forms/MTForm";
import MTImageUploader from "@/components/shared/Forms/MTImageUploader";
import MTInput from "@/components/shared/Forms/MTInput";
import MTMultiImageUploader from "@/components/shared/Forms/MTMultiImageUploader";
import MTMultiSelectWithExtra from "@/components/shared/Forms/MTMultiSelectWithExtra";
import MTSelect from "@/components/shared/Forms/MTSelect";
import { MyLoader } from "@/components/shared/Ui/MyLoader";
import { Button } from "@/components/ui/button";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import { TCategory } from "@/types/category.type";
import { FieldValues } from "react-hook-form";
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
  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .min(0, "Price cannot be negative"),
  stock: z
    .number({ invalid_type_error: "Stock must be a number" })
    .min(0, "Stock cannot be negative"),
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

const AddProduct = () => {
  // RTK Query hook
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery({});

  if (isCategoriesLoading) {
    return <MyLoader />;
  }

  const parentCategories = categoriesData?.data?.map((category: TCategory) => {
    return {
      label: category.title,
      value: category._id,
    };
  });

  const handleAddProduct = async (values: FieldValues) => {
    console.log(values);
  };
  return (
    <div className="py-6">
      <div className="flex justify-center items-center">
        <h1 className="text-2xl font-bold">Add Product</h1>
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
                options={parentCategories}
                placeholder=""
                className=""
              />
            </div>

            <div className="grid gap-1">
              <label htmlFor="price" className="text-sm font-medium">
                Product Price{" "}
                <span className="text-red-500 font-medium">*</span>
              </label>

              <MTInput name="price" type="text" placeholder="" />
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

              <MTInput name="stock" type="text" placeholder="" />
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

          <div>
            <div className="grid gap-1">
              <label htmlFor="tags" className="text-sm font-medium">
                Product Tags <span className="text-red-500 font-medium">*</span>
              </label>

              <MTMultiSelectWithExtra
                name="tags"
                className=""
                initialTags={["hello", "hi"]}
              />
            </div>
          </div>

          <div className="mt-2 w-full flex justify-end">
            <Button className="h-11 cursor-pointer w-full" type="submit">
              Add Product
            </Button>
          </div>
        </div>
      </MTForm>
    </div>
  );
};

export default AddProduct;
