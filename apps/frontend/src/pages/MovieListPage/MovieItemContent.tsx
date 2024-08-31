import { MovieSchemaType } from "@comeback/schema";
import { StarRating } from "@comeback/ui";
import IMDbLogo from "../../assets/imdb.png";
import MetaCriticLogo from "../../assets/metacritic.png";
import RottenTomatoesLogo from "../../assets/rotten-tomatoes.png";

export function getSourceLogo(sourceName: string) {
	switch (sourceName.toLowerCase()) {
		case "imdb":
			return IMDbLogo;
		case "meta critic":
			return MetaCriticLogo;
		case "rotten tomatoes":
			return RottenTomatoesLogo;
	}
}

export function MovieItemContent({ movie }: { movie: MovieSchemaType }) {
	return (
		<div className='flex flex-col w-full rounded-md bg-indigo-950/30 p-4'>
			<div className='flex flex-col-reverse items-center md:flex-row space-x-4'>
				<div className='grow flex flex-col space-y-2 w-full'>
					<div className='flex gap-2 items-center'>
						<dl className='divide-y divide-slate-700 w-full'>
							<div className='px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
								<dt className='text-sm font-medium leading-6 text-slate-300'>
									Title
								</dt>
								<dd className='mt-1 text-sm leading-6 text-slate-400  sm:col-span-2 sm:mt-0'>
									{movie.title}
								</dd>
							</div>
							<div className='px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
								<dt className='text-sm font-medium leading-6 text-slate-300'>
									Director/s
								</dt>
								<dd className='mt-1 text-sm leading-6 text-slate-400 sm:col-span-2 sm:mt-0'>
									{movie.director?.split(",").join(" · ")}
								</dd>
							</div>
							<div className='px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
								<dt className='text-sm font-medium leading-6 text-slate-300'>
									Release date
								</dt>
								<dd className='mt-1 text-sm leading-6 text-slate-400 sm:col-span-2 sm:mt-0'>
									{movie.releaseDate}
								</dd>
							</div>
							<div className='px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
								<dt className='text-sm font-medium leading-6 text-slate-300'>
									Rated
								</dt>
								<dd className='mt-1 text-sm leading-6 text-slate-400 sm:col-span-2 sm:mt-0'>
									{movie.movieRating}
								</dd>
							</div>
							<div className='px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
								<dt className='text-sm font-medium leading-6 text-slate-300'>
									Runtime
								</dt>
								<dd className='mt-1 text-sm leading-6 text-slate-400 sm:col-span-2 sm:mt-0'>
									{movie.movieRuntime}
								</dd>
							</div>
							<div className='px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
								<dt className='text-sm font-medium leading-6 text-slate-300'>
									Rating Scores
								</dt>
								<div className='mt-1 text-sm leading-6 text-slate-400 sm:col-span-2 sm:mt-0'>
									<div className='grid grid-cols-3 mt-3 md:mt-0'>
										{movie.ratings?.map((rating) => (
											<div
												key={rating.source}
												className='col-span-1 flex flex-col items-center space-y-2'
											>
												<dt className='w-8 h-8 flex items-center justify-center'>
													{/* {rating.source} */}
													<a
														href={rating.url}
														target='_blank'
													>
														<img
															src={getSourceLogo(
																rating.source
															)}
														/>
													</a>
												</dt>
												<dd className='text-center'>
													<StarRating
														score={
															rating.ratingScore
														}
													/>
												</dd>
											</div>
										))}
									</div>
								</div>
							</div>
						</dl>
					</div>
				</div>
				<div className='min-w-56 max-w-56 w-full'>
					<img
						alt={movie.title}
						src={movie.posterImage!}
						className='w-full rounded-md'
					/>
				</div>
			</div>
			<div className='px-4 py-3 sm:gap-2 sm:px-0 flex flex-col'>
				<dt className='text-sm font-medium leading-6 text-slate-300'>
					Synopsis
				</dt>
				<dd className='mt-1 text-sm leading-6 text-slate-400 sm:col-span-2 sm:mt-0'>
					{movie.synopsis}
				</dd>
			</div>
		</div>
	);
}
