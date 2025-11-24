"use client";

import { useState } from "react";
import { showToast } from "nextjs-toast-notify";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { CreateCategoryModal } from "./components/CreateCategoryModal";
import { useCategories } from "./hooks/useCategories";
import { CategoriesTable } from "./components/CategoriesTable";
import { Category } from "@/types";
import { EditCategoryModal } from "./components/EditCategoryModal";
import { useCreateCategory } from "./hooks/useCreateCategory";
import { useDeleteCategory } from "./hooks/useDeleteCategory";
import { useEditCategory } from "./hooks/useEditCategory";

export default function Categories() {
  // states
  const [openDialog, setOpenDialog] = useState(false);
  const [openCreateCategoryModal, setOpenCreateCategoryModal] = useState(false);
  const [filters, setFilters] = useState({ name: "", status: "" });
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [openEdit, setOpenEdit] = useState(false);
  // finish states

  // hooks
  const { categories, loading, error, categoriesRefetch } = useCategories();

  const {
    createCategory,
    loading: creating,
    error: createError,
  } = useCreateCategory();

  const {
    removeCategory,
    loading: removeCategoryLoading,
    error: removeCategoryError,
  } = useDeleteCategory();

  const { updateCategory, loading: editCategoryLoading } = useEditCategory();

  // finish hooks

  // actions
  const onConfirmClick = () => {
    setOpenDialog(false);
    showToast.success("تغییر وضعیت با موفقیت اعمال شد", {
      duration: 3000,
      position: "top-left",
    });
  };

  const handleOpenEditModalClick = (cat: Category) => {
    setSelectedCategory(cat);
    setOpenEdit(true);
  };

  const handleCreateCategory = async (values: any) => {
    try {
      const payload = {
        ...values,
        names: {
          fa: values.name,
          en: values.slug,
        },
      };
      await createCategory(payload, () => {
        showToast.success("دسته‌بندی با موفقیت ایجاد شد!", {
          duration: 3000,
          position: "top-left",
        });
        setOpenCreateCategoryModal(false);
        categoriesRefetch();
      });
    } catch (err) {
      showToast.error("ایجاد دسته‌بندی با خطا مواجه شد", {
        duration: 3000,
        position: "top-left",
      });
    }
  };

  const handleEditCategory = async (values: any) => {
    try {
      await updateCategory(values, () => {
        showToast.success("دسته‌بندی با موفقیت ویرایش شد!", {
          duration: 3000,
          position: "top-left",
        });
        categoriesRefetch();
      });
    } catch (err) {
      showToast.error("ویرایش دسته‌بندی با خطا مواجه شد", {
        duration: 3000,
        position: "top-left",
      });
    }
  };

  const handleRemoveCategory = async (cat: number) => {
    try {
      await removeCategory(cat, () => {
        showToast.success("دسته‌بندی با موفقیت حذف شد!", {
          duration: 3000,
          position: "top-left",
        });
        categoriesRefetch();
      });
    } catch (err) {
      console.error("خطا در حذف دسته‌بندی:", err);
      showToast.error("حذف دسته‌بندی با خطا مواجه شد", {
        duration: 3000,
        position: "top-left",
      });
    }
  };

  // finish actions

  // filters
  const filtered = categories?.filter((c: any) =>
    c.name.includes(filters.name)
  );
  // finish filters

  if (loading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            لیست دسته‌بندی‌ها
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
            <Input
              placeholder="عنوان"
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            />
            <CreateCategoryModal
              categories={filtered || []}
              onSubmit={handleCreateCategory}
              loading={creating}
              open={openCreateCategoryModal}
              onOpenChange={setOpenCreateCategoryModal}
            />
          </div>

          <CategoriesTable
            data={filtered || []}
            onEdit={(cat) => handleOpenEditModalClick(cat)}
            onDelete={(cat) => handleRemoveCategory(cat)}
            loading={removeCategoryLoading}
          />
        </CardContent>
      </Card>

      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>آیا مطمئن هستید؟</AlertDialogTitle>
            <AlertDialogDescription>
              پس از تأیید، وضعیت تغییر خواهد کرد.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>انصراف</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirmClick}>
              تأیید
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {selectedCategory && (
        <EditCategoryModal
          open={openEdit}
          setOpen={setOpenEdit}
          category={selectedCategory!}
          categories={filtered || []}
          onSubmit={handleEditCategory}
        />
      )}
    </div>
  );
}
