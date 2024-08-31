// pages/App.tsx
import { useMovies } from "@comeback/react";
import { Accordion, Divider, Pagination } from "@comeback/ui";
import React from "react";
import { MovieItemContent } from "./MovieItemContent";
import { MovieItemHeader, MovieItemHeaderLoader } from "./MovieItemHeader";
import { AddMovieSection } from "./add-movie";

const PAGE_SIZE = 3;

const MovieListPage: React.FC = () => {
	const { error, movies, loading, nextPage, pagination, prevPage, refetch } =
		useMovies({
			pageSize: PAGE_SIZE,
		});

	if (error && !loading) {
		return <p>{error}</p>;
	}

	return (
		<div className='max-w-3xl mx-auto py-12 flex flex-col gap-y-2 relative'>
			<h1 className='bg-gradient-to-tl from-slate-100 to-indigo-400 bg-clip-text text-transparent text-4xl mx-auto mb-8'>
				Movie Ratings
			</h1>
			<Pagination
				nextPage={nextPage}
				pagination={pagination}
				prevPage={prevPage}
				loading={loading}
			/>
			<Accordion
				isDisabled={loading}
				maxAllowedOpen={2}
				allowMultiple
				items={
					loading
						? [...new Array(PAGE_SIZE)].fill(0).map((_) => ({
								title: <MovieItemHeaderLoader />,
								content: "",
							}))
						: movies.map((movie) => ({
								title: <MovieItemHeader movie={movie} />,
								content: <MovieItemContent movie={movie} />,
							}))
				}
			/>

			{!loading && (
				<>
					<Divider className='my-10' />
					<AddMovieSection refetchMovies={refetch} />
				</>
			)}
		</div>
	);
};

export default MovieListPage;
