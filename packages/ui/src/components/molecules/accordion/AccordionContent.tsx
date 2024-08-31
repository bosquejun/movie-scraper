// components/molecules/AccordionContent.tsx
import clsx from "clsx";
import React, { ReactNode } from "react";
import useDynamicStyle from "../../../hooks/useDynamicStyle";

interface AccordionContentProps {
	isOpen: boolean;
	children: ReactNode;
}

const AccordionContent: React.FC<AccordionContentProps> = ({
	isOpen,
	children,
}) => {
	const { value: height, elementRef } = useDynamicStyle<HTMLDivElement>(
		isOpen,
		(element) => element.scrollHeight,
		0
	);

	return (
		<div
			ref={elementRef}
			style={{ height }}
			className={clsx(
				"text-gray-600 overflow-hidden transition-all duration-300 ease-in-out"
			)}
		>
			<div className='text-gray-600 p-4'>{children}</div>
		</div>
	);
};

export default AccordionContent;
