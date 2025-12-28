import { User } from "./user.type";
import { Category } from "./categories.type";
import { Region } from "./region.type";

export interface Need {
  id: number;
  title: string;
  category: Category;
  product: number;
  region: Region;
  city: string;
  priority: number;
  deliveryDate: string;
  createdBy: User;
  status: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
}
