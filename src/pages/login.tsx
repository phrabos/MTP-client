import React, { useState, useRef } from 'react';
import Nav from '../components/nav';

const Login: React.FC = () => {
	const [isLogin, setIsLogIn] = useState(true);
	const emailInputRef = useRef<HTMLInputElement>(null);
	const passwordInputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = (event: React.FormEvent): void => {
		event.preventDefault();
		const email = emailInputRef.current?.value;
		const password = passwordInputRef.current?.value;
		console.log(email, password);
		if (isLogin) {
		} else {
			fetch('http://localhost:8000/account/signup', {
				method: 'POST',
				body: JSON.stringify({
					email,
					password,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			}).then((res) => {
				if (res.status === 200) {
					console.log(res);
					// redirect to tea list
				} else {
					return res.json().then((data) => {
						const errorMessage = data.error.message ?? 'Auth failed!';
						alert(errorMessage);
					});
				}
			});
		}
		// history.pushState()
	};

	const handleAuthMode = (): void => {
		setIsLogIn((prevState) => !prevState);
	};

	return (
		<>
			<Nav />
			<h3>{isLogin ? 'Sign In' : 'Sign Up'}</h3>
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
				<button>{isLogin ? 'Sign In' : 'Create Account'}</button>
				<p style={{ cursor: 'pointer' }} onClick={handleAuthMode}>
					{isLogin ? 'Create new account' : 'Login with existing account'}
				</p>
			</form>
		</>
	);
};

export default Login;
