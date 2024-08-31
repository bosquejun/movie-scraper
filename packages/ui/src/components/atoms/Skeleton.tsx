import clsx from "clsx";
import { BaseAtomProps } from ".";

export function SkeletonAvatar({ className }: BaseAtomProps) {
	return (
		<div className='animate-pulse flex space-x-4'>
			<div
				className={clsx(
					"rounded-full bg-slate-700 h-10 w-10",
					className
				)}
			/>
		</div>
	);
}

export function Skeleton({ className }: BaseAtomProps) {
	return (
		<div className='animate-pulse flex space-x-4 w-full'>
			<div
				className={clsx(
					"rounded-md bg-slate-700 h-10 w-full",
					className
				)}
			/>
		</div>
	);
}
