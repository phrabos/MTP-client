import React, { useState } from 'react';
import Nav from '../components/nav';

const Login: React.FC = () => {
	const [isLogin, setIsLogIn] = useState(true);

	const handleSubmit = (event: React.FormEvent): void => {
		event.preventDefault();
		console.log('sign in clicked');
	};

	const handleAuthMode = () => {
		setIsLogIn((prevState) => !prevState);
	};

	return (
		<>
			<Nav />
			<h3>{isLogin ? 'Sign In' : 'Sign Up'}</h3>
			<form onSubmit={handleSubmit}>
				<input type="text" placeholder="username" required></input>
				<input type="password" placeholder="password" required></input>
				<button>{isLogin ? 'Sign In' : 'Create Account'}</button>
				<p style={{ cursor: 'pointer' }} onClick={handleAuthMode}>
					{isLogin ? 'Create new account' : 'Login with existing account'}
				</p>
			</form>
		</>
	);
};

export default Login;
