// components/atoms/Icon.tsx
import clsx from "clsx";
import React from "react";
import { BaseAtomProps } from ".";
import { ArrowDownIcon } from "./icons/ArrowDownIcon";

interface IconProps extends BaseAtomProps {
	isOpen: boolean;
}

const Icon: React.FC<IconProps> = ({ isOpen, className }) => {
	return (
		<ArrowDownIcon
			className={clsx(
				`w-4 h-4 transition-transform transform `,
				{
					"rotate-180": isOpen,
				},
				className
			)}
		/>
	);
};

export default Icon;
