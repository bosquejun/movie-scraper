import clsx from "clsx";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export type InputProps = DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
> & {};

export function Input({ ...props }: InputProps) {
	return (
		<div className='' slot='input-base'>
			<input
				{...props}
				className={clsx(
					"bg-transparent block w-full rounded-md border-0 py-1.5 px-3 text-slate-300 ring-1 ring-inset ring-slate-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
					props.className
				)}
			/>
		</div>
	);
}
