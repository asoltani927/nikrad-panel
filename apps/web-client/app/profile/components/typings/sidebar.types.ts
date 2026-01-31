import { LucideIcon } from "lucide-react";

export interface SidebarMenuItem {
    id: string;
    label: string;
    icon: LucideIcon;
    href?: string;
    onClick?: () => void;
    divider?: boolean;
    
      children?: {
    id: string;
    label: string;
    href: string;
  }[];
}

export interface SidebarProps {
    collapsed: boolean;
    items: SidebarMenuItem[];
}
