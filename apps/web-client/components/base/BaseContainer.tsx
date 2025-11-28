import { cn } from "@/utils/cn.util";
import type React from "react";


interface BaseContainerProps {
	children?: React.ReactNode;
	className?: string;
}

const BaseContainer: React.FC<BaseContainerProps> = ({
	children,
	className = "",
}) => {
	return (
		<div
			className={cn(
				"lg:max-w-7xl w-full lg:mx-auto ",
				className,
			)}
		>
			{children}
		</div>
	);
};

export default BaseContainer;
