import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Notebook,
    ListCheck,
    Lightbulb,
    CreditCard,
    BellDot,
    Store,
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
        icon: Store,
        href: "/profile/seller/shops",
    },
    {
        id: "orders",
        label: "سفارشات",
        icon: ShoppingCart,
        href: "/profile/seller/orders",
    },
    // {
    //     id: "offers",
    //     label: "پیشنهادها",
    //     icon: Lightbulb,
    //     href: "/profile/seller/offers",
    // },
    // {
    //     id: "inquiries",
    //     label: "نیازمندی‌ها",
    //     icon: ListCheck,
    //     href: "/profile/seller/inquiries",
    // },
    // {
    //     id: "materialBook",
    //     label: "دفترچه متریال",
    //     icon: Notebook,
    //     href: "/profile/seller/materialBook",
    // },
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
