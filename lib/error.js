import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export function Error({ statusCode }) {
	return (
		<div className='error-container'>
			<Image
				src='https://rickandmortyapi.com/api/character/avatar/234.jpeg'
				alt='a dead morty...'
			/>
			{statusCode && <h1>Error: {statusCode}</h1>}
			<p>We are sorry! There was an error</p>
			<Link href='/'>
				<a>Go back home</a>
			</Link>
		</div>
	);
}

Error.getInitialProps = ({ res, err }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	return { statusCode };
};

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);

		// Define a state variable to track whether is an error or not
		this.state = { hasError: false };
	}
	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI

		return { hasError: true };
	}
	componentDidCatch(error, errorInfo) {
		// You can use your own error logging service here
		console.log({ error, errorInfo });
	}
	render() {
		// Check if the error is thrown
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<div>
					<h2>Oops, there is an error!</h2>
					<button type='button' onClick={() => this.setState({ hasError: false })}>
						Try again?
					</button>
				</div>
			);
		}

		// Return children components in case of no error

		return this.props.children;
	}
}

export default ErrorBoundary;
