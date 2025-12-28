import { PaginatedResponse } from "./pagination.type";

export type FieldType = {
  id: number;
  cuid: string;
  name: string;
  title: string;
  type:
    | "TEXT"
    | "NUMBER"
    | "CHECKBOX"
    | "DATE"
    | "RADIO"
    | "SELECT"
    | "TEXTAREA"
    | "FILE";
  required: boolean;
  order: number;
  step: number;
  categoryId: number | null;
  target: "MATERIAL_BOOK" | "OTHER_TARGET";
  createdAt: string;
  updatedAt: string;
};

export type Field = PaginatedResponse<FieldType>;
