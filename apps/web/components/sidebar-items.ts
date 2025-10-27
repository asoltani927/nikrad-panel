// src/components/Sidebar/sidebar-items.ts
import {
  Home,
  Inbox,
  Calendar,
  Search,
  Settings,
  Mail,
  Archive,
  Send,
  Bell,
  Shield,
  User,
  Clock,
  Pencil,
  SquarePen,
  ShoppingCart,
  ChartColumn,
  ChartColumnStacked,
  ListCheck,
  ClipboardList,
  NotebookTabs,
  FileCog,
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
  {
    title: "محصولات",
    url: "#",
    icon: ShoppingCart,
    children: [
      { title: "ایجاد محصول", url: "#", icon: Pencil },
      { title: "ویرایش محصول", url: "#", icon: SquarePen },
    ],
  },
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
    url: "#",
    icon: ClipboardList,
  },
  {
    title: "لیست دفترچه متریال",
    url: "#",
    icon: NotebookTabs,
  },
  {
    title: "تنظیمات",
    url: "#",
    icon: Settings,
    children: [
      { title: "فیلد ها", url: "#", icon: FileCog },
    ],
  },
];
