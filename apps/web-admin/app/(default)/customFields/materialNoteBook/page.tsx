"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldsTable } from "./components/FieldsTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useFields } from "../hooks/useFields";
import { showToast } from "nextjs-toast-notify";
import { useCreateFields } from "../hooks/useCreateFields";
import { FieldDialog } from "./components/CreateFieldModal";
import { EditCustomFieldModal } from "./components/EditFieldModal";
import { useUpdateFields } from "../hooks/useUpdateFields";
import { useDeleteFields } from "../hooks/useDeleteFields";
import { Field } from "@/types";

export default function CustomFieldsMaterialNoteBook() {
  type FieldItem = Field["data"][number];

  const [modalOpen, setModalOpen] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [selectedField, setSelectedField] = useState<FieldItem | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { fields, loading, error, fieldsRefetch } = useFields();
  const {
    loading: createFieldLoading,
    error: createFieldError,
    createField,
  } = useCreateFields();
  const {
    updateField,
    loading: updateFieldLoading,
    error: updateFieldError,
  } = useUpdateFields();
  const { removeField, loading: deleteLoading } = useDeleteFields();

  const handleAddField = async (data: any) => {
    try {
      const payload = { ...data, categoryId: data.categoryId ?? 0 };
      await createField(payload);

      showToast.success("فیلد با موفقیت ایجاد شد!", {
        duration: 3000,
        position: "top-left",
      });
      setModalOpen(false);
      fieldsRefetch();
    } catch (err) {
      showToast.error("افزودن فیلد با خطا مواجه شد", {
        duration: 3000,
        position: "top-left",
      });
    }
  };

  const handleEditFieldModal = (field: FieldItem) => {
    setSelectedField(field);
    setModalEdit(true);
  };

  const handleFieldEdit = async (data: any) => {
    if (!selectedField) {
      showToast.error("فیلد معتبر برای ویرایش پیدا نشد!");
      return;
    }
    try {
      const payload = {
        ...data,
        id: selectedField.id,
        categoryId: data.categoryId ?? 0,
      };

      await updateField(payload);

      showToast.success("فیلد با موفقیت بروزرسانی شد!", {
        duration: 3000,
        position: "top-left",
      });

      setModalEdit(false);
      fieldsRefetch();
    } catch (err) {
      showToast.error("بروزرسانی فیلد با خطا مواجه شد", {
        duration: 3000,
        position: "top-left",
      });
    }
  };

  const handleDeleteField = async (field: FieldItem) => {
    try {
      await removeField(field?.id);

      showToast.success("فیلد با موفقیت حذف شد!", {
        duration: 3000,
        position: "top-left",
      });
      fieldsRefetch();
    } catch (err) {
      showToast.error("افزودن فیلد با خطا مواجه شد", {
        duration: 3000,
        position: "top-left",
      });
    }
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>لیست فیلدها</CardTitle>
          <Button variant="outline" onClick={() => setModalOpen(true)}>
            <span>افزودن</span>
            <Plus />
          </Button>
        </CardHeader>

        <CardContent>
          {loading && <p>در حال بارگذاری...</p>}
          {error && <p className="text-red-600">{error}</p>}
          {!loading && !error && (
            <FieldsTable
              data={fields}
              page={page}
              limit={limit}
              total={fields.length}
              setPage={setPage}
              onEdit={handleEditFieldModal}
              onDelete={handleDeleteField}
            />
          )}
        </CardContent>
      </Card>

      <FieldDialog
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSubmit={handleAddField}
        loading={createFieldLoading}
      />

      <EditCustomFieldModal
        open={modalEdit}
        onOpenChange={setModalEdit}
        fieldData={
          selectedField
            ? { ...selectedField, categoryId: selectedField.categoryId ?? 0 }
            : null
        }
        loading={updateFieldLoading}
        onSubmit={handleFieldEdit}
      />
    </div>
  );
}
