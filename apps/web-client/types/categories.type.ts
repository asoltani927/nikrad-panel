export interface Category {
  id: string;
  name: string;
  slug: string;
  names: {
    en: string;
    fa: string;
  };
  parentId: number | null;
  parent?: {
    id: string;
    name: string;
  } | null;
  children?: Category[];
  createdAt: string;
  updatedAt: string;
}
