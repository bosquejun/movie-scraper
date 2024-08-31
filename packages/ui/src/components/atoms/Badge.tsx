import clsx from "clsx";
import { ReactNode } from "react";
import { BaseAtomProps } from ".";

interface BadgeProps extends BaseAtomProps {
	children?: ReactNode | string;
}

export function Badge({ children, className }: BadgeProps) {
	return (
		<div
			className={clsx(
				"rounded-md bg-transparent px-3 py-1 font-medium border border-green-400",
				className
			)}
		>
			{typeof children !== "string" ? (
				children
			) : (
				<p className='text-white'>{children}</p>
			)}
		</div>
	);
}
