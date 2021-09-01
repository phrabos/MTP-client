import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Nav from '../components/nav';
import { RootState } from '../store/redux';
import { userAuthenticate } from '../utils/apiUtils';

const Login: React.FC = () => {
	const [isLoginSelected, setisLoginSelected] = useState(true);
	const emailInputRef = useRef<HTMLInputElement>(null);
	const passwordInputRef = useRef<HTMLInputElement>(null);
	const authToken = useSelector((state: RootState) => state.idToken);
	const isLoggedIn = useSelector((state: RootState) => state.loggedIn);
	const dispatch = useDispatch();
	const history = useHistory();

	console.log('token:', authToken, 'logged in?', isLoggedIn);

	const handleSubmit = (event: React.FormEvent): void => {
		event.preventDefault();

		const email = emailInputRef.current?.value ?? '';
		const password = passwordInputRef.current?.value ?? '';
		let url;

		if (isLoginSelected) {
			url = 'http://localhost:8000/account/login';
		} else {
			url = 'http://localhost:8000/account/signup';
		}

		userAuthenticate(url, email, password)
			.then((res) => {
				console.log(res);
				dispatch({ type: 'SETTOKEN', token: res.idToken });
				localStorage.setItem('TOKEN', res.idToken);
				history.replace('/home');
			})
			.catch((err) => console.error(err));
		// history.pushState()
		// if (emailInputRef.current?.value) emailInputRef.current.value = '';
		// if (passwordInputRef.current?.value) passwordInputRef.current.value = '';
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
