import React, { useState, useRef } from 'react';
import Nav from '../components/nav';
import { userAuthenticate } from '../utils/apiUtils';

const Login: React.FC = () => {
	const [isLoginSelected, setisLoginSelected] = useState(true);
	const emailInputRef = useRef<HTMLInputElement>(null);
	const passwordInputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = (event: React.FormEvent): void => {
		event.preventDefault();

		const email = emailInputRef.current?.value ?? '';
		const password = passwordInputRef.current?.value ?? '';
		let url;

		if (isLoginSelected) {
			url = 'http://localhost:8000/account/login';
		} else {
			url = 'http://localhost8000/account/signup';
		}

		userAuthenticate(url, email, password)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => console.error(err));
		// history.pushState()
	};

	const handleAuthMode = (): void => {
		setisLoginSelected((prevState) => !prevState);
	};

	return (
		<>
			<Nav />
			<h3>{isLoginSelected ? 'Sign In' : 'Sign Up'}</h3>
			<form onSubmit={handleSubmit}>
				<input
					ref={emailInputRef}
					type="text"
					placeholder="email"
					required
				></input>
				<input
					ref={passwordInputRef}
					type="password"
					placeholder="password"
					required
				></input>
				<button>{isLoginSelected ? 'Sign In' : 'Create Account'}</button>
				<p style={{ cursor: 'pointer' }} onClick={handleAuthMode}>
					{isLoginSelected
						? 'Create new account'
						: 'Login with existing account'}
				</p>
			</form>
		</>
	);
};

export default Login;
