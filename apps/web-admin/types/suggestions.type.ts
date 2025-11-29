export interface Suggestion {
  id: number;
  price: string;

  need: {
    id: number;
    title: string;
    status: string;
    user: string | null;
  };

  createdBy: {
    id: number;
    name: string;
    phone: string | null;
  };

  createdAt: string;
  updatedAt: string;
  status: string;
}
