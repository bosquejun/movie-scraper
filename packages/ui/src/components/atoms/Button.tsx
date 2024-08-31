// components/atoms/Button.tsx
import clsx from "clsx";
import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { BaseAtomProps } from ".";

type ButtonProps = BaseAtomProps & {
	onClick?: () => void;
	isDisabled?: boolean;
} & DetailedHTMLProps<
		InputHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	>;

export const Button: React.FC<ButtonProps> = ({
	onClick,
	children,
	className,
	isDisabled,
}) => {
	return (
		<button
			className={clsx(
				"bg-black/40 rounded-md flex items-center justify-between w-full p-4 text-slate-200 font-semibold focus:outline-none",
				className,
				{ "opacity-40 cursor-default": isDisabled }
			)}
			{...(!isDisabled && {
				onClick,
			})}
		>
			{children}
		</button>
	);
};
