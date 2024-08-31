import clsx from "clsx";
import { ChangeEvent, useState } from "react";
import { Input, InputProps } from "../atoms/Input";

type TextInputProps = Omit<InputProps, "id" | "className"> & {
	label?: string;
	classNames?: {
		base?: string;
		label?: string;
		input?: string;
	};
};

export function TextInput(props: TextInputProps) {
	const [value, setValue] = useState(props.defaultValue);

	const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	return (
		<div
			className={clsx("flex flex-col space-y-1", props.classNames?.base)}
			slot='text-input-base'
		>
			{props.label && (
				<label className='text-slate-400 font-medium'>
					{props.label}
				</label>
			)}
			<Input
				{...props}
				slot='text-input'
				className={props?.classNames?.input}
				value={value}
				id={props.name}
				onChange={onChangeText}
			/>
		</div>
	);
}
