import { useAuthContext, usePostMovieSources } from "@comeback/react";
import { Button, TextInput } from "@comeback/ui";
import { FormEvent } from "react";
import { toast } from "sonner";
import { getSourceLogo } from "../MovieItemContent";

export function MovieDetailsForm({
	refetchMovies,
}: {
	refetchMovies: () => void;
}) {
	const { token } = useAuthContext();
	const { mutateAsync } = usePostMovieSources(token!);

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const formProps = Object.fromEntries(formData);

		await toast.promise(
			mutateAsync({
				title: formProps["movieTitle"] as string,
				sourceUrls: [
					formProps["imdbUrl"] as string,
					formProps["rottenTomatoesUrl"] as string,
					formProps["metaCriticUrl"] as string,
				].filter(Boolean),
			}),
			{
				loading: "Scraping movie information...",
				error(data) {
					return data?.error;
				},
				success: "Successfully added new movie.",
				finally() {
					refetchMovies();
				},
			}
		);
	};

	return (
		<form
			onSubmit={onSubmit}
			className='flex flex-col space-y-2 md:max-w-md px-4 w-full m-auto'
		>
			<div className='flex flex-col space-y-1 '>
				<h2 className='font-medium text-slate-500 text-2xl mb-2'>
					Movie Details
				</h2>
				<div className='px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
					<dt className='text-sm font-medium leading-6 text-slate-300 flex items-center'>
						Title{"  "}
						<span className='text-red-500'>*</span>
					</dt>
					<dd className='mt-1 text-sm leading-6 text-slate-400  sm:col-span-2 sm:mt-0'>
						<TextInput
							name='movieTitle'
							type='text'
							placeholder='Deadpool & Wolverine'
						/>
					</dd>
				</div>
				<div className='px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
					<dt className='text-sm font-medium leading-6 text-slate-300 flex items-center'>
						<div className='w-8 mr-2'>
							<a href='https://www.imdb.com/' target='_blank'>
								<img src={getSourceLogo("imdb")} />
							</a>
						</div>
						IMDb URL
					</dt>
					<dd className='mt-1 text-sm leading-6 text-slate-400  sm:col-span-2 sm:mt-0'>
						<TextInput
							name='imdbUrl'
							type='url'
							placeholder='https://www.imdb.com/'
						/>
					</dd>
				</div>

				<div className='px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
					<dt className='text-sm font-medium leading-6 text-slate-300 flex items-center'>
						<div className='w-8 mr-2'>
							<a
								href='https://www.rottentomatoes.com/'
								target='_blank'
							>
								<img src={getSourceLogo("rotten tomatoes")} />
							</a>
						</div>
						Rotten Tomatoes URL
					</dt>
					<dd className='mt-1 text-sm leading-6 text-slate-400  sm:col-span-2 sm:mt-0'>
						<TextInput
							name='rottenTomatoesUrl'
							type='url'
							placeholder='https://www.rottentomatoes.com/'
						/>
					</dd>
				</div>

				<div className='px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
					<dt className='text-sm font-medium leading-6 text-slate-300 flex items-center'>
						<div className='w-8 mr-2'>
							<a
								href='https://www.metacritic.com/'
								target='_blank'
							>
								<img src={getSourceLogo("meta critic")} />
							</a>
						</div>
						Meta Critic URL
					</dt>
					<dd className='mt-1 text-sm leading-6 text-slate-400  sm:col-span-2 sm:mt-0'>
						<TextInput
							name='metaCriticUrl'
							type='url'
							placeholder='https://www.metacritic.com/'
						/>
					</dd>
				</div>
			</div>
			<Button
				type='submit'
				className='h-10 w-full !justify-center text-center mt-5'
			>
				Add movie
			</Button>
		</form>
	);
}
