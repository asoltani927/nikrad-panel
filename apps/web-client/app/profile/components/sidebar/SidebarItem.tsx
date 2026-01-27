
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
} from "@/components/ui/collapsible";
import { SidebarMenuItem } from "../typings/sidebar.types";

interface Props {
    item: SidebarMenuItem;
    collapsed: boolean;
    openItemId: string | null;
    setOpenItemId: (id: string | null) => void;
}

export default function SidebarItem({ item, collapsed, openItemId, setOpenItemId }: Props) {
    const Icon = item.icon;
    const pathname = usePathname();
    const isOpen = openItemId === item.id;

    const labelClasses = clsx(
        "whitespace-nowrap transition-all duration-300 ease-in-out",
        collapsed ? "opacity-0 -translate-x-2 w-0 overflow-hidden" : "opacity-100 translate-x-0 w-auto"
    );

    if (!item.children) {
        const isActive = item.href === pathname;
        const classes = clsx(
            "flex items-center gap-3 ps-6 pe-3 h-9 transition-colors duration-200 hover:text-gray-600 relative",
            isActive && "bg-yellow-50 rounded-e-full me-3"
        );

        return (
            <>
                {item.divider && <div className="lg:border-t border-gray-200 my-2 mx-4" />}
                <li className="relative">
                    {item.href ? (
                        <Link
                            href={item.href}
                            className={classes}
                            onClick={() => setOpenItemId(null)}
                        >
                            {isActive && <span className="absolute start-0 h-[70%] w-1 bg-yellow-400 rounded-tl-md rounded-bl-md" />}
                            <span className="w-5 h-5 flex items-center justify-center shrink-0">
                                <Icon className="size-4.5" />
                            </span>
                            <span className={labelClasses}>{item.label}</span>
                        </Link>
                    ) : (
                        <button onClick={item.onClick} className={classes}>
                            <span className="w-5 h-5 flex items-center justify-center shrink-0">
                                <Icon className="size-4.5" />
                            </span>
                            <span className={labelClasses}>{item.label}</span>
                        </button>
                    )}
                </li>
            </>
        );
    }

    const parentClasses = clsx(
        "flex items-center gap-3 ps-6 pe-3 h-9 transition-colors duration-200 hover:text-gray-600 relative cursor-pointer"
    );

    return (
        <>
            {item.divider && <div className="lg:border-t border-gray-200 my-2 mx-4" />}
            <li className="relative">
                <Collapsible open={isOpen} onOpenChange={(open) => setOpenItemId(open ? item.id : null)}>
                    <CollapsibleTrigger asChild>
                        <div className={parentClasses}>
                            <span className="w-5 h-5 flex items-center justify-center shrink-0">
                                <Icon className="size-4.5" />
                            </span>
                            <span className={labelClasses}>{item.label}</span>
                            {!collapsed && (
                                <ChevronLeft
                                    className={clsx(
                                        "ms-auto size-4 transition-transform duration-200",
                                        isOpen ? "-rotate-90" : "rotate-0"
                                    )}
                                />
                            )}
                        </div>
                    </CollapsibleTrigger>

                    {!collapsed && (
                        <CollapsibleContent>
                            <ul className="mt-1 space-y-1">
                                {item.children.map((child) => {
                                    const childActive = child.href === pathname;
                                    return (
                                        <li key={child.id}>
                                            <Link
                                                href={child.href}
                                                className={clsx(
                                                    "flex items-center h-8 leading-8 text-gray-600 hover:text-gray-800 transition relative gap-3 ps-6 pe-3",
                                                    childActive && "bg-yellow-50 rounded-e-full me-3"
                                                )}
                                            >
                                                {childActive && <span className="absolute start-0 h-[70%] w-1 bg-yellow-400 rounded-tl-md rounded-bl-md" />}
                                                <span className="flex items-center justify-center w-5 h-5 shrink-0" />
                                                <span className="whitespace-nowrap">{child.label}</span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </CollapsibleContent>
                    )}
                </Collapsible>
            </li>
        </>
    );
}
