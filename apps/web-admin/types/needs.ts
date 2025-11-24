import { User } from "./user";
import { Category } from "./categories";
import { Region } from "./region";

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
