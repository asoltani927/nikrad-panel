import { LucideIcon } from "lucide-react";

export interface SidebarMenuItem {
    id: string;
    label: string;
    icon: LucideIcon;
    href?: string;
    onClick?: () => void;
    divider?: boolean;
}

export interface SidebarProps {
    collapsed: boolean;
    items: SidebarMenuItem[];
}
