import MTForm from "@/components/shared/Forms/MTForm";
import MTInput from "@/components/shared/Forms/MTInput";
import MTSelect from "@/components/shared/Forms/MTSelect";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAddCategoryMutation } from "@/redux/api/categoryApi";
import { TCategory } from "@/types/category.type";
import { createSlug } from "@/utils/createSlug";
import { Plus } from "lucide-react";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const addCategorySchema = z.object({
  title: z.string().min(2, "Enter category name"),
  subCategoryOf: z.string().min(1, "Please select a parent category"),
});

const AddCategoryModal = ({ categories }: { categories: TCategory[] }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  // rtk api
  const [addCategory] = useAddCategoryMutation();

  // parent categories list here
  const parentCategories = categories.map((category: TCategory) => {
    return {
      label: category.title,
      value: category._id,
    };
  });

  const parentCategoriesList = [
    { label: "N/A", value: "n/a" },
    ...parentCategories,
  ];

  // all categories list here for validation
  const allCategoriesList: { title: string; slug: string }[] =
    categories?.flatMap((parentCategory: TCategory) => {
      const parentItem = {
        title: parentCategory.title,
        slug: parentCategory.slug,
      };

      const subItems = Array.isArray(parentCategory.subCategories)
        ? parentCategory.subCategories.map((sub) => ({
            title: sub.title,
            slug: sub.slug,
          }))
        : [];

      return [parentItem, ...subItems];
    }) || [];

  const handleAddCategory = async (values: FieldValues) => {
    const newCategorySlug = createSlug(values.title);

    const isAvailable = allCategoriesList.map(
      (item) => item.slug === newCategorySlug
    );
    if (isAvailable) {
      toast.warning("Category had already been added!");
      setIsOpenModal(false);
      return;
    }

    const newCategory = {
      title: values.title,
      slug: newCategorySlug,
      subCategoryOf:
        values.subCategoryOf === "n/a" ? null : values.subCategoryOf,
    };
    // Handle form submission logic here
    try {
      const res = await addCategory(newCategory).unwrap();
      console.log("res", res);

      if (res.success) {
        toast.success(res.message);
      }

      setIsOpenModal(false);
    } catch (error: any) {
      toast.error(
        error?.data?.errorSources[0].message || "Something went wrong!"
      );
      setIsOpenModal(false);
    }
  };

  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer h-11">
          <Plus className="mr-1 h-4 w-4" /> Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <MTForm
            onSubmit={handleAddCategory}
            schema={addCategorySchema}
            defaultValues={{
              title: "",
              subCategoryOf: "",
            }}
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <div className="grid gap-1">
                  <label htmlFor="title" className="text-sm font-medium">
                    Category Name
                  </label>

                  <MTInput name="title" type="text" placeholder="" />
                </div>

                <div className="grid gap-1">
                  <label
                    htmlFor="subCategoryOf"
                    className="text-sm font-medium"
                  >
                    Select Parent Category
                  </label>

                  <MTSelect
                    name="subCategoryOf"
                    options={parentCategoriesList}
                    placeholder=""
                    className=""
                  />
                </div>
              </div>

              <div className="mt-2 w-full flex justify-end">
                <Button className="h-11 cursor-pointer w-full" type="submit">
                  Add Category
                </Button>
              </div>
            </div>
          </MTForm>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
