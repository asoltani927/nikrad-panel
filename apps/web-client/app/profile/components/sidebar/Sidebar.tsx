import clsx from "clsx";
import { LogOut, User, CircleCheck } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { SidebarProps } from "../typings/sidebar.types";
import { useState } from "react";

export default function Sidebar({ collapsed, items }: SidebarProps) {
	const [openItemId, setOpenItemId] = useState<string | null>(null);

	const handleLogout = () => {
		console.log("logout");
	};

	return (
		<aside className={clsx("h-full flex flex-col justify-between text-sm pb-8 pt-12 transition-all duration-300")}>
			<div>
				<div className="flex items-start border-b border-gray-200 pb-3 ps-6 pe-3">
					<div className="w-5 h-5 flex items-center justify-center relative bg-yellow-600 rounded-full overflow-hidden border-white">
						<User className="absolute -bottom-0.75 size-5 text-white fill-white" />
					</div>
					{!collapsed && (
						<div className="flex flex-col gap-1.5 ms-3 me-2">
							<span>نام و نام خانوادگی</span>
							<span className="text-gray-600">09923244836</span>
						</div>
					)}
					{!collapsed && <CircleCheck className="size-5 fill-yellow-400 text-white -mt-1" />}
				</div>

				<ul className="space-y-1 mt-3">
					{items.map((item) => (
						<SidebarItem
							key={item.id}
							item={item}
							collapsed={collapsed}
							openItemId={openItemId}
							setOpenItemId={setOpenItemId}
						/>
					))}
				</ul>
			</div>

			<button
				onClick={handleLogout}
				className="flex items-center gap-3 ps-6 pe-3 hover:text-red-500 cursor-pointer mt-4"
			>
				<LogOut className="size-4" />
				{!collapsed && <span>خروج از حساب کاربری</span>}
			</button>
		</aside>
	);
}
