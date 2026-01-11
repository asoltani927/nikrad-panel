import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Notebook,
    ListCheck,
    Lightbulb,
    CreditCard,
    BellDot,
} from "lucide-react";
import { SidebarMenuItem } from "../typings/sidebar.types";

export const sellerSidebarMenu: SidebarMenuItem[] = [
    {
        id: "dashboard",
        label: "خانه",
        icon: LayoutDashboard,
        href: "/profile/seller",
    },
    {
        id: "products",
        label: "محصولات",
        icon: Package,
        href: "/profile/seller/products",
    },
    {
        id: "shops",
        label: "فروشگاه‌ها",
        icon: ShoppingCart,
        href: "/profile/seller/shops",
    },
    {
        id: "offers",
        label: "پیشنهادها",
        icon: Lightbulb,
        href: "/profile/seller/offers",
    },
    {
        id: "needs",
        label: "نیازمندی‌ها",
        icon: ListCheck,
        href: "/profile/seller/needs",
    },
    {
        id: "materialBook",
        label: "دفترچه متریال",
        icon: Notebook,
        href: "/profile/seller/materialBook",
        divider: true,
    },
    {
        id: "transactions",
        label: "لیست تراکنش‌ها",
        icon: CreditCard,
        href: "/profile/seller/transactions",
    },
    {
        id: "notifications",
        label: "اعلانات",
        icon: BellDot,
        divider: true,
        href: "/profile/seller/notifications",
    },
];
