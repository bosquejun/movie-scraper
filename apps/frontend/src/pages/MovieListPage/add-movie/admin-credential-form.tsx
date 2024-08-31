import { useAuthContext } from "@comeback/react";
import { Button, TextInput } from "@comeback/ui";
import { FormEvent } from "react";
import { toast } from "sonner";

export function AdminCredentialForm() {
	const { fetchTokenAsync } = useAuthContext();

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const formProps = Object.fromEntries(formData);

		const response = await fetchTokenAsync({
			email: formProps["adminEmail"] as string,
			password: formProps["adminPassword"] as string,
		});

		if (response.error) {
			toast.error(response.error);
			return;
		} else {
			toast.success("Successful login.");
		}
	};

	return (
		<form
			onSubmit={onSubmit}
			className='flex flex-col space-y-2 md:max-w-md px-4 w-full m-auto'
		>
			<h3 className='text-xl font-medium text-slate-300 text-center'>
				Admin Credential
			</h3>
			<dd className='flex flex-col space-y-1'>
				<TextInput
					label='Email'
					name='adminEmail'
					placeholder='admin@example.com'
					type='email'
				/>
			</dd>
			<dd className='flex flex-col space-y-1'>
				<TextInput
					label='Password'
					name='adminPassword'
					placeholder='********'
					type='password'
				/>
			</dd>
			<Button
				type='submit'
				className='h-10 w-full !justify-center text-center mt-5'
			>
				Login
			</Button>
		</form>
	);
}
