import MTForm from "@/components/shared/Forms/MTForm";
import MTInput from "@/components/shared/Forms/MTInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUpdateCategoryMutation } from "@/redux/api/categoryApi";
import { TCategory } from "@/types/category.type";
import { createSlug } from "@/utils/createSlug";
import { Edit } from "lucide-react";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const updateCategorySchema = z.object({
  title: z.string().min(2, "Enter category name"),
});

const EditCategoryModal = ({ category }: { category: TCategory }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  // rtk api
  const [updateCategory] = useUpdateCategoryMutation();

  const handleUpdateCategory = async (values: FieldValues) => {
    const payload = {
      categoryId: category._id,
      updatedData: {
        title: values.title,
        slug: createSlug(values.title),
      },
    };

    // Handle form submission logic here
    try {
      const res = await updateCategory(payload).unwrap();

      if (res.success) {
        toast.success(res.message);
      }

      setIsOpenModal(false);
    } catch (error: any) {
      console.log("error", error);

      toast.error(
        error?.data?.errorSources[0].message || "Something went wrong!"
      );
    }
  };

  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 cursor-pointer"
          //   onClick={(e) => e.stopPropagation()}
        >
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <MTForm
            onSubmit={handleUpdateCategory}
            schema={updateCategorySchema}
            defaultValues={{
              title: category.title || "",
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
              </div>

              <div className="mt-2 w-full flex justify-end">
                <Button className="h-11 cursor-pointer w-full" type="submit">
                  Edit
                </Button>
              </div>
            </div>
          </MTForm>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryModal;
