import { useMemo } from "react";
import { PaginatedResponse } from "../../../../schema/src/express/response";
import { Button } from "../atoms/Button";
import { ArrowDownIcon } from "../atoms/icons";
import { Skeleton } from "../atoms/Skeleton";

type PaginationProps = {
	pagination: PaginatedResponse | null;
	nextPage: (() => void) | null;
	prevPage: (() => void) | null;
	loading?: boolean;
	defaultPageSize?: boolean;
};

export function Pagination({
	nextPage,
	pagination,
	prevPage,
	loading,
}: PaginationProps) {
	const start = useMemo(() => {
		if (!pagination) return 0;
		return (pagination?.currentPage - 1) * pagination?.pageSize + 1;
	}, [pagination]);

	const end = useMemo(() => {
		if (!pagination) return 0;
		return Math.min(start + pagination?.count - 1, pagination?.totalCount);
	}, [pagination, start]);

	let message;

	if (pagination?.totalCount === 0 || !pagination) {
		message = "No results found";
	} else if (pagination?.nextPage === null && pagination?.count === 1) {
		// Last page
		message = `Showing result ${start} of ${pagination?.totalCount} results`;
	} else {
		// General case
		message = `Showing ${start} to ${end} of ${pagination?.totalCount} results`;
	}

	return (
		<div className='flex items-center justify-between py-2 w-full space-x-2'>
			{Boolean(loading && pagination === null) ? (
				<>
					<Skeleton className='grow max-w-[50%] h-6' />
					<div className='flex space-x-2 items-center w-full max-w-[25%]'>
						<Skeleton className='w-28' />
						<Skeleton className='w-28' />
					</div>
				</>
			) : (
				<>
					<p className='text-slate-300'>{message}</p>

					<div className='flex space-x-2 items-center'>
						<Button
							isDisabled={prevPage === null || loading}
							className='bg-transparent text-slate-300 rounded-md h-10 flex space-x-1'
							{...(prevPage !== null && {
								onClick: prevPage,
							})}
						>
							<ArrowDownIcon
								className={`w-4 h-4 transition-transform transform rotate-90`}
							/>
							<p>Previous</p>
						</Button>
						<Button
							isDisabled={nextPage === null || loading}
							className='bg-transparent text-slate-300 rounded-md h-10 flex space-x-1'
							{...(nextPage !== null && {
								onClick: nextPage,
							})}
						>
							<p>Next</p>
							<ArrowDownIcon
								className={`w-4 h-4 transition-transform transform -rotate-90`}
							/>
						</Button>
					</div>
				</>
			)}
			{/* {Boolean(loading && pagination === null) ? (
					<Skeleton className='w-[30%] h-6' />
				) : (
					<p>{`Showing ${start} to ${end} of ${pagination?.totalCount} results`}</p>
				)}
			</div> */}
		</div>
	);
}
