// src/components/Sidebar/sidebar-items.ts
import {
  Home,
  Settings,
  ChartColumnStacked,
  ListCheck,
  ClipboardList,
  NotebookTabs,
  FileCog,
  ScrollText,
  BadgeDollarSign,
} from "lucide-react";

export interface SidebarChild {
  title: string;
  url: string;
  icon: React.ElementType;
}

export interface SidebarItem {
  title: string;
  url: string;
  icon: React.ElementType;
  children?: SidebarChild[];
}

export const sidebarItems: SidebarItem[] = [
  {
    title: "پیشخوان",
    url: "/",
    icon: Home,
  },
  // {
  //   title: "محصولات",
  //   url: "#",
  //   icon: ShoppingCart,
  //   children: [
  //     { title: "ایجاد محصول", url: "#", icon: Pencil },
  //     { title: "ویرایش محصول", url: "#", icon: SquarePen },
  //   ],
  // },
  // {
  //   title: "دسته بندی ها",
  //   url: "#",
  //   icon: ChartColumnStacked,
  //   children: [
  //     { title: "ایجاد دسته بندی", url: "#", icon: Pencil },
  //     { title: "ویرایش دسته بندی", url: "#", icon: SquarePen },
  //   ],
  // },
  {
    title: "لیست دسته بندی ها",
    url: "#",
    icon: ChartColumnStacked,
  },
  {
    title: "لیست نیازمندی ها",
    url: "#",
    icon: ListCheck,
  },
  {
    title: "لیست پیشنهادات",
    url: "/suggesstions",
    icon: ClipboardList,
  },
  {
    title: "لیست دفترچه متریال",
    url: "#",
    icon: NotebookTabs,
  },
  {
    title: "لیست درخواست دفترچه متریال",
    url: "/materialNoteBook",
    icon: ScrollText,
  },
  {
    title: "لیست تراکنش ها",
    url: "/transactions",
    icon: BadgeDollarSign,
  },
  {
    title: "تنظیمات",
    url: "#",
    icon: Settings,
    children: [{ title: "فیلد ها", url: "#", icon: FileCog }],
  },
];
