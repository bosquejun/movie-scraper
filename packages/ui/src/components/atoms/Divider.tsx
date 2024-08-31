import clsx from "clsx";
import { BaseAtomProps } from ".";

export function Divider({ className }: BaseAtomProps) {
	return (
		<div
			className={clsx(
				"w-full border border-t-[0.5px] border-slate-700",
				className
			)}
		></div>
	);
}
