export interface Category {
  id: number;
  name: string;
  slug: string;
  names: {
    en: string;
    fa: string;
  };
  parentId: number | null;
  parent?: {
    id: number;
    name: string;
  } | null;
  children?: Category[];
  createdAt: string;
  updatedAt: string;
}
