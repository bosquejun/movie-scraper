import { MovieSchemaType } from "@comeback/schema";
import { Skeleton, StarRating } from "@comeback/ui";

export function MovieItemHeader({ movie }: { movie: MovieSchemaType }) {
	return (
		<div className='flex justify-between w-full pr-3 items-center  space-x-2'>
			<div className='flex space-x-2 items-center'>
				{movie.posterImage && (
					<div className='max-w-12 min-w-12 h-16l rounded-lg'>
						<img className='rounded-lg' src={movie.posterImage} />
					</div>
				)}
				<div className='flex flex-col space-y-0.5 text-left'>
					<h3 className='text-xl truncate font-semibold text-slate-300'>
						{movie.title}
					</h3>
					<div className='text-slate-400 text-sm'>
						{movie.releaseDate?.slice(-4)} · {movie.movieRating} ·{" "}
						{movie.movieRuntime}
					</div>
					<p className='mt-1 text-ellipsis overflow-hidden line-clamp-1 text-slate-500 text-sm'>
						{movie.synopsis}
					</p>
				</div>
			</div>
			<StarRating score={movie.averageRating} />
		</div>
	);
}

export function MovieItemHeaderLoader() {
	return (
		<div className='flex justify-between w-full pr-3 items-center space-x-2'>
			<div className='flex space-x-2 items-center w-full'>
				<div className='max-w-12 min-w-12 h-16 rounded-lg'>
					<Skeleton className='w-full h-16' />
				</div>
				<div className='flex flex-col space-y-1 w-full'>
					<Skeleton className='w-[40%] h-5' />
					<Skeleton className='w-[15%] h-5' />
					<Skeleton className='w-full h-3' />
				</div>
			</div>
			<Skeleton className='w-[80px] h-7' />
			{/* <StarRating score={movie.averageRating} /> */}
		</div>
	);
}
