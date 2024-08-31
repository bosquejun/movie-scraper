// components/molecules/AccordionHeader.tsx
import clsx from "clsx";
import React from "react";
import { Button } from "../../atoms/Button";
import Icon from "../../atoms/Icon";

interface AccordionHeaderProps {
	title: string | React.ReactNode;
	isOpen: boolean;
	onClick: () => void;
	classNames?: {
		button?: string;
		content?: string;
		icon?: string;
	};
}

const AccordionHeader: React.FC<AccordionHeaderProps> = ({
	title,
	isOpen,
	onClick,
	classNames,
}) => {
	return (
		<Button onClick={onClick} className={classNames?.button}>
			{typeof title === "string" ? (
				<span className={clsx("text-slate-300", classNames?.content)}>
					{title}
				</span>
			) : (
				title
			)}
			<Icon isOpen={isOpen} className={classNames?.icon} />
		</Button>
	);
};

export default AccordionHeader;
