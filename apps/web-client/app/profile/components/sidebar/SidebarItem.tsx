import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { SidebarMenuItem } from "../typings/sidebar.types";

interface Props {
    item: SidebarMenuItem;
    collapsed: boolean;
}

export default function SidebarItem({ item, collapsed }: Props) {
    const Icon = item.icon;
    const pathname = usePathname();
    const isActive = item.href === pathname;

    const classes = clsx(
        "flex items-center gap-3 ps-6 pe-3 h-9 transition-colors duration-200 hover:text-gray-600 relative",
        isActive && "bg-yellow-50 rounded-e-full me-3"
    );

    const labelClasses = clsx(
        "whitespace-nowrap transition-all duration-300 ease-in-out",
        collapsed
            ? "opacity-0 -translate-x-2 w-0 overflow-hidden"
            : "opacity-100 translate-x-0 w-auto"
    );

    const content = item.href ? (
        <Link href={item.href} className={classes}>
            {/* vertical border */}
            {isActive && (
                <span className="absolute start-0  h-[70%] w-1 bg-yellow-400 rounded-tl-md rounded-bl-md" />
            )}
            <span className="w-5 h-5 flex items-center justify-center shrink-0">
                <Icon className="size-4.5" />
            </span>
            <span className={labelClasses}>{item.label}</span>
        </Link>
    ) : (
        <button onClick={item.onClick} className={classes}>
            {isActive && (
                <span className="absolute start-0 top-0 h-full w-1 bg-yellow-500 rounded-tr-md rounded-br-md" />
            )}
            <span className="w-5 h-5 flex items-center justify-center shrink-0">
                <Icon className="size-4.5" />
            </span>
            <span className={labelClasses}>{item.label}</span>
        </button>
    );

    return (
        <>
            {item.divider && <div className="lg:border-t border-gray-200 my-2 mx-4" />}
            <li className="relative">{content}</li>
        </>
    );
}
