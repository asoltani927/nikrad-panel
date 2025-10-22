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
    url: "#",
    icon: Home,
  },
  {
    title: "محصولات",
    url: "#",
    icon: Inbox,
    children: [
      { title: "Messages", url: "#", icon: Mail },
      { title: "Archive", url: "#", icon: Archive },
      { title: "Sent", url: "#", icon: Send },
    ],
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
    children: [
      { title: "Events", url: "#", icon: Clock },
      { title: "Reminders", url: "#", icon: Bell },
    ],
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    children: [
      { title: "Account", url: "#", icon: User },
      { title: "Security", url: "#", icon: Shield },
      { title: "Notifications", url: "#", icon: Bell },
    ],
  },
];
