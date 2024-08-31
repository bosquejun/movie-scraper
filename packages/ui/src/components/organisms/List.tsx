import clsx from "clsx";
import { ListItem, ListItemProps } from "../molecules/ListItem";

type ListProps<T extends ListItemProps> = {
	classNames?: {
		base?: string;
	} & ListItemProps["classNames"];
	items: T[];
};

export function List<T extends ListItemProps>({
	classNames,
	items,
}: ListProps<T>) {
	return (
		<div
			className={clsx(
				"flex flex-col gap-y-4 w-full divide-y divide-slate-800",
				classNames?.base
			)}
		>
			{items.map((item, index) => (
				<>
					<ListItem
						key={index}
						endContent={item.endContent}
						startContent={item.startContent}
						classNames={{ wrapper: "text-slate-300" }}
					>
						{item.children}
					</ListItem>
					{/* {index < items.length - 1 && <Divider className='py-2' />} */}
				</>
			))}
		</div>
	);
}
