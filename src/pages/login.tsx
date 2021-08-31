import React from 'react';
import Nav from '../components/nav';

const Login: React.FC = () => {
	const handleSubmit = (event: React.FormEvent): void => {
		event.preventDefault();
		console.log('sign in clicked');
	};

	return (
		<>
			<Nav />
			<form onSubmit={handleSubmit}>
				<input type="text" placeholder="username" required></input>
				<input type="password" placeholder="password" required></input>
				<button>Sign in</button>
			</form>
		</>
	);
};

export default Login;
