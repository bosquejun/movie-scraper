import clsx from "clsx";
import { StartIcon } from "../atoms/icons";

type StarRatingProps = {
	score: number;
	hideStar?: boolean;
	classNames?: {
		base?: string;
		startIcon?: string;
	};
};

export function StarRating({ score, hideStar, classNames }: StarRatingProps) {
	return (
		<div
			className={clsx(
				"flex items-center gap-x-1.5 text-neutral-400",
				classNames?.base
			)}
		>
			{!hideStar && (
				<StartIcon
					className={clsx(
						"h-[0.8rem] w-[0.8rem] text-yellow-500",
						classNames?.startIcon
					)}
				/>
			)}
			{score}
		</div>
	);
}
