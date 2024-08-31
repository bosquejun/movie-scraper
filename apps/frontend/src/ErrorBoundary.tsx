import { Button } from "@comeback/ui";
import React, { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
	children: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(_: Error): ErrorBoundaryState {
		// Update state to render fallback UI on the next render
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		// Log the error to an error reporting service
		console.error("Error caught by ErrorBoundary: ", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<div className='w-screen h-screen flex items-center justify-center space-y-3'>
					<h1 className='text-red-400 text-2xl font-medium'>
						Something went wrong.
					</h1>
					<Button
						onClick={() => {
							window.location.reload();
						}}
					>
						Reload
					</Button>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
