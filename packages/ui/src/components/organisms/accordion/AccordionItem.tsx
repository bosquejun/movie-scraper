// components/organisms/AccordionItem.tsx
import clsx from "clsx";
import React from "react";
import AccordionContent from "../../molecules/accordion/AccordionContent";
import AccordionHeader from "../../molecules/accordion/AccordionHeader";

export interface AccordionItemProps {
	title: string | React.ReactNode;
	content: string | React.ReactNode;
	index: number;
	isOpen: boolean;
	toggleAccordion: (index: number) => void;
	classNames?: {
		itemWrapper?: string;
		header?: string;
		content?: string;
	};
}

const AccordionItem: React.FC<AccordionItemProps> = ({
	title,
	content,
	index,
	isOpen,
	toggleAccordion,
	classNames,
}) => {
	return (
		<div
			className={clsx(
				"bg-black/30 backdrop-blur-md rounded-md border border-slate-700 shadow-md",
				classNames?.itemWrapper
			)}
		>
			<AccordionHeader
				title={title}
				isOpen={isOpen}
				onClick={() => toggleAccordion(index)}
			/>
			<AccordionContent isOpen={isOpen}>
				{typeof content === "string" ? <p>{content}</p> : content}
			</AccordionContent>
		</div>
	);
};

export default AccordionItem;
