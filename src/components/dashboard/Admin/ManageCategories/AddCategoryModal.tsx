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

  const handleAddCategory = async (values: FieldValues) => {
    console.log(values);

    const newCategory = {
      title: values.title,
      subCategoryOf:
        values.subCategoryOf === "n/a" ? null : values.subCategoryOf,
    };
    // Handle form submission logic here
    try {
      const res = await addCategory(newCategory).unwrap();
      console.log(res);

      if (res.success) {
        toast.success(res.message);
      }

      setIsOpenModal(false);
    } catch (error: any) {
      toast.error(
        error?.data?.errorSources[0].message || "Something went wrong!"
      );
    }
  };

  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer h-11">
          <Plus className="mr-2 h-4 w-4" /> Add Category
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
                  {/* {isLoading ? (
                    <span className="flex gap-2">
                      <LoaderSpinner /> <span>Signing...</span>
                    </span>
                  ) : (
                    "Sign In"
                  )} */}
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
