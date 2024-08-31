import { AuthProvider } from "@comeback/react";
import { UserRoles } from "@comeback/types";
import { Accordion } from "@comeback/ui";
import { AdminCredentialForm } from "./admin-credential-form";
import { MovieDetailsForm } from "./movie-details-form";

export function AddMovieSection({
	refetchMovies,
}: {
	refetchMovies: () => void;
}) {
	return (
		<Accordion
			isDisabled={false}
			classNames={{
				itemWrapper: "border-none",
				content: "uppercase",
			}}
			items={[
				{
					title: (
						<h1 className='text-slate-300 font-semibold'>
							Add new movie
						</h1>
					),
					content: (
						<div className='min-h-96 flex items-center justify-center'>
							<AuthProvider
								storageKey='admin'
								checkRoles={[UserRoles.ADMIN]}
								renderForm={<AdminCredentialForm />}
							>
								<MovieDetailsForm
									refetchMovies={refetchMovies}
								/>
							</AuthProvider>
						</div>
					),
				},
			]}
		/>
	);
}
