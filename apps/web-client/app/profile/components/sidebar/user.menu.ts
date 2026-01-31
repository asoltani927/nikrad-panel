import {
    Home,
    Lightbulb,
    ShoppingCart,
    Notebook,
    BellDot,
    Star,
    CreditCard,
    ListCheck,
    Settings,
} from "lucide-react";
import { SidebarMenuItem } from "../typings/sidebar.types";

export const userSidebarMenu: SidebarMenuItem[] = [
    {
        id: "home",
        label: "خانه",
        icon: Home,
        href: "/profile",
    },

    {
        id: "offers",
        label: "پیشنهادها",
        icon: Lightbulb,
        children: [
            {
                id: "my-offers",
                label: "پیشنهادهای من",
                href: "/profile/offers",
            },
            {
                id: "received-offers",
                label: "پیشنهادهای دریافتی",
                href: "/profile/offers/received",
            },
        ],
    },
    {
        id: "inquiries",
        label: "نیازمندی‌ها",
        icon: ListCheck,
        href: "/profile/inquiries",
    },
    {
        id: "orders",
        label: "سفارش‌ها",
        icon: ShoppingCart,
        href: "/profile/orders",
    },
    {
        id: "favorites",
        label: "علاقه‌مندی‌ها",
        icon: Star,
        href: "/profile/favorites",
    },
    {
        id: "materials",
        label: "دفترچه متریال",
        icon: Notebook,
        href: "/profile/material-book",
    },
    {
        id: "transactions",
        label: "لیست تراکنش‌ها",
        icon: CreditCard,
        href: "/profile/transactions",
    },
    {
        id: "notifications",
        label: "اعلانات",
        icon: BellDot,
        divider: true,
        href: "/profile/notifications",
    },
    // {
    //     id: "settings",
    //     label: "تنظیمات",
    //     icon: Settings,
    //     divider: true,
    //     href: "/profile/notifications",
    // },
];
