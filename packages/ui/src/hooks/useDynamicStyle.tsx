import { useCallback, useEffect, useRef, useState } from "react";

const useDynamicStyle = <T extends HTMLElement>(
	isOpen: boolean,
	getPropertyValue: (element: T) => string | number,
	defaultValue: string | number = 0
) => {
	const [value, setValue] = useState<string | number>(defaultValue);
	const elementRef = useRef<T>(null);

	// Function to recalculate the style value
	const recalculate = useCallback(() => {
		if (elementRef.current) {
			setValue(
				isOpen ? getPropertyValue(elementRef.current) : defaultValue
			);
		}
	}, [isOpen, getPropertyValue, defaultValue]);

	useEffect(() => {
		recalculate();
	}, [isOpen, recalculate]);

	return { value, elementRef, recalculate };
};

export default useDynamicStyle;
