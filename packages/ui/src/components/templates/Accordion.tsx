// components/templates/Accordion.tsx
import clsx from "clsx";
import React, { useCallback, useState } from "react";
import AccordionItem, {
	AccordionItemProps,
} from "../organisms/accordion/AccordionItem";

interface AccordionProps {
	items: { title: string | React.ReactNode; content: React.ReactNode }[];
	classNames?: {
		base?: string;
	} & AccordionItemProps["classNames"];
	allowMultiple?: boolean;
	defaultOpen?: number[];
	maxAllowedOpen?: number;
	isDisabled?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
	items,
	classNames: { base, ...classNames } = {},
	allowMultiple,
	defaultOpen,
	maxAllowedOpen,
	isDisabled,
}) => {
	const [openIndexes, setOpenIndexes] = useState<number[]>(defaultOpen || []); // Support multiple open indexes

	const toggleAccordion = useCallback(
		(index: number) => {
			if (isDisabled) return;
			if (allowMultiple) {
				// Handle multiple toggle mode
				setOpenIndexes((prevIndexes) => {
					if (prevIndexes.includes(index)) {
						return prevIndexes.filter((i) => i !== index);
					} else {
						const newList = [...prevIndexes, index];
						// Ensure the number of open items doesn't exceed maxAllowedOpen

						if (
							maxAllowedOpen &&
							prevIndexes.length >= maxAllowedOpen
						) {
							newList.shift();
						}
						return newList;
					}
				});
			} else {
				// Handle single toggle mode
				setOpenIndexes((prevIndexes) =>
					prevIndexes.includes(index) ? [] : [index]
				);
			}
		},
		[allowMultiple, isDisabled]
	);

	return (
		<div className={clsx("flex flex-col space-y-2", base)}>
			{items.map((item, index) => (
				<AccordionItem
					key={index}
					title={item.title}
					content={item.content}
					index={index}
					isOpen={isDisabled ? false : openIndexes.includes(index)} // Check if this item is open
					toggleAccordion={toggleAccordion}
					classNames={{
						...classNames,
					}}
				/>
			))}
		</div>
	);
};

export default Accordion;
