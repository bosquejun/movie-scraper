import clsx from "clsx";
import { ReactNode } from "react";

export type ListItemProps = {
	startContent?: string | ReactNode;
	children?: ReactNode;
	endContent?: string | ReactNode;
	classNames?: {
		wrapper?: string;
		startContent?: string;
		endContent?: string;
	};
};

export function ListItem({
	classNames,
	startContent,
	children,
	endContent,
}: ListItemProps) {
	return (
		<div
			className={clsx("flex items-center space-x-1", classNames?.wrapper)}
		>
			{startContent &&
				(typeof startContent === "string" ? (
					<p className={clsx("", classNames?.startContent)}>
						{startContent}
					</p>
				) : (
					startContent
				))}
			<div className='grow'>{children}</div>
			{endContent &&
				(typeof endContent === "string" ? (
					<p className={clsx("", classNames?.startContent)}>
						{endContent}
					</p>
				) : (
					endContent
				))}
		</div>
	);
}
